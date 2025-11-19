"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Square } from "lucide-react";
import axios from "axios";
import {
  answerGeneralInterview,
  answerTechnicalInterview,
  createInterview,
  getInterviewDetails,
  startGeneralInterview,
  startTechnicalInterview,
  updateApplicationStatus,
  updateConversation,
  updateEvaluation,
} from "@/actions/interviewActions";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { endInterview, getApplicationById } from "@/actions/applicationActions";
import {
  Conversation,
  Evaluation,
  InterviewApplicationDetails,
  Violation,
} from "@/types/interview";
import InterviewCompletedDialog from "./dialogs/InterviewCompletedDialog";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  isTechnical: boolean;
  timestamp: Date;
}

interface InterviewChatPanelProps {
  onAnswerSubmitted: (answer: string) => void;
  isWaitingForAnswer: boolean;
}

const InterviewChatPanel: React.FC<InterviewChatPanelProps> = ({
  onAnswerSubmitted,
  isWaitingForAnswer,
}) => {
  const router = useRouter();
  const interview = useSelector((state: any) => state.interview);
  const [loading, setLoading] = useState(false);
  const [applicationData, setApplicationData] =
    useState<InterviewApplicationDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const account = useSelector((state: any) => state.account);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // helper: normalize any server message to local Message
  const normalizeServerMessage = (m: any): Message => {
    return {
      id: String(m._id ?? m.id ?? Date.now().toString()),
      text: m.text ?? "",
      isAI: !!m.isAI,
      isTechnical: !!m.isTechnical,
      timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
    };
  };

  // Return object describing whether interview exists and its conversation (converted)
  const checkInterviewIsThere = async (applicationId: string) => {
    try {
      const response = await getInterviewDetails(Number(applicationId));
      if (response.success) {
        const status = response.data.status;
        console.log(status);
        setIsCompleted(status === "completed");
        const convoRaw = response.data.conversation || [];
        const conversation: Message[] = convoRaw.map((msg: any) =>
          normalizeServerMessage(msg)
        );
        // set state from converted conversation
        setMessages(conversation);
        return { exists: true, conversation };
      } else {
        return { exists: false, conversation: [] as Message[] };
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
      return { exists: false, conversation: [] as Message[] };
    }
  };

  const registerInterview = async (applicationId: string) => {
    try {
      const response = await createInterview({
        applicationID: applicationId,
        startedAt: new Date(),
        status: "ongoing",
      });
      console.log(response.message);
    } catch (error) {
      console.error("Error registering interview:", error);
    }
  };

  const getApplicationDetailsById = async (id: string) => {
    const jwt = Cookies.get("jwt");
    try {
      const response = await getApplicationById(jwt || "", Number(id));
      setApplicationData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching application details:", error);
      return null;
    }
  };

  // getFirstQuestion: accept fetched app and an existingConversation to avoid race
  const getFirstQuestion = async (
    applicationDataParam: InterviewApplicationDetails | null,
    existingConversation: Message[] | null = null
  ) => {
    const app = applicationDataParam ?? applicationData;
    const convo = existingConversation ?? messages;
    if (!app) return;

    try {
      // only generate if no messages exist
      if (convo && convo.length !== 0) return;

      const response = await startGeneralInterview(app.userEmail);
      const question = response.question ?? response.next_question;
      if (response.success && question) {
        // store AI question on server and normalize returned message if available
        const messageRes = await updateConversation(
          app.applicationId.toString(),
          {
            text: question,
            isAI: true,
            isTechnical: false,
            timestamp: new Date(),
          }
        );

        if (messageRes.success && messageRes.data) {
          setMessages((prev) => [
            ...prev,
            normalizeServerMessage(messageRes.data),
          ]);
        } else {
          // fallback: append locally if server didn't return message object
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              text: question,
              isAI: true,
              isTechnical: false,
              timestamp: new Date(),
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Error fetching first question:", error);
    }
  };

  
  const getFirstTechnicalQuestion = async (
    applicationDataParam: InterviewApplicationDetails | null
  ) => {
    console.log("test 10");
    const app = applicationDataParam ?? applicationData;
    if (!app) return;

    try {
      const response = await startTechnicalInterview(
        app.userEmail,
        interview.jobPost.description || ""
      );
      const question = response.question ?? response.next_question;
      if (response.success && question) {
        console.log("test 11");
        // store AI question on server and normalize returned message if available
        const messageRes = await updateConversation(
          app.applicationId.toString(),
          {
            text: question,
            isAI: true,
            isTechnical: true,
            timestamp: new Date(),
          }
        );

        if (messageRes.success && messageRes.data) {
          console.log("test 12");
          setMessages((prev) => [
            ...prev,
            normalizeServerMessage(messageRes.data),
          ]);
        } else {
          console.log("test 13");
          // fallback: append locally if server didn't return message object
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              text: question,
              isAI: true,
              isTechnical: true,
              timestamp: new Date(),
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Error fetching first question:", error);
    }
  };

  // handleSubmitAnswer: normalize server responses and append properly
  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) return;

    // take a snapshot of current messages to avoid stale-state issues
    const prevMessages = messages.slice();

    // find last non-technical AI question from the snapshot (the question the user is answering)
    const lastQuestionMessage = prevMessages
      .slice()
      .reverse()
      .find((msg) => msg.isAI && !msg.isTechnical);
    const lastQuestion = lastQuestionMessage ? lastQuestionMessage.text : "";

    // build user message object (optimistic)
    const userMessageLocal: Message = {
      id: Date.now().toString(),
      text: currentAnswer,
      isAI: false,
      isTechnical: false,
      timestamp: new Date(),
    };

    // append optimistically in UI
    setMessages((prev) => [...prev, userMessageLocal]);

    try {
      if (!applicationData) return;

      // 1) Save user's answer to server
      const answerRes = await updateConversation(
        applicationData.applicationId.toString(),
        {
          text: currentAnswer,
          isAI: false,
          isTechnical: false,
          timestamp: new Date(),
        }
      );

      // determine the saved user message (server or local fallback)
      const savedUserMessage =
        answerRes.success && answerRes.data
          ? normalizeServerMessage(answerRes.data)
          : userMessageLocal;

      // build the conversation state that will be used as history (prev snapshot + saved user message)
      const conversationForHistory = [...prevMessages, savedUserMessage];

      // build QA history: pairs of (question, answer) from conversationForHistory
      const qa_history: { question: string; answer: string }[] = [];
      for (let i = 0; i < conversationForHistory.length - 1; i++) {
        const m = conversationForHistory[i];
        const next = conversationForHistory[i + 1];
        if (
          m.isAI &&
          !m.isTechnical &&
          next &&
          !next.isAI &&
          !next.isTechnical
        ) {
          qa_history.push({ question: m.text, answer: next.text });
        }
      }

      // 2) Ask backend for next question (AI), sending proper lastQuestion and qa_history
      const response = await answerGeneralInterview(
        applicationData.userEmail,
        lastQuestion,
        currentAnswer,
        qa_history
      );

      const question =
        response.next_question ?? response.question ?? response.message;

      if (question) {
        // store AI question on server
        const messageRes = await updateConversation(
          applicationData.applicationId.toString(),
          {
            text: question,
            isAI: true,
            isTechnical: false,
            timestamp: new Date(),
          }
        );

        const savedAIMessage =
          messageRes.success && messageRes.data
            ? normalizeServerMessage(messageRes.data)
            : {
                id: Date.now().toString(),
                text: question,
                isAI: true,
                isTechnical: false,
                timestamp: new Date(),
              };

        // append the AI question to UI
        setMessages((prev) => [...prev, savedAIMessage]);

        // if special transition to technical interview
        if (
          question ===
          "General interview finished. Let's move on to technical questions."
        ) {
          console.log("test n 1");
          await getFirstTechnicalQuestion(applicationData);
          return;
        }
      }
    } catch (error) {
      console.error("Error submitting answer / fetching next question:", error);
    } finally {
      onAnswerSubmitted(currentAnswer);
      setCurrentAnswer("");
    }
  };

  const handleSubmitTechnicalAnswer = async () => {
    if (currentAnswer.trim()) {
      try {
        if (!applicationData) return;

        // 1) Save user's answer to server
        const answerRes = await updateConversation(
          applicationData.applicationId.toString(),
          {
            text: currentAnswer,
            isAI: false,
            isTechnical: true,
            timestamp: new Date(),
          }
        );

        if (answerRes.success && answerRes.data) {
          setMessages((prev) => [
            ...prev,
            normalizeServerMessage(answerRes.data),
          ]);
        } else {
          // fallback local append
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              text: currentAnswer,
              isAI: false,
              isTechnical: true,
              timestamp: new Date(),
            },
          ]);
        }

        // get the texhnical Q&A history from messages and add currentAnswer to last object's answer
        const qa_history: { question: string; answer: string }[] = [];
        let currentQuestion = "";
        // get the technical Q&A history from messages
        const technicalQA = messages.filter((m) => m.isTechnical);
        console.log(technicalQA);
        let tempConversation = {
          question: "",
          answer: "",
        };
        if (technicalQA.length > 2) {
          for (let i = 0; i < technicalQA.length; i++) {
            const m = technicalQA[i];
            if (m.isAI) {
              tempConversation.question = m.text;
            } else {
              tempConversation.answer = m.text;
              qa_history.push(tempConversation);
              tempConversation = {
                question: "",
                answer: "",
              };
            }
          }
          // add the last Q&A pair
          tempConversation = {
            question: technicalQA[technicalQA.length - 1].text,
            answer: currentAnswer,
          };
          qa_history.push(tempConversation);
        } else {
          tempConversation = {
            question: technicalQA[technicalQA.length - 1].text,
            answer: currentAnswer,
          };
          qa_history.push(tempConversation);
        }

        console.log(qa_history);
        // 2) Ask backend for next question (AI)
        const response = await answerTechnicalInterview(
          applicationData.userEmail,
          qa_history,
          violations
        );
        const question =
          response.next_question ?? response.question ?? response.message;
        console.log(question);

        if (question) {
          // store AI question on server
          const messageRes = await updateConversation(
            applicationData.applicationId.toString(),
            {
              text: question,
              isAI: true,
              isTechnical: true,
              timestamp: new Date(),
            }
          );
          console.log(response);
          console.log(messageRes)
          if (messageRes.success && messageRes.data) {
            console.log("test 1")
            if (
              question === "Thank you for completing the technical interview!"
            ) {
              console.log("test 2")
              if(response.evaluation.total_score === 0 || response.evaluation.total_score === null || response.evaluation.total_score === undefined){
                handleSubmitTechnicalAnswer();
                return;
              }
              // Interview complete - handle accordingly
              await addEvaluationDetails(response.evaluation);
              setMessages((prev) => [
                ...prev,
                normalizeServerMessage(messageRes.data),
              ]);
              return;
            }
          } else {
            console.log("test 3")
            if (
              question === "Thank you for completing the technical interview!"
            ) {
              console.log("test 4")
              // Interview complete - handle accordingly
              if (
                response.evaluation.total_score === 0 ||
                response.evaluation.total_score === null ||
                response.evaluation.total_score === undefined
              ) {
                handleSubmitTechnicalAnswer();
                return;
              }
              await addEvaluationDetails(response.evaluation);
              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now().toString(),
                  text: question,
                  isAI: true,
                  isTechnical: true,
                  timestamp: new Date(),
                },
              ]);
              return;
            }
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                text: question,
                isAI: true,
                isTechnical: true,
                timestamp: new Date(),
              },
            ]);
          }
        }
      } catch (error) {
        console.error(
          "Error submitting answer / fetching next question:",
          error
        );
      } finally {
        onAnswerSubmitted(currentAnswer);
        setCurrentAnswer("");
      }
    }
  };

  const addEvaluationDetails = async (evaluation: Evaluation) => {
    console.log("test 5")
    if (!applicationData) return;
    console.log("test 6");
    try {
      const response = await updateEvaluation(
        applicationData.applicationId.toString(),
        evaluation
      );
      if (response.success) {
        console.log("test 7");
        console.log(evaluation.total_score)
        const mainRes = await endInterview(
          applicationData.applicationId,
          evaluation.total_score,
          Cookies.get("jwt") || ""
        );
        console.log(mainRes)
        if (mainRes.success) {
          console.log("test 8");
          setIsCompleted(true);
          console.log("Evaluation updated:", response);
        }
      }
    } catch (error) {
      console.error("Error updating evaluation:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitCurrentAnswer();
    }
  };

  // decide which submit handler to call based on last AI message's isTechnical flag
  const submitCurrentAnswer = async () => {
    console.log("test n 2");
    // determine if we're currently in technical questions by inspecting last AI message
    const lastAI = [...messages].reverse().find((m) => m.isAI);
    const inTechnical = lastAI && lastAI.isTechnical;

    if (inTechnical) {
      await handleSubmitTechnicalAnswer();
    } else {
      await handleSubmitAnswer();
    }
  };

  // update init flow to pass normalized conversation and fetched app to getFirstQuestion
  useEffect(() => {
    const applicationId = window.location.pathname.split("/").pop();
    const initInterview = async () => {
      const appDetails = await getApplicationDetailsById(applicationId || "");
      if (!appDetails) return;
      const statusRes = await updateApplicationStatus(
        Cookies.get("jwt") || "",
        Number(applicationId),
        "INTERVIEW_STARTED"
      );
      console.log(statusRes.data);
      const { exists, conversation } = await checkInterviewIsThere(
        applicationId || ""
      );
      if (!exists) {
        await registerInterview(applicationId || "");
        await getFirstQuestion(appDetails, []);
      } else {
        if (conversation.length === 0) {
          await getFirstQuestion(appDetails, conversation);
        }
      }
    };

    initInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In real implementation, integrate with speech-to-text API
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading chat data...</p>
          </div>
        </div>
      )}
      <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <h3 className="font-semibold text-gray-900">
            Interview Conversation
          </h3>
          <p className="text-sm text-gray-600">
            Type your responses or use voice input
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isAI ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isAI
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="text-sm mb-1 font-medium">
                  {message.isAI ? "AI Interviewer" : "You"}
                </div>
                <div className="text-sm">{message.text}</div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer here..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                disabled={!isWaitingForAnswer}
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={toggleRecording}
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  isRecording
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
                disabled={!isWaitingForAnswer}
              >
                {isRecording ? (
                  <Square className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={submitCurrentAnswer}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!currentAnswer.trim() || !isWaitingForAnswer}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <InterviewCompletedDialog
        isOpen={isCompleted}
        onClose={() => {}}
        onExitInterview={() => {
          // Handle exit interview logic here
          router.push("/find-jobs?activeItem=Interviews");
        }}
      />
    </>
  );
};

export default InterviewChatPanel;

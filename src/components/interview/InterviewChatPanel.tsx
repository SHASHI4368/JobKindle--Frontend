"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Square } from "lucide-react";
import axios from "axios";
import {
  createInterview,
  getInterviewDetails,
  startGeneralInterview,
  updateConversation,
} from "@/actions/interviewActions";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getApplicationById } from "@/actions/applicationActions";
import { Conversation, InterviewApplicationDetails } from "@/types/interview";

interface Message {
  id: string;
  text: string;
  isAI: boolean;
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
  const [loading, setLoading] = useState(false);
  const [applicationData, setApplicationData] =
    useState<InterviewApplicationDetails | null>(null);
  const [messages, setMessages] = useState<Conversation[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const account = useSelector((state: any) => state.account);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmitAnswer = () => {
    if (currentAnswer.trim()) {
      const newMessage: Conversation = {
        text: currentAnswer,
        isAI: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newMessage]);
      onAnswerSubmitted(currentAnswer);
      setCurrentAnswer("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitAnswer();
    }
  };

 const CheckInterviewIsThere = async (applicationId: string) => {
   try {
     const response = await getInterviewDetails(Number(applicationId));
     if (response.success) {
       console.log("Interview details fetched:", response.data);
       const messages = response.data.conversation.map((msg: any) => ({
         id: msg._id,
         text: msg.text,
         isAI: msg.isAI,
         timestamp: new Date(msg.timestamp),
       }));
       setMessages(messages);
       return messages.length > 0; // Return whether messages exist
     } else {
       return false;
     }
   } catch (error) {
     console.error("Error registering interview:", error);
     return false;
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

 const getFirstQuestion = async (
   applicationData: InterviewApplicationDetails | null
 ) => {
   if (!applicationData) return;

   try {
     const response = await startGeneralInterview(applicationData.userEmail);
     const question = response.question;

     if (response.success) {
       const messageRes = await updateConversation(
         applicationData.applicationId.toString(),
         {
           text: question,
           isAI: true,
           timestamp: new Date(),
         }
       );

       if (messageRes.success) {
         setMessages((prev) => [...prev, messageRes.data]);
       }
     }
   } catch (error) {
     console.error("Error fetching first question:", error);
   }
 };

 useEffect(() => {
   const applicationId = window.location.pathname.split("/").pop();

   const initInterview = async () => {
     // 1. Get application data
     const appDetails = await getApplicationDetailsById(applicationId || "");
     if (!appDetails) return;

     // 2. Check if interview already exists
     const hasMessages = await CheckInterviewIsThere(applicationId || "");

     // 3. If no messages, register and get first question
     if (!hasMessages) {
       await registerInterview(applicationId || "");
       await getFirstQuestion(appDetails);
     }
   };

   initInterview();
 }, []);


  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In real implementation, integrate with speech-to-text API
  };

  const addAIMessage = (text: string) => {
    const aiMessage: Message = {
      id: Date.now().toString(),
      text,
      isAI: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  // Simulate AI responses
  // useEffect(() => {
  //   if (
  //     !isWaitingForAnswer &&
  //     messages.length > 1 &&
  //     !messages[messages.length - 1].isAI
  //   ) {
  //     const timeout = setTimeout(() => {
  //       const aiResponses = [
  //         "Thank you for that answer. Let me ask you another question: Can you tell me about a challenging project you worked on?",
  //         "That's interesting. How do you handle working under pressure?",
  //         "Great response! What motivates you in your work?",
  //         "I see. Can you describe your experience with teamwork?",
  //       ];
  //       const randomResponse =
  //         aiResponses[Math.floor(Math.random() * aiResponses.length)];
  //       addAIMessage(randomResponse);
  //     }, 2000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [messages, isWaitingForAnswer]);

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
                onClick={handleSubmitAnswer}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!currentAnswer.trim() || !isWaitingForAnswer}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewChatPanel;

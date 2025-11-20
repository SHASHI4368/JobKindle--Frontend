"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InterviewResponse } from "@/types/application";
import {
  Loader2,
  Clock,
  MessageSquare,
  AlertTriangle,
  Award,
  TrendingUp,
} from "lucide-react";
import { getInterviewDetails } from "@/actions/interviewActions";
import { Violation } from "@/types/interview";

type InterviewResultsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationId: number;
};

const InterviewResultsDialog = ({
  open,
  onOpenChange,
  applicationId,
}: InterviewResultsDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [interviewResult, setInterviewResult] =
    useState<InterviewResponse | null>(null);

  useEffect(() => {
    if (open && applicationId) {
      fetchInterviewResults(applicationId);
    }
  }, [open, applicationId]);

  const fetchInterviewResults = async (applicationId: number) => {
    setLoading(true);
    try {
      const response = await getInterviewDetails(applicationId);
      console.log(response.data);
      if (response.success) {
        setInterviewResult(response.data);
      }
    } catch (e) {
      console.error("Error fetching interview results:", e);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  // now each question carries 20 marks
  const QUESTION_MAX = 20;

  // Return small accent bg class based on score (very light backgrounds)
  const getAccentClass = (score: number) => {
    const percent = (score / QUESTION_MAX) * 100;
    if (percent >= 80) return "bg-green-100 border-green-200";
    if (percent >= 60) return "bg-yellow-100 border-yellow-200";
    if (percent >= 40) return "bg-orange-100 border-orange-200";
    return "bg-red-100 border-red-200";
  };

  // Badge classes for the numeric score (slightly stronger text color but still light bg)
  const getBadgeClasses = (score: number) => {
    const percent = (score / QUESTION_MAX) * 100;
    if (percent >= 80)
      return "text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded";
    if (percent >= 60)
      return "text-yellow-700 bg-yellow-50 border border-yellow-100 px-3 py-1 rounded";
    if (percent >= 40)
      return "text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1 rounded";
    return "text-red-700 bg-red-50 border border-red-100 px-3 py-1 rounded";
  };

  // Feedback background (very subtle)
  const getFeedbackBg = (score: number) => {
    const percent = (score / QUESTION_MAX) * 100;
    if (percent >= 80) return "bg-green-50 border border-green-100";
    if (percent >= 60) return "bg-yellow-50 border border-yellow-100";
    if (percent >= 40) return "bg-orange-50 border border-orange-100";
    return "bg-red-50 border border-red-100";
  };

  const getTotalScoreColor = (score: number, maxScore: number) => {
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    if (percentage >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const calculateTimingStats = () => {
    if (!interviewResult?.conversation) return null;

    const technicalConversation = interviewResult.conversation.filter(
      (msg) => msg.isTechnical
    );

    const responseTimes: number[] = [];
    for (let i = 1; i < technicalConversation.length; i++) {
      if (!technicalConversation[i].isAI && technicalConversation[i - 1].isAI) {
        const responseTime =
          new Date(technicalConversation[i].timestamp).getTime() -
          new Date(technicalConversation[i - 1].timestamp).getTime();
        responseTimes.push(responseTime);
      }
    }

    const avgResponseTime =
      responseTimes.length > 0
        ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        : 0;

    const totalDuration =
      interviewResult.endedAt && interviewResult.startedAt
        ? new Date(interviewResult.endedAt).getTime() -
          new Date(interviewResult.startedAt).getTime()
        : 0;

    return {
      avgResponseTime,
      totalDuration,
      totalQuestions: interviewResult.evaluation?.question_wise?.length || 0,
    };
  };

  const timingStats = calculateTimingStats();

  // compute overall max (questions * QUESTION_MAX)
  const totalQuestionsCount =
    interviewResult?.evaluation?.question_wise?.length || 0;
  const overallMax = totalQuestionsCount * QUESTION_MAX;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl min-w-5xl max-h-[90vh] min-h-[90vh] beautiful-scrollbar overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Interview Results</DialogTitle>
          <DialogDescription>
            Detailed analysis of the candidate's interview performance
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-3 text-gray-600">
              Loading interview results...
            </span>
          </div>
        ) : interviewResult ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Total Score
                  </span>
                </div>
                <div
                  className={`text-3xl font-bold ${getTotalScoreColor(
                    interviewResult.evaluation?.total_score || 0,
                    overallMax
                  )}`}
                >
                  {interviewResult.evaluation?.total_score || 0}{" "}
                  <span className="text-xl text-gray-500">/{overallMax}</span>
                </div>
              </div>

              {timingStats && (
                <>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">
                        Duration
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-purple-600">
                      {formatDuration(timingStats.totalDuration)}
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-900">
                        Avg Response
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      {formatDuration(timingStats.avgResponseTime)}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Overall Feedback */}
            {interviewResult.evaluation?.overall_feedback && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Overall Feedback
                </h3>
                <p className="text-sm text-blue-800">
                  {interviewResult.evaluation.overall_feedback}
                </p>
              </div>
            )}

            {/* Interview Timeline with Violations */}
            {interviewResult.conversation &&
              interviewResult.conversation.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">
                      Interview Timeline
                    </h3>
                  </div>
                  <div className="relative border-l-2 border-gray-200 pl-6 space-y-4">
                    {(() => {
                      // Combine conversation and violations into a single timeline
                      const timeline: Array<
                        | {
                            type: "message";
                            data: (typeof interviewResult.conversation)[0];
                            timestamp: Date;
                          }
                        | {
                            type: "violation";
                            data: Violation;
                            timestamp: Date;
                          }
                      > = [
                        ...interviewResult.conversation.map((msg) => ({
                          type: "message" as const,
                          data: msg,
                          timestamp: new Date(msg.timestamp),
                        })),
                        ...interviewResult.violations.map((violation) => ({
                          type: "violation" as const,
                          data: violation,
                          timestamp: new Date(violation.timestamp),
                        })),
                      ].sort(
                        (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
                      );

                      return timeline.map((item, idx) => {
                        if (item.type === "violation") {
                          return (
                            <div
                              key={`violation-${idx}`}
                              className="relative -ml-9"
                            >
                              <div className="absolute left-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="font-medium text-red-900 text-sm">
                                      Violation Detected
                                    </div>
                                    <div className="text-sm text-red-700 mt-1">
                                      {item.data.name}
                                    </div>
                                    <div className="text-xs text-red-600 mt-1">
                                      {item.timestamp.toLocaleTimeString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          const msg = item.data;
                          if (!msg.isTechnical) return null;

                          return (
                            <div key={`msg-${idx}`} className="relative -ml-9">
                              <div
                                className={`absolute left-0 w-4 h-4 rounded-full border-2 border-white ${
                                  msg.isAI ? "bg-blue-500" : "bg-green-500"
                                }`}
                              ></div>
                              <div
                                className={`rounded-lg p-3 ${
                                  msg.isAI
                                    ? "bg-blue-50 border border-blue-100"
                                    : "bg-green-50 border border-green-100"
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                    className={`text-xs font-medium ${
                                      msg.isAI
                                        ? "text-blue-700"
                                        : "text-green-700"
                                    }`}
                                  >
                                    {msg.isAI ? "Interviewer" : "Candidate"}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {item.timestamp.toLocaleTimeString()}
                                  </span>
                                </div>
                                <p
                                  className={`text-sm ${
                                    msg.isAI
                                      ? "text-blue-900"
                                      : "text-green-900"
                                  }`}
                                >
                                  {msg.text}
                                </p>
                              </div>
                            </div>
                          );
                        }
                      });
                    })()}
                  </div>
                </div>
              )}

            {/* Question-wise Analysis */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">
                  Question-wise Performance
                </h3>
              </div>
              {interviewResult.evaluation?.question_wise?.map((item, idx) => (
                <div
                  key={idx}
                  className={`border rounded-lg overflow-hidden ${getAccentClass(
                    item.score
                  )}`}
                >
                  {/* small colored accent */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Question {idx + 1}
                        </h4>
                        <p className="text-sm text-gray-700">{item.question}</p>
                      </div>
                      <div
                        className={`text-sm font-semibold ${getBadgeClasses(
                          item.score
                        )}`}
                      >
                        {item.score}/{QUESTION_MAX}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-medium text-gray-600">
                        Answer:
                      </span>
                      <p className="text-sm text-gray-800 mt-1">
                        {item.answer}
                      </p>
                    </div>

                    <div className={`p-3 rounded ${getFeedbackBg(item.score)}`}>
                      <span className="text-xs font-medium text-gray-600">
                        Feedback:
                      </span>
                      <p className="text-sm text-gray-800 mt-1">
                        {item.feedback}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No interview results available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InterviewResultsDialog;

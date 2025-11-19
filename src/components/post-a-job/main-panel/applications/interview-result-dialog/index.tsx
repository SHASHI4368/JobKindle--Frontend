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
      <DialogContent className="max-w-5xl font-geist-sans min-w-5xl beautiful-scrollbar max-h-[90vh] min-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Interview Results
          </DialogTitle>
          <DialogDescription>
            Detailed analysis of the candidate's interview performance
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Loading interview results...</p>
          </div>
        ) : interviewResult ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Total Score</h3>
                </div>
                <p
                  className={`text-3xl font-bold ${getTotalScoreColor(
                    interviewResult.evaluation?.total_score || 0,
                    overallMax || 1
                  )}`}
                >
                  {interviewResult.evaluation?.total_score || 0}{" "}
                  <span className="text-lg font-normal text-gray-600">
                    /{overallMax}
                  </span>
                </p>
              </div>

              {timingStats && (
                <>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <h3 className="font-semibold text-purple-900">
                        Duration
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">
                      {formatDuration(timingStats.totalDuration)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold text-green-900">
                        Avg Response
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-green-900">
                      {formatDuration(timingStats.avgResponseTime)}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Overall Feedback */}
            {interviewResult.evaluation?.overall_feedback && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" /> Overall Feedback
                </h3>
                <p className="text-gray-700">
                  {interviewResult.evaluation.overall_feedback}
                </p>
              </div>
            )}

            {/* Violations */}
            {interviewResult.violations &&
              interviewResult.violations.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> Violations Detected
                  </h3>
                  <ul className="space-y-2">
                    {interviewResult.violations.map((violation, idx) => (
                      <li key={idx} className="text-red-700">
                        •{" "}
                        {typeof violation === "string"
                          ? violation
                          : JSON.stringify(violation)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Question-wise Analysis */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                Question-wise Performance
              </h3>
              <div className="space-y-4">
                {interviewResult.evaluation?.question_wise?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border border-gray-200 bg-white`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 flex items-start gap-3">
                        {/* small colored accent */}
                        <span
                          className={`inline-block w-3 h-3 rounded-full mt-2 ${getAccentClass(
                            item.score
                          )}`}
                          aria-hidden
                        />
                        <div>
                          <h4 className="font-semibold mb-1">
                            Question {idx + 1}
                          </h4>
                          <p className="text-sm italic mb-0 text-gray-700">
                            {item.question}
                          </p>
                        </div>
                      </div>

                      <div className="ml-4 flex flex-col items-center">
                        <div className={`${getBadgeClasses(item.score)}`}>
                          {item.score}/{QUESTION_MAX}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mt-3">
                      <div>
                        <span className="font-semibold text-sm">Answer:</span>
                        <p className="text-sm mt-1 p-3 rounded bg-slate-50 border border-slate-100">
                          {item.answer}
                        </p>
                      </div>

                      <div>
                        <span className="font-semibold text-sm">Feedback:</span>
                        <p
                          className={`text-sm mt-1 p-2 rounded ${getFeedbackBg(
                            item.score
                          )}`}
                        >
                          {item.feedback}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-600">No interview results available</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default InterviewResultsDialog;

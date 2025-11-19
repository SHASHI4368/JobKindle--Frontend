"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApplicationResponse } from "@/types/application";
import Cookies from "js-cookie";
import { getScreeningResult } from "@/actions/applicationActions";
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Github,
  FileText,
  Brain,
  Target,
} from "lucide-react";

type ScreeningResultsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicantEmail: string;
};

const ScreeningResultsDialog = ({
  open,
  onOpenChange,
  applicantEmail,
}: ScreeningResultsDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [screeningResult, setScreeningResult] = useState<ApplicationResponse>({
    candidate_name: "",
    cv_summary: "",
    github_summary: "",
    email: "",
    match_analysis: "",
    score: 0,
  });

  useEffect(() => {
    if (open && applicantEmail) {
      fetchScreeningResult(applicantEmail);
    }
  }, [open, applicantEmail]);

  const fetchScreeningResult = async (email: string) => {
    setLoading(true);
    const jobPostId = window.location.pathname.split("/").pop();
    const jwt = Cookies.get("jwt") || "";
    if (!jwt || !jobPostId) {
      console.error(
        "Unable to fetch screening results. Missing authentication or job post ID."
      );
      setLoading(false);
      return;
    }
    try {
      const response = await getScreeningResult(email, Number(jobPostId), jwt);
      console.log(response.data);
      if (response.success) {
        setScreeningResult(response.data);
      }
    } catch (e) {
      console.error("Error fetching screening results:", e);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-6 h-6" />;
    if (score >= 60) return <AlertCircle className="w-6 h-6" />;
    return <XCircle className="w-6 h-6" />;
  };

  const parseMarkdown = (text: string) => {
    // Simple markdown parser for bold and sections
    return text.split("\n").map((line, i) => {
      if (line.startsWith("###")) {
        return (
          <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-gray-800">
            {line.replace(/###/g, "").trim()}
          </h3>
        );
      }
      if (line.startsWith("##")) {
        return (
          <h2 key={i} className="text-xl font-bold mt-5 mb-3 text-gray-900">
            {line.replace(/##/g, "").trim()}
          </h2>
        );
      }
      if (line.startsWith("* **")) {
        const content = line.replace(/\*\*/g, "").replace("* ", "");
        return (
          <li key={i} className="ml-4 mb-1 text-gray-700">
            {content}
          </li>
        );
      }
      if (line.startsWith("* ")) {
        return (
          <li key={i} className="ml-4 mb-1 text-gray-700">
            {line.replace("* ", "")}
          </li>
        );
      }
      if (line.startsWith("\t+ ")) {
        return (
          <li key={i} className="ml-8 mb-1 text-gray-600 list-disc">
            {line.replace("\t+ ", "")}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={i} />;
      }
      return (
        <p key={i} className="mb-2 text-gray-700">
          {line}
        </p>
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-auto beautiful-scrollbar bg-white"
        style={{
          minWidth: "85vw",
          minHeight: "85vh",
          maxHeight: "90vh",
        }}
      >
        {loading ? (
         <>
         <DialogTitle></DialogTitle>
          <div className="flex items-center justify-center h-full min-h-96">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading screening results...</p>
            </div>
          </div>
          </>
        ) : (
          <>
            <DialogHeader className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <User className="w-6 h-6" />
                    {screeningResult.candidate_name || "Candidate Profile"}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-2 mt-2 text-base">
                    <Mail className="w-4 h-4" />
                    {screeningResult.email || applicantEmail}
                  </DialogDescription>
                </div>
                <div
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg border-2 ${getScoreColor(
                    screeningResult.score
                  )}`}
                >
                  {getScoreIcon(screeningResult.score)}
                  <div>
                    <p className="text-xs font-medium opacity-75">
                      Match Score
                    </p>
                    <p className="text-3xl font-bold">
                      {screeningResult.score}%
                    </p>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Match Analysis */}
              {screeningResult.match_analysis && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">
                      Match Analysis
                    </h2>
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-800">
                    {parseMarkdown(screeningResult.match_analysis)}
                  </div>
                </div>
              )}

              {/* CV Summary */}
              {screeningResult.cv_summary && (
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-900">
                      CV Summary
                    </h2>
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-800">
                    {parseMarkdown(screeningResult.cv_summary)}
                  </div>
                </div>
              )}

              {/* GitHub Summary */}
              {screeningResult.github_summary && (
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Github className="w-5 h-5 text-gray-700" />
                    <h2 className="text-xl font-bold text-gray-900">
                      GitHub Analysis
                    </h2>
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-800">
                    {parseMarkdown(screeningResult.github_summary)}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScreeningResultsDialog;

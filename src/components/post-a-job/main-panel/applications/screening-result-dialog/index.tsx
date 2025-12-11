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
    const lines = text.split("\n");
    const elements:any = [];
    let listItems: any[] = [];
    let nestedListItems: any[] = [];
    let listKey = 0;

    const flushNestedList = () => {
      if (nestedListItems.length > 0) {
        listItems.push(
          <ul key={`nested-${listKey++}`} className="ml-8 mt-2 space-y-1.5">
            {nestedListItems}
          </ul>
        );
        nestedListItems = [];
      }
    };

    const flushList = () => {
      flushNestedList();
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${listKey++}`} className="space-y-3 mb-5 ml-2">
            {listItems}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmedLine = line.trim();

      // Handle headers
      if (trimmedLine.startsWith("###")) {
        flushList();
        const content = trimmedLine.replace(/###/g, "").trim();
        elements.push(
          <h3
            key={i}
            className="text-lg font-semibold mt-8 mb-4 text-gray-800 flex items-center gap-2 pl-1"
          >
            <span className="text-blue-500">▶</span>
            {content}
          </h3>
        );
      } else if (trimmedLine.startsWith("##")) {
        flushList();
        const content = trimmedLine.replace(/##/g, "").trim();
        elements.push(
          <h2
            key={i}
            className="text-xl font-bold mt-8 mb-5 text-gray-900 border-b-2 border-blue-100 pb-3"
          >
            {content}
          </h2>
        );
      }
      // Handle bold with bullets (convert ** markers)
      else if (trimmedLine.match(/^\*\s+\*\*.*\*\*/)) {
        flushNestedList();
        const content = trimmedLine
          .replace(/^\*\s+/, "")
          .replace(/\*\*/g, "")
          .trim();
        const [label, ...rest] = content.split(":");

        if (rest.length > 0) {
          listItems.push(
            <li key={i} className="flex items-start gap-3 text-gray-700 pl-2">
              <span className="text-blue-500 mt-1 font-bold text-lg">•</span>
              <div className="flex-1">
                <span className="font-semibold text-gray-900">{label}:</span>
                <span className="ml-1.5">{rest.join(":").trim()}</span>
              </div>
            </li>
          );
        } else {
          listItems.push(
            <li key={i} className="flex items-start gap-3 text-gray-700 pl-2">
              <span className="text-blue-500 mt-1 font-bold text-lg">•</span>
              <span className="font-semibold text-gray-900 flex-1">
                {content}
              </span>
            </li>
          );
        }
      }
      // Handle regular bullets
      else if (trimmedLine.startsWith("* ")) {
        flushNestedList();
        const content = trimmedLine
          .replace(/^\*\s+/, "")
          .replace(/\*\*/g, "")
          .trim();
        listItems.push(
          <li key={i} className="flex items-start gap-3 text-gray-700 pl-2">
            <span className="text-blue-500 mt-1 font-bold text-lg">•</span>
            <span className="flex-1">{content}</span>
          </li>
        );
      }
      // Handle nested bullets (tabs or multiple spaces with + symbol)
      else if (trimmedLine.match(/^\t\+\s+/) || line.match(/^\s{2,}\+\s+/)) {
        const content = trimmedLine
          .replace(/^\+\s+/, "")
          .replace(/\*\*/g, "")
          .trim();
        nestedListItems.push(
          <li
            key={i}
            className="flex items-start gap-2.5 text-gray-600 text-sm pl-1"
          >
            <span className="text-gray-400 mt-1">◦</span>
            <span className="flex-1">{content}</span>
          </li>
        );
      }
      // Handle empty lines
      else if (trimmedLine === "") {
        flushList();
      }
      // Handle regular paragraphs (remove ** markers)
      else {
        flushList();
        const content = trimmedLine.replace(/\*\*/g, "");
        if (content) {
          elements.push(
            <p key={i} className="mb-4 text-gray-700 leading-relaxed pl-2">
              {content}
            </p>
          );
        }
      }
    });

    // Flush any remaining lists
    flushList();

    return elements;
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

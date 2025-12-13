"use client";

import React, { useState } from "react";
import { CheckCircle, LogOut } from "lucide-react";

interface InterviewCompletedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExitInterview: () => void;
}

const InterviewCompletedDialog: React.FC<InterviewCompletedDialogProps> = ({
  isOpen,
  onClose,
  onExitInterview,
}) => {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);

  const endInterview = async () => {
    try {
      setLoading(true);
      await onExitInterview();
    } catch (err) {
      console.error("Error ending interview:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 animate-in fade-in duration-200">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Interview Completed
              </h2>
              <p className="text-sm text-gray-600">
                Successfully completed the interview
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                All responses have been saved
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Interview evaluation completed
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Data uploaded successfully
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Thank you for participating in this interview. Your responses and
              performance have been recorded. You can now safely exit the
              interview environment.
            </p>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onExitInterview}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200 
    text-white
    ${
      loading
        ? "bg-green-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }
  `}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Exiting...
                </div>
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
                  Exit Interview
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCompletedDialog;

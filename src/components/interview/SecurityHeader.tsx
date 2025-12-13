import React from "react";
import { Shield, AlertTriangle, Clock, X } from "lucide-react";

type SecurityHeaderProps = {
  warningCount: number;
  faceDetected: boolean;
  timeRemaining: number;
  onEndInterview: () => void;
  isInterviewCompleted?: boolean; // Add this
};

const SecurityHeader = ({
  warningCount,
  faceDetected,
  timeRemaining,
  onEndInterview,
  isInterviewCompleted = false, // Add this
}: SecurityHeaderProps) => {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`p-3 z-[10000] ${isInterviewCompleted ? "bg-green-600" : "bg-red-600"}`}
    >
      <div className="flex items-center justify-between text-white text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>
              {isInterviewCompleted
                ? "✅ INTERVIEW COMPLETED"
                : "🔒 SECURE INTERVIEW MODE - ALL ACTIONS MONITORED"}
            </span>
          </div>

          {!isInterviewCompleted && warningCount > 0 && (
            <div className="flex items-center gap-2 bg-red-700 px-3 py-1 rounded animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              <span>⚠️ VIOLATIONS: {warningCount}/20</span>
            </div>
          )}

          {!isInterviewCompleted && !faceDetected && (
            <div className="flex items-center gap-2 bg-yellow-600 px-3 py-1 rounded animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              <span>👤 FACE NOT DETECTED</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isInterviewCompleted && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>⏱️ {formatTime(timeRemaining)}</span>
            </div>
          )}
          <button
            onClick={onEndInterview}
            className={`flex items-center  gap-2 px-3 py-1 rounded text-sm font-medium transition-all ${
              isInterviewCompleted
                ? "bg-green-700 hover:bg-green-800 cursor-pointer"
                : "bg-red-700 hover:bg-red-800 "
            }`}
          >
            <X className="w-4 h-4" />
            {isInterviewCompleted
              ? "EXIT INTERVIEW"
              : "END INTERVIEW (Disabled)"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityHeader;

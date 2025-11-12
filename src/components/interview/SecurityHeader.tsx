import React from "react";
import { Shield, AlertTriangle, Clock, X } from "lucide-react";

type SecurityHeaderProps = {
  warningCount: number;
  faceDetected: boolean;
  timeRemaining: number;
  onEndInterview: () => void;
};

const SecurityHeader = ({
  warningCount,
  faceDetected,
  timeRemaining,
  onEndInterview,
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
    <div className="bg-red-600 p-3">
      <div className="flex items-center justify-between text-white text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>🔒 SECURE INTERVIEW MODE - ALL ACTIONS MONITORED</span>
          </div>

          {warningCount > 0 && (
            <div className="flex items-center gap-2 bg-red-700 px-3 py-1 rounded animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              <span>⚠️ VIOLATIONS: {warningCount}/5</span>
            </div>
          )}

          {!faceDetected && (
            <div className="flex items-center gap-2 bg-yellow-600 px-3 py-1 rounded animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              <span>👤 FACE NOT DETECTED</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>⏱️ {formatTime(timeRemaining)}</span>
          </div>
          <button
            onClick={onEndInterview}
            className="flex items-center gap-2 bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-sm font-medium"
          >
            <X className="w-4 h-4" />
            END INTERVIEW
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityHeader;

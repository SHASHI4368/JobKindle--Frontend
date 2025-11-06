import React from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";

type EmailProgressProps = {
  progress: number;
  sentCount: number;
  failedCount: number;
  totalCount: number;
};

const EmailProgress = ({
  progress,
  sentCount,
  failedCount,
  totalCount,
}: EmailProgressProps) => {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">
          Sending Progress
        </h3>
        <span className="text-sm font-medium text-gray-600">
          {sentCount + failedCount} of {totalCount}
        </span>
      </div>
      <Progress value={progress} className="h-2.5 mb-4" />
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-green-700">
          <CheckCircle2 className="w-4 h-4" />
          <span className="font-medium">{sentCount} Sent</span>
        </div>
        {failedCount > 0 && (
          <div className="flex items-center gap-1.5 text-red-700">
            <XCircle className="w-4 h-4" />
            <span className="font-medium">{failedCount} Failed</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-gray-600 ml-auto">
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>
    </div>
  );
};

export default EmailProgress;

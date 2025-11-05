import React from "react";
import { AlertCircle } from "lucide-react";

type EmailSummaryProps = {
  isValid: boolean;
  count: number;
  sendMode: "selected" | "count";
  maxCount: number;
};

const EmailSummary = ({
  isValid,
  count,
  sendMode,
  maxCount,
}: EmailSummaryProps) => {
  if (!isValid) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-900">
            {sendMode === "selected"
              ? "No candidates selected"
              : "Invalid number entered"}
          </p>
          <p className="text-sm text-amber-700 mt-0.5">
            {sendMode === "selected"
              ? "Please select at least one candidate from the table before sending emails."
              : `Please enter a number between 1 and ${maxCount}.`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Total Recipients</p>
          <p className="text-xs text-gray-600 mt-0.5">
            Emails will be sent to these candidates
          </p>
        </div>
        <div className="text-3xl font-bold text-blue-700">{count}</div>
      </div>
    </div>
  );
};

export default EmailSummary;

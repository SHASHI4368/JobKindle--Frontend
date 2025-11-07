"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, XCircle } from "lucide-react";

interface ViolationAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  violationType: string;
  violationMessage: string;
  warningCount: number;
}

const ViolationAlertDialog: React.FC<ViolationAlertDialogProps> = ({
  isOpen,
  onClose,
  violationType,
  violationMessage,
  warningCount,
}) => {
  const isHighWarning = warningCount >= 3;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isHighWarning ? (
              <XCircle className="w-6 h-6 text-red-600" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            )}
            <span
              className={isHighWarning ? "text-red-600" : "text-yellow-600"}
            >
              Security Violation Detected
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg ${
              isHighWarning ? "bg-red-50" : "bg-yellow-50"
            }`}
          >
            <h3 className="font-semibold text-gray-900 mb-2">
              Violation Type: {violationType}
            </h3>
            <p className="text-sm text-gray-700 mb-3">{violationMessage}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Warning Count:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  isHighWarning
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {warningCount}/5
              </span>
            </div>
          </div>

          {isHighWarning && (
            <div className="bg-red-100 border border-red-300 p-3 rounded-lg">
              <p className="text-sm text-red-800 font-medium">
                ⚠️ You have reached {warningCount} violations. One more
                violation will automatically end your interview.
              </p>
            </div>
          )}

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Reminder:</strong> Please keep this window in focus and
              avoid switching tabs, minimizing the window, or using prohibited
              shortcuts during the interview.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              isHighWarning
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-yellow-600 hover:bg-yellow-700 text-white"
            }`}
          >
            I Understand
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViolationAlertDialog;

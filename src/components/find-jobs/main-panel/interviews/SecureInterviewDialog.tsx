"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield, AlertTriangle } from "lucide-react";

interface InterviewDetails {
  jobTitle: string;
  companyName: string;
  interviewDate: string;
  interviewTime: string;
  interviewMode: string;
  interviewerName?: string;
  interviewInstructions?: string;
}

interface SecureInterviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  interviewData: InterviewDetails;
}

const SecureInterviewDialog: React.FC<SecureInterviewDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  interviewData,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center mb-4">
              <Shield className="w-16 h-16 text-blue-600 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Secure Interview Environment
              </h1>
              <p className="text-gray-600 font-normal">
                You're about to enter a secure interview session
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Interview Details
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Position:</span>{" "}
                {interviewData.jobTitle}
              </p>
              <p>
                <span className="font-medium">Company:</span>{" "}
                {interviewData.companyName}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {interviewData.interviewDate}
              </p>
              <p>
                <span className="font-medium">Time:</span>{" "}
                {interviewData.interviewTime}
              </p>
              <p>
                <span className="font-medium">Mode:</span>{" "}
                {interviewData.interviewMode}
              </p>
              {interviewData.interviewerName && (
                <p>
                  <span className="font-medium">Interviewer:</span>{" "}
                  {interviewData.interviewerName}
                </p>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Security Notice
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• This interview session will be monitored for security</li>
              <li>• Switching tabs or windows will be logged</li>
              <li>• Right-click and developer tools are disabled</li>
              <li>• The session will run in fullscreen mode</li>
              <li>• Any violations will be recorded</li>
            </ul>
          </div>

          {interviewData.interviewInstructions && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Instructions
              </h3>
              <p className="text-sm text-gray-700">
                {interviewData.interviewInstructions}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Start Secure Interview
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecureInterviewDialog;

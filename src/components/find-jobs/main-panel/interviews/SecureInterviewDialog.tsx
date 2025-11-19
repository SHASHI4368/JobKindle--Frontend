"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield, AlertTriangle } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { InterviewCard } from "@/types/interview";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { InterviewScheduleDetails } from "./types";


interface SecureInterviewDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  interviewData: InterviewScheduleDetails;
}

const SecureInterviewDialog: React.FC<SecureInterviewDialogProps> = ({
  open,
  onClose,
  onConfirm,
  interviewData,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl min-w-2xl w-full max-h-[90vh] font-geist-sans overflow-y-auto beautiful-scrollbar">
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
                {interviewData.jobData.jobTitle}
              </p>
              <p>
                <span className="font-medium">Company:</span>{" "}
                {interviewData.jobData.companyName}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {interviewData.interviewDate}
              </p>
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
        </div>

        <div className="flex gap-3">
          <Button
            variant={"default"}
            onClick={onConfirm}
            className="flex-1 h-[45px]"
          >
            Start Secure Interview
          </Button>
          <Button variant={'outline'} onClick={onClose} className="h-[45px]">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecureInterviewDialog;

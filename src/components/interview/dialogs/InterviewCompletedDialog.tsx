"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                Interview Completed
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                The interview was successfully completed.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-700">
            Thank you for participating. You can exit the interview now. A copy
            of the conversation may be stored for review.
          </p>
        </div>

        <DialogFooter className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>

          <Button
            onClick={onExitInterview}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Exit Interview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewCompletedDialog;

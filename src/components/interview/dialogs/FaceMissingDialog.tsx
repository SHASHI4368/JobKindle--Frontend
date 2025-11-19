"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CameraOff } from "lucide-react";

type Props = {
  open: boolean;
  onRetry?: () => void;
};

const FaceMissingDialog: React.FC<Props> = ({ open, onRetry }) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        /* keep modal until face appears */
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
              <CameraOff className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                Face Not Detected
              </DialogTitle>
              <p className="text-sm text-gray-600">
                We cannot detect your face. Please make sure your camera is on,
                your face is visible, and allow camera permissions. The
                interview will resume once your face is visible.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 flex gap-2 justify-end">
          <Button variant="outline" onClick={onRetry}>
            Retry Detection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FaceMissingDialog;

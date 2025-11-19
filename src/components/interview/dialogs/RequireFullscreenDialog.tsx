"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";

type Props = {
  open: boolean;
  onRequestFullscreen: () => void;
};

const RequireFullscreenDialog: React.FC<Props> = ({
  open,
  onRequestFullscreen,
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        /* intentionally immutable until user enters fullscreen */
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
              <Maximize2 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                Enter Fullscreen
              </DialogTitle>
              <p className="text-sm text-gray-600">
                To ensure a secure interview environment you must enter
                fullscreen mode. Please click the button below to enter
                fullscreen.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            onClick={onRequestFullscreen}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Enter Fullscreen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequireFullscreenDialog;

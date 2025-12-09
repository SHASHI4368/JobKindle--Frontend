"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  jobTitle?: string | null;
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmRemoveDialog: React.FC<Props> = ({
  open,
  jobTitle,
  onConfirm,
  onClose,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="space-y-1">
            <DialogTitle className="text-lg font-semibold">
              Remove Application
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Are you sure you want to remove your application
              {jobTitle ? (
                <>
                  {" "}
                  for <strong className="text-gray-800">{jobTitle}</strong>
                </>
              ) : (
                ""
              )}
              ? This action cannot be undone.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmRemoveDialog;

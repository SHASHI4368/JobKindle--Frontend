import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type SendEmailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
};

const SendEmailDialog = ({
  open,
  onOpenChange,
  selectedCount,
}: SendEmailDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send Email to Selected Candidates</DialogTitle>
          <DialogDescription>
            Compose an email to send to {selectedCount} selected candidate(s)
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Email subject..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md min-h-[200px] beautiful-scrollbar"
              placeholder="Compose your message..."
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Send Email</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendEmailDialog;

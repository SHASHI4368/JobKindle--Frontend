import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Mail,
  CheckCircle2,
  XCircle,
  Loader2,
  Users,
  Hash,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Application } from "@/types/application";

type SendEmailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  selectedCandidates: number[];
  allApplications: Application[];
};

type EmailStatus = {
  id: number;
  email: string;
  name: string;
  status: "pending" | "sending" | "sent" | "failed";
  error?: string;
};

const SendEmailDialog = ({
  open,
  onOpenChange,
  selectedCount,
  selectedCandidates,
  allApplications,
}: SendEmailDialogProps) => {
  const [sendMode, setSendMode] = useState<"selected" | "count">("selected");
  const [recipientCount, setRecipientCount] = useState<string>("1");
  const [isSending, setIsSending] = useState(false);
  const [emailStatuses, setEmailStatuses] = useState<EmailStatus[]>([]);
  const [progress, setProgress] = useState(0);

  const handleSendEmails = async () => {
    setIsSending(true);
    setProgress(0);

    let recipientsToSend: any[] = [];

    if (sendMode === "selected") {
      if (allApplications)
        recipientsToSend = allApplications.filter((app) =>
          selectedCandidates.includes(app.applicationId)
        );
    } else {
      if (!allApplications) return;
      const count = Math.min(
        parseInt(recipientCount) || 1,
        allApplications.length
      );
      recipientsToSend = allApplications.slice(0, count);
    }

    // Initialize email statuses
    const initialStatuses: EmailStatus[] = recipientsToSend.map((app) => ({
      id: app.id,
      email: app.email,
      name: app.fullName,
      status: "pending",
    }));
    setEmailStatuses(initialStatuses);

    // Simulate sending emails one by one
    for (let i = 0; i < recipientsToSend.length; i++) {
      // Update status to sending
      setEmailStatuses((prev) =>
        prev.map((status, idx) =>
          idx === i ? { ...status, status: "sending" } : status
        )
      );

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate 90% success rate
      const isSuccess = Math.random() > 0.1;

      // Update status to sent or failed
      setEmailStatuses((prev) =>
        prev.map((status, idx) =>
          idx === i
            ? {
                ...status,
                status: isSuccess ? "sent" : "failed",
                error: isSuccess ? undefined : "Failed to send email",
              }
            : status
        )
      );

      // Update progress
      setProgress(((i + 1) / recipientsToSend.length) * 100);
    }

    setIsSending(false);
  };

  const handleClose = () => {
    if (!isSending) {
      onOpenChange(false);
      // Reset state after closing
      setTimeout(() => {
        setEmailStatuses([]);
        setProgress(0);
        setSendMode("selected");
        setRecipientCount("1");
      }, 300);
    }
  };

  const getStatusIcon = (status: EmailStatus["status"]) => {
    switch (status) {
      case "pending":
        return (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
        );
      case "sending":
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      case "sent":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: EmailStatus["status"]) => {
    switch (status) {
      case "pending":
        return "bg-white border-gray-200";
      case "sending":
        return "bg-blue-50 border-blue-200";
      case "sent":
        return "bg-green-50 border-green-200";
      case "failed":
        return "bg-red-50 border-red-200";
    }
  };

  const sentCount = emailStatuses.filter((s) => s.status === "sent").length;
  const failedCount = emailStatuses.filter((s) => s.status === "failed").length;

  const totalRecipients =
    sendMode === "selected"
      ? selectedCount
      : Math.min(parseInt(recipientCount) || 1, allApplications.length);

  const isValidSelection =
    (sendMode === "selected" && selectedCount > 0) ||
    (sendMode === "count" &&
      parseInt(recipientCount) >= 1 &&
      parseInt(recipientCount) <= allApplications.length);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        style={{ maxWidth: "80vw" }}
        className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            Send Email to Candidates
          </DialogTitle>
          <DialogDescription>
            {emailStatuses.length === 0
              ? "Select recipients and send emails to candidates"
              : `Sending emails to ${emailStatuses.length} candidate${
                  emailStatuses.length > 1 ? "s" : ""
                }`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto beautiful-scrollbar space-y-5 py-4">
          {emailStatuses.length === 0 ? (
            // Selection Mode
            <div className="space-y-5">
              {/* Recipient Selection */}
              <div className="bg-white rounded-lg p-5 border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Choose Recipients
                </h3>
                <RadioGroup
                  value={sendMode}
                  onValueChange={(value: any) => setSendMode(value)}
                  className="space-y-3"
                >
                  {/* Selected Candidates Option */}
                  <div
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      sendMode === "selected"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSendMode("selected")}
                  >
                    <RadioGroupItem
                      value="selected"
                      id="selected"
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="selected"
                      className="flex-1 cursor-pointer space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-900">
                            Selected Candidates
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {selectedCount}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Send emails to candidates you've selected from the table
                      </p>
                    </Label>
                  </div>

                  {/* Specific Count Option */}
                  <div
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      sendMode === "count"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSendMode("count")}
                  >
                    <RadioGroupItem
                      value="count"
                      id="count"
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="count"
                      className="flex-1 cursor-pointer space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-900">
                          Specific Number of Candidates
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Send emails to the first N candidates from your list
                      </p>
                      {sendMode === "count" && (
                        <div className="pt-2">
                          <Input
                            type="number"
                            min="1"
                            max={allApplications.length}
                            value={recipientCount}
                            onChange={(e) => setRecipientCount(e.target.value)}
                            placeholder="Enter number"
                            className="w-full max-w-xs"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <p className="text-xs text-gray-500 mt-1.5">
                            Maximum: {allApplications.length} candidates
                          </p>
                        </div>
                      )}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Warning for no selection */}
              {!isValidSelection && (
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
                        : `Please enter a number between 1 and ${allApplications.length}.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Summary */}
              {isValidSelection && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Total Recipients
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Emails will be sent to these candidates
                      </p>
                    </div>
                    <div className="text-3xl font-bold text-blue-700">
                      {totalRecipients}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Sending Progress
            <div className="space-y-4">
              {/* Progress Summary */}
              <div className="bg-white rounded-lg p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-gray-900">
                    Sending Progress
                  </h3>
                  <span className="text-sm font-medium text-gray-600">
                    {sentCount + failedCount} of {emailStatuses.length}
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

              {/* Email Status List */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Recipient Status
                  </h3>
                </div>
                <div className="max-h-[350px] overflow-y-auto beautiful-scrollbar">
                  {emailStatuses.map((status, index) => (
                    <div
                      key={status.id}
                      className={`flex items-center gap-3 p-4 border-b border-gray-100 last:border-b-0 transition-colors ${
                        status.status === "sending" ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {getStatusIcon(status.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {status.name}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {status.email}
                        </p>
                        {status.error && (
                          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            {status.error}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        {status.status === "pending" && (
                          <span className="text-xs text-gray-500">Queued</span>
                        )}
                        {status.status === "sending" && (
                          <span className="text-xs text-blue-600 font-medium">
                            Sending...
                          </span>
                        )}
                        {status.status === "sent" && (
                          <span className="text-xs text-green-600 font-medium px-2 py-1 bg-green-100 rounded">
                            Sent
                          </span>
                        )}
                        {status.status === "failed" && (
                          <span className="text-xs text-red-600 font-medium px-2 py-1 bg-red-100 rounded">
                            Failed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSending}
            className="min-w-[80px]"
          >
            {emailStatuses.length > 0 && !isSending ? "Close" : "Cancel"}
          </Button>
          {emailStatuses.length === 0 && (
            <Button
              onClick={handleSendEmails}
              disabled={isSending || !isValidSelection}
              className="bg-blue-600 hover:bg-blue-700 min-w-[120px]"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Emails
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendEmailDialog;

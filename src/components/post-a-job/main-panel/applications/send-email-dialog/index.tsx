import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Application } from "@/types/application";
import RecipientSelection from "./RecipientSelection";
import EmailSummary from "./EmailSummary";
import EmailProgress from "./EmailProgress";
import EmailStatusList from "./EmailStatusList";
import RecipientPreviewList from "./RecipientPreviewList";
import Cookies from "js-cookie";
import { sendInterviewEmail } from "@/actions/applicationActions";

type SendEmailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  selectedCandidates: number[];
  allApplications: Application[];
  fetchApplications: () => void;
};

type EmailStatus = {
  id: number;
  email: string;
  name: string;
  status: "pending" | "sending" | "sent" | "failed";
  error?: string;
  interviewDate?: string | null; // added: store scheduled interview date
};

const SendEmailDialog = ({
  open,
  onOpenChange,
  selectedCount,
  selectedCandidates,
  allApplications,
  fetchApplications,  
}: SendEmailDialogProps) => {
  const [sendMode, setSendMode] = useState<"selected" | "count">("selected");
  const [recipientCount, setRecipientCount] = useState<string>("1");
  const [isSending, setIsSending] = useState(false);
  const [emailStatuses, setEmailStatuses] = useState<EmailStatus[]>([]);
  const [progress, setProgress] = useState(0);

  // new: interview date/time state (datetime-local)
  const toLocalDateTimeInput = (d: Date) =>
    new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);

  const [interviewDate, setInterviewDate] = useState<string>(() =>
    toLocalDateTimeInput(new Date())
  );

  // Build preview recipients based on current selection (before sending)
  const previewRecipients = React.useMemo(() => {
    if (!allApplications) return [];
    if (sendMode === "selected") {
      const selectedSet = new Set(selectedCandidates);
      return allApplications.filter((a) => selectedSet.has(a.applicationId));
    }
    const count = Math.min(
      parseInt(recipientCount) || 1,
      allApplications.length
    );
    return allApplications.slice(0, count);
  }, [allApplications, sendMode, selectedCandidates, recipientCount]);

  const handleSendEmails = async () => {
    const jobPostId = window.location.pathname.split("/").pop();
    const jwt = Cookies.get("jwt") || "";
    if (!jwt || !jobPostId) {
      console.error(
        "Unable to send emails. Missing authentication or job post ID."
      );
      return;
    }
    try {
      setIsSending(true);
      setProgress(0);
      const response = await sendInterviewEmail(
        Number(jobPostId),
        previewRecipients.map((app) => app.userEmail),
        interviewDate,
        jwt
      );
      console.log(response.message);
      if (response.success) {
        // simulate sending statuses
        await handleSimulateSendEmails();
        
      } else {
        // set all to failed
        const failedStatuses: EmailStatus[] = previewRecipients.map((app) => ({
          id: app.applicationId,
          email: app.userEmail,
          name: `${app.firstName} ${app.lastName}`,
          status: "failed",
          error: response.message || "Failed to send email",
          interviewDate: interviewDate,
        }));
        setEmailStatuses(failedStatuses);
        setProgress(100);
      }
    } catch (e) {
      console.error("Error sending interview emails:", e);
    } finally {
      setIsSending(false);
    }
  };

  const handleSimulateSendEmails = async () => {
    const recipientsToSend = previewRecipients;
    if (!recipientsToSend || recipientsToSend.length === 0) {
      setIsSending(false);
      return;
    }

    // convert interviewDate (local datetime-local string) to ISO for backend
    const interviewDateISO = interviewDate
      ? new Date(interviewDate).toISOString()
      : null;

    const initialStatuses: EmailStatus[] = recipientsToSend.map((app) => ({
      id: app.applicationId,
      email: app.userEmail,
      name: `${app.firstName} ${app.lastName}`,
      status: "pending",
      interviewDate: interviewDateISO,
    }));
    setEmailStatuses(initialStatuses);

    for (let i = 0; i < recipientsToSend.length; i++) {
      setEmailStatuses((prev) =>
        prev.map((status, idx) =>
          idx === i ? { ...status, status: "sending" } : status
        )
      );
      // simulate network + include interviewDate in payload (replace with real API call)
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const isSuccess = Math.random() > 0.1;
      // Example: you would call your API here and include interviewDateISO
      // await api.sendInterviewEmail({ applicationId: recipientsToSend[i].applicationId, interviewDate: interviewDateISO, ... })

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
      setProgress(((i + 1) / recipientsToSend.length) * 100);
    }

    setIsSending(false);
  };

  const handleClose = () => {
    if (!isSending) {
      fetchApplications();
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

  const sentCount = emailStatuses.filter((s) => s.status === "sent").length;
  const failedCount = emailStatuses.filter((s) => s.status === "failed").length;

  const totalRecipients = previewRecipients.length;

  // require interviewDate to be set (optional: you can make it optional by removing the interviewDate check)
  const isValidSelection =
    ((sendMode === "selected" && totalRecipients > 0) ||
      (sendMode === "count" &&
        parseInt(recipientCount) >= 1 &&
        parseInt(recipientCount) <= allApplications.length)) &&
    !!interviewDate;

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
              ? "Select recipients, choose interview date/time and send emails to candidates"
              : `Sending emails to ${emailStatuses.length} candidate${
                  emailStatuses.length > 1 ? "s" : ""
                }`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto beautiful-scrollbar space-y-5 py-4">
          {emailStatuses.length === 0 ? (
            <div className="space-y-5">
              <RecipientSelection
                sendMode={sendMode}
                setSendMode={setSendMode}
                selectedCount={selectedCount}
                recipientCount={recipientCount}
                setRecipientCount={setRecipientCount}
                maxCount={allApplications.length}
              />

              <EmailSummary
                isValid={isValidSelection}
                count={totalRecipients}
                sendMode={sendMode}
                maxCount={allApplications.length}
              />

              {/* new: interview date/time picker */}
              <div className="flex items-center gap-3">
                <label className="min-w-[160px] text-sm text-gray-700">
                  Interview date & time
                </label>
                <input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-white focus:outline-none"
                />
                <div className="text-sm text-gray-500 italic">
                  Timezone: local
                </div>
              </div>

              {/* New: show exactly who will receive the emails before sending */}
              <RecipientPreviewList recipients={previewRecipients} />
            </div>
          ) : (
            <div className="space-y-4">
              <EmailProgress
                progress={progress}
                sentCount={sentCount}
                failedCount={failedCount}
                totalCount={emailStatuses.length}
              />
              <EmailStatusList statuses={emailStatuses} />
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
              className="bg-blue-600 hover:bg-blue-700 min-w-[140px]"
              title={
                totalRecipients > 0
                  ? `Send to ${totalRecipients} recipient${
                      totalRecipients > 1 ? "s" : ""
                    }`
                  : "Send Emails"
              }
            >
              <Mail className="w-4 h-4 mr-2" />
              Send {totalRecipients > 0 ? `(${totalRecipients})` : ""}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendEmailDialog;

import React from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

type EmailStatus = {
  id: number;
  email: string;
  name: string;
  status: "pending" | "sending" | "sent" | "failed";
  error?: string;
};

type EmailStatusItemProps = {
  status: EmailStatus;
};

const EmailStatusItem = ({ status }: EmailStatusItemProps) => {
  const getStatusIcon = (statusType: EmailStatus["status"]) => {
    switch (statusType) {
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

  const getStatusText = (statusType: EmailStatus["status"]) => {
    switch (statusType) {
      case "pending":
        return <span className="text-xs text-gray-500">Queued</span>;
      case "sending":
        return (
          <span className="text-xs text-blue-600 font-medium">Sending...</span>
        );
      case "sent":
        return (
          <span className="text-xs text-green-600 font-medium px-2 py-1 bg-green-100 rounded">
            Sent
          </span>
        );
      case "failed":
        return (
          <span className="text-xs text-red-600 font-medium px-2 py-1 bg-red-100 rounded">
            Failed
          </span>
        );
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 border-b border-gray-100 last:border-b-0 transition-colors ${
        status.status === "sending" ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex-shrink-0">{getStatusIcon(status.status)}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm truncate">
          {status.name}
        </p>
        <p className="text-xs text-gray-600 truncate">{status.email}</p>
        {status.error && (
          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {status.error}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">{getStatusText(status.status)}</div>
    </div>
  );
};

export default EmailStatusItem;

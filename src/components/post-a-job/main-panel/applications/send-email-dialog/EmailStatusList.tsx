import React from "react";
import EmailStatusItem from "./EmailStatusItem";

type EmailStatus = {
  id: number;
  email: string;
  name: string;
  status: "pending" | "sending" | "sent" | "failed";
  error?: string;
};

type EmailStatusListProps = {
  statuses: EmailStatus[];
};

const EmailStatusList = ({ statuses }: EmailStatusListProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">
          Recipient Status
        </h3>
      </div>
      <div className="max-h-[350px] overflow-y-auto beautiful-scrollbar">
        {statuses.map((status) => (
          <EmailStatusItem key={status.id} status={status} />
        ))}
      </div>
    </div>
  );
};

export default EmailStatusList;

import React from "react";
import { Application } from "@/types/application";

type Props = { applicant: Application };

const initials = (name?: string) =>
  (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const ApplicantRow: React.FC<Props> = ({ applicant }) => {
  const name =
    `${applicant.firstName ?? ""} ${applicant.lastName ?? ""}`
      .trim()
      .replace(/\s+/g, " ") || applicant.userEmail;

  return (
    <div className="flex items-center gap-3 p-2 border rounded">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
        {initials(name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{name}</div>
        <div className="text-xs text-gray-500 truncate">
          {applicant.userEmail}
        </div>
      </div>
      <div className="text-xs text-gray-400">ID: {applicant.applicationId}</div>
    </div>
  );
};

export default ApplicantRow;

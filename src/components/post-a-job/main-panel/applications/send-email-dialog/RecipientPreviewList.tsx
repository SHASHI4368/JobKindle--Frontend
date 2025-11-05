import React from "react";
import { Application } from "@/types/application";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail } from "lucide-react";

type RecipientPreviewListProps = {
  recipients: Application[];
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const RecipientPreviewList = ({ recipients }: RecipientPreviewListProps) => {
  if (recipients.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Recipients Preview
        </h3>
        <span className="text-xs text-gray-600">
          {recipients.length} recipient{recipients.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="max-h-[280px] overflow-y-auto beautiful-scrollbar divide-y">
        {recipients.map((app) => {
          const name = `${app.firstName} ${app.lastName}`.trim();
          return (
            <div
              key={app.applicationId}
              className="flex items-center gap-3 p-3"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                    name || app.userEmail
                  )}`}
                  alt={name}
                />
                <AvatarFallback>
                  {initials(name || app.userEmail)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {name || "Unnamed"}
                </p>
                <p className="text-xs text-gray-600 truncate flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {app.userEmail}
                </p>
              </div>
              <span className="text-[11px] text-gray-500 px-2 py-0.5 bg-gray-50 rounded border">
                ID: {app.applicationId}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipientPreviewList;

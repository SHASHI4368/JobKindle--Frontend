"use client";

import React from "react";
import { AppliedJob } from "./types";
import Image from "next/image";

type Props = {
  job: AppliedJob;
  onRemove: (applicationId: number) => void;
  onOpenJoin?: (job: AppliedJob) => void;
};

const AppliedJobCard: React.FC<Props> = ({ job, onRemove, onOpenJoin }) => {
  return (
    <div className="flex flex-col gap-3 p-5 bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
            {job.jobData.companyLogo ? (
              <img
                src={job.jobData.companyLogo}
                alt={job.jobData.companyName}
                width={64}
                height={64}
                className="object-cover"
              />
            ) : (
              <div className="text-base text-gray-500">
                {job.jobData.companyName?.charAt(0) ?? "?"}
              </div>
            )}
          </div>

          <div>
            <div className="font-semibold text-lg">{job.jobData.jobTitle}</div>
            <div className="text-sm text-gray-600">
              {job.jobData.companyName} • {job.jobData.location ?? "Remote"}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Applied:{" "}
              <span className="text-gray-600 font-medium">
                {job.appliedAt ? new Date(job.appliedAt).toLocaleString() : "—"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-sm">
            <div className="text-gray-600">Status</div>
            <div className="font-semibold text-base">
              {job.applicationStatus}
            </div>
            <div className="text-gray-400 mt-1 text-sm">
              Interview:{" "}
              <span className="text-gray-600 font-medium">
                {job.interviewDate
                  ? new Date(job.interviewDate).toLocaleString()
                  : "Not scheduled"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenJoin && job.applicationStatus === "interview" && (
              <button
                onClick={() => onOpenJoin(job)}
                className="px-4 py-2 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
              >
                Join
              </button>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => onRemove(job.applicationId)}
        className="px-4 py-2 rounded border text-sm text-red-600 hover:bg-red-50"
        aria-label="Remove application"
      >
        Remove
      </button>
    </div>
  );
};

export default AppliedJobCard;

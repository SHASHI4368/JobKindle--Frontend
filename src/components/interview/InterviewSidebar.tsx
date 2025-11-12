import React from "react";
import InterviewDetails from "./InterviewDetails";
import ViolationLog from "./ViolationLog";
import InterviewGuidelines from "./InterviewGuidelines";

type InterviewSidebarProps = {
  interviewData: {
    jobTitle: string;
    companyName: string;
    interviewMode: string;
    interviewerName?: string;
  };
  violations: string[];
};

const InterviewSidebar = ({
  interviewData,
  violations,
}: InterviewSidebarProps) => {
  return (
    <div className="w-80 bg-gray-800 p-4 text-white overflow-y-auto">
      <div className="space-y-4">
        <InterviewDetails/>

        <ViolationLog violations={violations} />

        <InterviewGuidelines />
      </div>
    </div>
  );
};

export default InterviewSidebar;

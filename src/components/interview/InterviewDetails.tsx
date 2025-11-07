import React from "react";

type InterviewDetailsProps = {
  jobTitle: string;
  companyName: string;
  interviewMode: string;
  interviewerName?: string;
};

const InterviewDetails = ({
  jobTitle,
  companyName,
  interviewMode,
  interviewerName,
}: InterviewDetailsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Interview Details</h3>
      <div className="space-y-1 text-sm text-gray-300">
        <p>
          <strong>Position:</strong> {jobTitle}
        </p>
        <p>
          <strong>Company:</strong> {companyName}
        </p>
        <p>
          <strong>Mode:</strong> {interviewMode}
        </p>
        {interviewerName && (
          <p>
            <strong>Interviewer:</strong> {interviewerName}
          </p>
        )}
      </div>
    </div>
  );
};

export default InterviewDetails;

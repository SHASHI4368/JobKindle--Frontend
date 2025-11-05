"use client";

import NormalTextArea from "@/components/common/text-areas/normal-textarea";
import { FileText } from "lucide-react";
import React, { useState } from "react";
import { NewJobType } from "../types";

const JobDetails = ({
  jobData,
  setJobData,
}: {
  jobData: NewJobType;
  setJobData: React.Dispatch<React.SetStateAction<NewJobType>>;
}) => {
  return (
    <div className="w-full px-[20px] flex flex-col gap-4 justify-between mt-[20px] border border-gray-200 bg-white  rounded-[10px] p-4 ">
      <div className="flex flex-row items-center w-fit justify-start gap-2">
        <FileText size={25} className="text-blue-600" />
        <h1 className="font-geist-sans font-[600] text-[20px] ">Job Details</h1>
      </div>
      <NormalTextArea
        label="Job Description *"
        value={jobData.jobDescription}
        onChange={(e) =>
          setJobData({ ...jobData, jobDescription: e.target.value })
        }
        placeholder="Describe the role, responsibilities, and what you're looking for in a candidate."
        rows={6}
      />
      <NormalTextArea
        label="Requirements *"
        value={jobData.requirements}
        onChange={(e) =>
          setJobData({ ...jobData, requirements: e.target.value })
        }
        placeholder="List the skills and qualifications required for the role."
        rows={6}
      />
      <NormalTextArea
        label="Benefits *"
        value={jobData.benefits}
        onChange={(e) => setJobData({ ...jobData, benefits: e.target.value })}
        placeholder="List the benefits and perks offered for the role."
        rows={6}
      />
    </div>
  );
};

export default JobDetails;

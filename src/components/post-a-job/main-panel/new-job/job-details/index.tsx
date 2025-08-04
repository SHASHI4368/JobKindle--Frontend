"use client"

import NormalTextArea from "@/components/common/text-areas/normal-textarea";
import { FileText } from "lucide-react";
import React, { useState } from "react";

const JobDetails = () => {
 const [jobDescription, setJobDescription] = useState("");
 const [requirements, setRequirements] = useState("");
 const [benefits, setBenefits] = useState("");

 const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
   setJobDescription(e.target.value);
 }

 const handleRequirementsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
   setRequirements(e.target.value);
 }

 const handleBenefitsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
   setBenefits(e.target.value);
 }

  return (
    <div className="w-full px-[20px] flex flex-col gap-4 justify-between mt-[20px] border border-gray-200 bg-white  rounded-[10px] p-4 ">
      <div className="flex flex-row items-center w-fit justify-start gap-2">
        <FileText size={25} className="text-blue-600" />
        <h1 className="font-raleway font-[600] text-[20px] ">Job Details</h1>
      </div>
      <NormalTextArea label="Job Description *" value={jobDescription} onChange={handleJobDescriptionChange} placeholder="Describe the role, responsibilities, and what you're looking for in a candidate." rows={6} />
      <NormalTextArea label="Requirements *" value={requirements} onChange={handleRequirementsChange} placeholder="List the skills and qualifications required for the role." rows={6} />
      <NormalTextArea label="Benefits *" value={benefits} onChange={handleBenefitsChange} placeholder="List the benefits and perks offered for the role." rows={6} />
    </div>
  );
};

export default JobDetails;

"use client";

import NormalTextArea from "@/components/common/text-areas/normal-textarea";
import { FileText } from "lucide-react";
import React, { useState } from "react";
import { NewJobType } from "../types";
import { Button } from "@/components/ui/button";
import { generateStructuredJobBenefits, generateStructuredJobDescription, generateStructuredJobRequirements } from "@/lib/groq";

const JobDetails = ({
  jobData,
  setJobData,
}: {
  jobData: NewJobType;
  setJobData: React.Dispatch<React.SetStateAction<NewJobType>>;
}) => {
  const [jobDesLoading, setJobDesLoading] = useState(false);
  const [reqLoading, setReqLoading] = useState(false);
  const [benefitsLoading, setBenefitsLoading] = useState(false);

  const handleGenerateDescription = async () => {
    try {
      setJobDesLoading(true);
      const structuredDes = await generateStructuredJobDescription(
        jobData.jobDescription
      );
      console.log(structuredDes);
      setJobData({ ...jobData, jobDescription: structuredDes });
    } catch (err) {
      console.error("Error generating job description:", err);
    } finally {
      setJobDesLoading(false);
    }
  };

  const handleGenerateRequirements = async () => {
      try {
        setReqLoading(true);
        const structuredReq = await generateStructuredJobRequirements(
          jobData.requirements
        );
        console.log(structuredReq);
        setJobData({ ...jobData, requirements: structuredReq });
      } catch (err) {
        console.error("Error generating job requirements:", err);
      } finally {
        setReqLoading(false);
      }
    };
  
    const handleGenerateBenefits = async () => {
      try {
        setBenefitsLoading(true);
        const structuredBenefits = await generateStructuredJobBenefits(
          jobData.benefits
        );
        console.log(structuredBenefits);
        setJobData({ ...jobData, benefits: structuredBenefits });
      } catch (err) {
        console.error("Error generating job benefits:", err);
      } finally {
        setBenefitsLoading(false);
      }
    };

  return (
    <div className="w-full px-[20px] flex flex-col gap-4 justify-between mt-[20px] border border-gray-200 bg-white  rounded-[10px] p-4 ">
      <div className="flex flex-row items-center w-fit justify-start gap-2">
        <FileText size={25} className="text-blue-600" />
        <h1 className="font-geist-sans font-[600] text-[20px] ">Job Details</h1>
      </div>

      {/* add loading state */}
      {jobDesLoading ? (
        <>
          <div className="flex items-center justify-center min-h-12">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-primary opacity-80"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <NormalTextArea
            label="Job Description *"
            value={jobData.jobDescription}
            onChange={(e) =>
              setJobData({ ...jobData, jobDescription: e.target.value })
            }
            placeholder="Describe the role, responsibilities, and what you're looking for in a candidate."
            rows={6}
          />
          <div className="flex w-full flex-row justify-end items-center">
            <Button
              disabled={jobData.jobDescription === ""}
              onClick={handleGenerateDescription}
              className="
    bg-white
    text-gray-700
    border border-gray-300
    px-6 py-2 rounded-m
    shadow-sm
    hover:shadow-md
    hover:border-gray-400
    hover:bg-gray-50
    transition-all duration-300

    relative overflow-hidden
  "
            >
              ✨ Enhance with AI
            </Button>
          </div>
        </>
      )}
      {reqLoading ? (
        <>
          <div className="flex items-center justify-center min-h-12">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-primary opacity-80"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <NormalTextArea
            label="Requirements *"
            value={jobData.requirements}
            onChange={(e) =>
              setJobData({ ...jobData, requirements: e.target.value })
            }
            placeholder="List the skills and qualifications required for the role."
            rows={6}
          />
          <div className="flex w-full flex-row justify-end items-center">
            <Button
              disabled={jobData.requirements === ""}
              onClick={handleGenerateRequirements}
              className="
    bg-white
    text-gray-700
    border border-gray-300
    px-6 py-2 rounded-m
    shadow-sm
    hover:shadow-md
    hover:border-gray-400
    hover:bg-gray-50
    transition-all duration-300

    relative overflow-hidden
  "
            >
              ✨ Enhance with AI
            </Button>
          </div>
        </>
      )}
      {benefitsLoading ? (
        <>
          <div className="flex items-center justify-center min-h-12">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-primary opacity-80"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <NormalTextArea
            label="Benefits *"
            value={jobData.benefits}
            onChange={(e) =>
              setJobData({ ...jobData, benefits: e.target.value })
            }
            placeholder="List the benefits and perks offered for the role."
            rows={6}
          />
          <div className="flex w-full flex-row justify-end items-center">
            <Button
              disabled={jobData.benefits === ""}
              onClick={handleGenerateBenefits}
              className="
    bg-white
    text-gray-700
    border border-gray-300
    px-6 py-2 rounded-m
    shadow-sm
    hover:shadow-md
    hover:border-gray-400
    hover:bg-gray-50
    transition-all duration-300

    relative overflow-hidden
  "
            >
              ✨ Enhance with AI
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobDetails;

"use client";

import { Building2, Calendar, Clock, Video, User, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SecureInterviewDialog from "./SecureInterviewDialog";
import { InterviewCard } from "@/types/interview";
import { Button } from "@/components/ui/button";

interface InterviewListingCardProps {
  interviewData: InterviewCard;
}

const InterviewListingCard: React.FC<InterviewListingCardProps> = ({
  interviewData,
}) => {
  const router = useRouter();
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getWorkTypeDisplay = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleConfirmInterview = () => {
    const applicationId = interviewData.applicationId;
    router.push(`/interview/${applicationId}`);
  };

  return (
    <>
      <div className="w-full p-6 font-geist-sans mb-5 border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-200">
        {/* Header Section */}
        <div className="flex items-start space-x-3 sm:space-x-4">
          {interviewData.jobData.companyLogo ? (
            <img
              src={interviewData.jobData.companyLogo}
              alt={interviewData.jobData.companyName}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg"
            />
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-geist-sans font-[700] text-gray-900 mb-1 leading-tight">
              {interviewData.jobData.jobTitle}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base truncate">
                  {interviewData.jobData.companyName}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base truncate">
                  {interviewData.jobData.location}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <span className="inline-block font-[600] py-1 border rounded-full px-3 text-xs sm:text-[13px]">
                {getWorkTypeDisplay(interviewData.jobData.workType)}
              </span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Date */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Interview Date
              </p>
              <p className="text-sm text-gray-600">
                {formatDate(interviewData.interviewDate)}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Time</p>
              <p className="text-sm text-gray-600">
                {interviewData.interviewTime}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full items-center justify-between flex-row gap-3 mt-6 pt-4 ">
          <Button onClick={() => setShowSecurityDialog(true)} variant={"default"} className="h-[45px] flex-1">
            Join Interview
          </Button>
          <Button variant={"outline"} className="h-[45px] w-auto">
            Reschedule
          </Button>
        </div>
      </div>
      <SecureInterviewDialog
        open={showSecurityDialog}
        onClose={() => setShowSecurityDialog(false)}
        onConfirm={handleConfirmInterview}
        interviewData={interviewData}
      />
    </>
  );
};

export default InterviewListingCard;

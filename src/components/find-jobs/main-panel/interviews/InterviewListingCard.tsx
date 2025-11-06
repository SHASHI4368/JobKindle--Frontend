"use client";

import { Building2, Calendar, Clock, Video, User, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SecureInterviewDialog from "./SecureInterviewDialog";

interface InterviewDetails {
  jobTitle: string;
  companyName: string;
  interviewDate: string;
  interviewTime: string;
  interviewMode: string;
  interviewerName?: string;
  interviewInstructions?: string;
}

interface InterviewListingCardProps {
  interviewData: InterviewDetails;
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

  const getModeIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case "virtual":
        return <Video className="w-4 h-4" />;
      case "in-person":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode.toLowerCase()) {
      case "virtual":
        return "bg-blue-100 text-blue-800";
      case "in-person":
        return "bg-green-100 text-green-800";
      case "hybrid":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleJoinClick = () => {
    setShowSecurityDialog(true);
  };

  const handleConfirmInterview = () => {
    // Store interview data in sessionStorage for the interview page
    const interviewDataForSession = {
      jobTitle: interviewData.jobTitle,
      companyName: interviewData.companyName,
      interviewDate: interviewData.interviewDate,
      interviewTime: interviewData.interviewTime,
      interviewMode: interviewData.interviewMode,
      interviewerName: interviewData.interviewerName,
      interviewInstructions: interviewData.interviewInstructions,
    };

    sessionStorage.setItem(
      "currentInterview",
      JSON.stringify(interviewDataForSession)
    );
    setShowSecurityDialog(false);
    router.push("/find-jobs/my-interview");
  };

  const handleCloseDialog = () => {
    setShowSecurityDialog(false);
  };

  return (
    <>
      <div className="w-full p-6 mb-5 border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-200">
        {/* Header Section */}
        <div className="flex gap-3 items-start mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900 mb-1">
              {interviewData.jobTitle}
            </h1>
            <h2 className="text-lg text-gray-600">
              {interviewData.companyName}
            </h2>
          </div>
          {/* Interview Mode Badge */}
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getModeColor(
              interviewData.interviewMode
            )}`}
          >
            {getModeIcon(interviewData.interviewMode)}
            {interviewData.interviewMode}
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

          {/* Interviewer (if available) */}
          {interviewData.interviewerName && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg md:col-span-2">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Interviewer</p>
                <p className="text-sm text-gray-600">
                  {interviewData.interviewerName}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleJoinClick}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Join Interview
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
            Reschedule
          </button>
        </div>
      </div>

      {/* Security Dialog */}
      <SecureInterviewDialog
        isOpen={showSecurityDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmInterview}
        interviewData={interviewData}
      />
    </>
  );
};

export default InterviewListingCard;

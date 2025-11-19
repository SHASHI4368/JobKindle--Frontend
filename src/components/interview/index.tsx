"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CandidateVideoPanel from "@/components/interview/CandidateVideoPanel";
import InterviewChatPanel from "@/components/interview/InterviewChatPanel";
import ViolationAlertDialog from "@/components/interview/dialogs/ViolationAlertDialog";
import dummyInterviews from "@/components/find-jobs/main-panel/interviews/dummyInterviews.json";
import SecurityHeader from "./SecurityHeader";
import InterviewSidebar from "./InterviewSidebar";
import { useSecurityMonitor } from "./hooks/useSecurityMonitor";
import { useFullscreen } from "./hooks/useFullscreen";
import { useFaceDetectionMonitor } from "./hooks/useFaceDetectionMonitor";
import { useInterviewTimer } from "./hooks/useInterviewTimer";
import Cookies from "js-cookie";
import { getJobPostById } from "@/actions/jobPostActions";
import { getApplicationById } from "@/actions/applicationActions";

const Interview = () => {
  const router = useRouter();
  const [viewFullScreen, setFullScreen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [interviewData, setInterviewData] = useState<any>(null);
  const [warningCount, setWarningCount] = useState(0);
  const [violations, setViolations] = useState<string[]>([]);
  const [faceDetected, setFaceDetected] = useState(true);
  const [showViolationDialog, setShowViolationDialog] = useState(false);
  const [currentViolation, setCurrentViolation] = useState({
    type: "",
    message: "",
  });
  const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleViolation = (type: string, message: string) => {
    const newCount = warningCount + 1;
    setWarningCount(newCount);
    setViolations((prev) => [
      ...prev,
      `${type}: ${message} (${new Date().toLocaleTimeString()})`,
    ]);
    setCurrentViolation({ type, message });
    setShowViolationDialog(true);

    console.log(`VIOLATION DETECTED: ${type} - ${message}`);

    if (newCount >= 5) {
      setTimeout(async () => {
        alert("Maximum violations reached. Interview will be terminated.");
        await endInterview();
      }, 3000);
    }
  };

  const handleFullscreenExit = () => {
    handleViolation(
      "Fullscreen Exit",
      "You attempted to exit fullscreen mode. Please return to fullscreen."
    );
  };

  // Custom hooks
  const { exitFullscreen } = useFullscreen({
    enabled: viewFullScreen,
    onFullscreenExit: handleFullscreenExit,
  });

  const { timeRemaining } = useInterviewTimer({
    onTimeExpired: endInterview,
  });

  useSecurityMonitor({ handleViolation });

  useFaceDetectionMonitor({
    faceDetected,
    handleViolation,
  });

  useEffect(() => {
    setFullScreen(true);
  }, []);

  const getJobPost = async (id: number) => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try {
      const response = await getJobPostById(jwt, id);
      console.log("job post response: ", response);
      if (response.success) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching job post:", error);
    }
  };

  const getInterview = async () => {
    const applicationId = Number(window.location.pathname.split("/").pop());
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try {
      setLoading(true);
      const response = await getApplicationById(jwt, applicationId);
      console.log(response);
      if (response.success) {
        console.log("interviews: ", response.data);
        const interview = response.data;
        const jobPost = await getJobPost(interview.postId);
        if (jobPost) {
          const formattedInterview = {
            applicationId: interview.applicationId,
            jobData: {
              id: jobPost.postId,
              jobTitle: jobPost.title,
              companyName: jobPost.companyName,
              companyLogo: jobPost.companyLogo,
              location: jobPost.location,
              workType: jobPost.workType,
              experienceLevel: jobPost.experienceLevel,
              employmentType: jobPost.employmentType,
            },
            interviewDate: interview.interviewDate,
          };
          console.log(formattedInterview);
          setInterviewData(formattedInterview);
        } else {
          console.error("Job post not found for interview");
          router.push("/find-jobs");
        }
      }
    } catch (error) {
      router.push("/find-jobs");
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize interview data
  useEffect(() => {
    getInterview();
  }, [router]);

  const handleFaceDetected = (detected: boolean) => {
    setFaceDetected(detected);
  };

  const handleAnswerSubmitted = (answer: string) => {
    setIsWaitingForAnswer(false);
    setTimeout(() => {
      setIsWaitingForAnswer(true);
    }, 1000);
  };

  async function endInterview() {
    setFullScreen(false);
    await exitFullscreen();
    router.push("/find-jobs");
  }

  if (!interviewData) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading secure interview environment...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gray-900 select-none z-500 overflow-hidden"
    >
      <SecurityHeader
        warningCount={warningCount}
        faceDetected={faceDetected}
        timeRemaining={timeRemaining}
        onEndInterview={endInterview}
      />

      <div className="flex h-[calc(100vh-60px)]">
        <div className="w-1/3 p-4 space-y-4">
          <div className="h-1/2">
            <CandidateVideoPanel onFaceDetected={handleFaceDetected} />
          </div>
        </div>

        <div className="flex-1 p-4">
          <InterviewChatPanel
            onAnswerSubmitted={handleAnswerSubmitted}
            isWaitingForAnswer={isWaitingForAnswer}
          />
        </div>

        <InterviewSidebar
          interviewData={interviewData}
          violations={violations}
        />
      </div>

      <ViolationAlertDialog
        isOpen={showViolationDialog}
        onClose={() => setShowViolationDialog(false)}
        violationType={currentViolation.type}
        violationMessage={currentViolation.message}
        warningCount={warningCount}
      />
    </div>
  );
};

export default Interview;

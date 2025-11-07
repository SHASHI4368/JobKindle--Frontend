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

const Interview = () => {
  const router = useRouter();
  const [viewFullScreen, setFullScreen] = useState(true);
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

  // Initialize interview data
  useEffect(() => {
    const applicationId = Number(window.location.pathname.split("/").pop());
    const selectedInterview = dummyInterviews.find(
      (interview) => interview.applicationId === applicationId
    );
    if (selectedInterview) {
      setInterviewData(selectedInterview);
    } else {
      router.push("/find-jobs");
    }
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

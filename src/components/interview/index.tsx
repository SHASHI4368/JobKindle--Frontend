"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CandidateVideoPanel from "@/components/interview/CandidateVideoPanel";
import InterviewChatPanel from "@/components/interview/InterviewChatPanel";
import ViolationAlertDialog from "@/components/interview/dialogs/ViolationAlertDialog";
import RequireFullscreenDialog from "@/components/interview/dialogs/RequireFullscreenDialog";
import FaceMissingDialog from "@/components/interview/dialogs/FaceMissingDialog";
import SecurityHeader from "./SecurityHeader";
import InterviewSidebar from "./InterviewSidebar";
import { useSecurityMonitor } from "./hooks/useSecurityMonitor";
import { useFaceDetectionMonitor } from "./hooks/useFaceDetectionMonitor";
import { useInterviewTimer } from "./hooks/useInterviewTimer";
import Cookies from "js-cookie";
import { getJobPostById } from "@/actions/jobPostActions";
import { getApplicationById } from "@/actions/applicationActions";
import {
  updateApplicationStatus,
  updateViolations,
} from "@/actions/interviewActions";
import AITextToSpeech from "./AITextToSpeech";
import HeadPoseDetector from "./head-pose-detector";
import { CheatingProbability } from "./head-pose-detector/types";
import InterviewCompletedDialog from "./dialogs/InterviewCompletedDialog";

const Interview = () => {
  const router = useRouter();
  const [aiResponse, setAiResponse] = useState<string>("");
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
  const [isInterviewCompleted, setIsInterviewCompleted] = useState(false); // Add this

  const [cheatingProbabilityList, setCheatingProbabilityList] = useState<
    CheatingProbability[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // fullscreen state (do NOT auto-enter fullscreen)
  const [isFullscreen, setIsFullscreen] = useState(
    typeof document !== "undefined" && !!document.fullscreenElement
  );

  // detect transitions and log a violation when user exits fullscreen
  useEffect(() => {
    const prevRef = { value: !!document.fullscreenElement };

    const onFullscreenChange = () => {
      const now = !!document.fullscreenElement;
      // if previously fullscreen and now NOT fullscreen -> user exited fullscreen
      if (prevRef.value === true && now === false) {
        // mark local state and call violation handler
        setIsFullscreen(false);
        handleFullscreenExit();
      } else {
        setIsFullscreen(now);
      }
      prevRef.value = now;
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    // vendor-prefixed events for broader browser support
    document.addEventListener(
      "webkitfullscreenchange",
      onFullscreenChange as EventListener
    );
    document.addEventListener(
      "mozfullscreenchange",
      onFullscreenChange as EventListener
    );
    document.addEventListener(
      "MSFullscreenChange",
      onFullscreenChange as EventListener
    );

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        onFullscreenChange as EventListener
      );
      document.removeEventListener(
        "mozfullscreenchange",
        onFullscreenChange as EventListener
      );
      document.removeEventListener(
        "MSFullscreenChange",
        onFullscreenChange as EventListener
      );
    };
  }, []);

  const requestUserFullscreen = async () => {
    try {
      if (containerRef.current?.requestFullscreen) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        // fallback for older browsers
        alert("Fullscreen API not supported in this browser.");
      }
    } catch (e) {
      console.error("Failed to enter fullscreen:", e);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
    } catch (e) {
      console.error("Failed to exit fullscreen:", e);
    }
  };

  const addViolationToDatabase = async (type: string) => {
    const applicationId = window.location.pathname
      .split("/")
      .pop() as unknown as string;
    const violation = {
      name: type,
      timestamp: new Date(),
    };
    console.log(violation);
    try {
      const response = await updateViolations(applicationId, violation);
      if (response.success) {
        console.log("Violation recorded in database");
      }
    } catch (error) {
      console.error("Error updating violations:", error);
    }
  };

  const handleViolation = async (type: string, message: string) => {
    const newCount = warningCount + 1;
    setWarningCount(newCount);
    setViolations((prev) => [
      ...prev,
      `${type}: ${message} (${new Date().toLocaleTimeString()})`,
    ]);
    setCurrentViolation({ type, message });
    setShowViolationDialog(true);

    console.log(`VIOLATION DETECTED: ${type} - ${message}`);
    await addViolationToDatabase(`VIOLATION DETECTED: ${type}`);

    // if (newCount >= 20) {
    //   setTimeout(async () => {
    //     await endInterview();
    //   }, 3000);
    // }
  };

  const handleFullscreenExit = () => {
    // when user exits fullscreen, treat as a violation but do not force fullscreen
    handleViolation(
      "Fullscreen Exit",
      "You exited fullscreen mode. Please return to fullscreen to continue the secure interview."
    );
  };

  // Custom hooks
  useSecurityMonitor({ handleViolation });

  // keep using face detection hook if it triggers anything internally;
  // CandidateVideoPanel will call onFaceDetected to update our faceDetected state
  useFaceDetectionMonitor({
    faceDetected,
    handleViolation,
    onFaceMissing: () => {
      // ensure dialog shows immediately (Interview already uses open={!faceDetected})
      setFaceDetected(false);
    },
    onFaceRecovered: () => {
      setFaceDetected(true);
    },
    graceMs: 5000, // 5s grace (adjust as needed)
  });

  const { timeRemaining } = useInterviewTimer({
    onTimeExpired: endInterview,
  });

  // removed auto fullscreen on mount

  const getJobPost = async (id: number) => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try {
      const response = await getJobPostById(jwt, id);
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
      if (response.success) {
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

  useEffect(() => {
    getInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleFaceDetected = (faceCount: number) => {
    if (faceCount !== 0) {
      // if face appears, we can close any face dialog automatically
    } else {
      // on lost face, show violation (but also the dialog will appear)
      // handleViolation("no_face", "No face detected");
    }
  };

  const handleAnswerSubmitted = (answer: string) => {
    setIsWaitingForAnswer(false);
    setTimeout(() => {
      setIsWaitingForAnswer(true);
    }, 1000);
  };

  const handleInterviewCompleted = (completed: boolean) => {
    setIsInterviewCompleted(completed);
  };

  async function endInterview() {
    await exitFullscreen();
    router.push("/find-jobs");
  }

  const handleEndInterview = async () => {
    const applicationId = Number(window.location.pathname.split("/").pop());
    try {
      const statusRes = await updateApplicationStatus(
        Cookies.get("jwt") || "",
        Number(applicationId),
        "INTERVIEW_FINISHED"
      );
      console.log(statusRes.data);
      if(statusRes.success){
        router.push("/find-jobs?activeItem=Interviews");
      }
    } catch (err) {
      console.error("Error updating application status:", err);
    }
  };

  if (!interviewData) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-[5000]">
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
        isInterviewCompleted={isInterviewCompleted} // Add this
      />

      <div className="flex h-[calc(100vh-60px)]">
        <div className="w-1/3 p-4 flex flex-col space-y-4 ">
          <div className="h-1/2">
            <HeadPoseDetector
              handleViolationsUpdate={handleViolation}
              cheatingProbabilityList={cheatingProbabilityList}
              setCheatingProbabilityList={setCheatingProbabilityList}
              handleFaceDetected={handleFaceDetected}
            />
          </div>
          <div id="ai-bot" className="h-1/2  rounded-[5px]">
            <AITextToSpeech text={aiResponse} autoPlay={true} />
          </div>
        </div>

        <div className="flex-1 p-4">
          <InterviewChatPanel
            onAnswerSubmitted={handleAnswerSubmitted}
            isWaitingForAnswer={isWaitingForAnswer}
            aiResponse={aiResponse}
            setAiResponse={setAiResponse}
            cheatingProbabilityList={cheatingProbabilityList}
            onInterviewCompleted={handleInterviewCompleted} // Add this
          />
        </div>

        <InterviewSidebar
          interviewData={interviewData}
          violations={violations}
        />
      </div>

      {/* <ViolationAlertDialog
        isOpen={showViolationDialog}
        onClose={() => setShowViolationDialog(false)}
        violationType={currentViolation.type}
        violationMessage={currentViolation.message}
        warningCount={warningCount}
      /> */}

      {/* Require fullscreen dialog: blocks until user manually enters fullscreen */}
      <RequireFullscreenDialog
        open={!isFullscreen}
        onRequestFullscreen={requestUserFullscreen}
      />

      {/* Face missing dialog: blocks until faceDetected becomes true */}
      <FaceMissingDialog
        open={!faceDetected}
        onRetry={() => {
          /* CandidateVideoPanel will re-run detection; no-op here */
        }}
      />
      <InterviewCompletedDialog
        isOpen={isInterviewCompleted}
        onClose={() => setIsInterviewCompleted(false)}
        onExitInterview={handleEndInterview}
      />
    </div>
  );
};

export default Interview;

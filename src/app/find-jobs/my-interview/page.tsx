"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, AlertTriangle, Clock, X } from "lucide-react";
import CandidateVideoPanel from "@/components/find-jobs/main-panel/interviews/CandidateVideoPanel";
//import AIInterviewerPanel from "@/components/find-jobs/main-panel/interviews/AIInterviewerPanel";
import InterviewChatPanel from "@/components/find-jobs/main-panel/interviews/InterviewChatPanel";
import ViolationAlertDialog from "@/components/find-jobs/main-panel/interviews/ViolationAlertDialog";
import { set } from "date-fns";

const InterviewPage = () => {
  const router = useRouter();
  const [viewFullScreen, setFullScreen] = useState(true);
  const [interviewData, setInterviewData] = useState<any>(null);
  const [warningCount, setWarningCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60);
  const [violations, setViolations] = useState<string[]>([]);
  const [faceDetected, setFaceDetected] = useState(true);
  const [showViolationDialog, setShowViolationDialog] = useState(false);
  const [currentViolation, setCurrentViolation] = useState({
    type: "",
    message: "",
  });
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Force fullscreen mode
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (error) {
        console.error("Failed to enter fullscreen:", error);
      }
    };

    enterFullscreen();

    // Cleanup function
    // return () => {
    //   // This cleanup will run when component unmounts
    //   if (document.exitFullscreen && document.fullscreenElement) {
    //     document.exitFullscreen().catch(console.error);
    //   }
    // };
  }, [viewFullScreen]);

  // Initialize interview data
  useEffect(() => {
    const storedData = sessionStorage.getItem("currentInterview");
    if (storedData) {
      setInterviewData(JSON.parse(storedData));
    } else {
      router.push("/find-jobs");
    }
  }, [router]);

  // Enhanced Security monitoring
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation(
          "Tab Switch",
          "You switched tabs or minimized the window during the interview."
        );
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Comprehensive key blocking
      const prohibitedSingleKeys = ["F11", "F12", "F5"];

      const isCtrlC = e.ctrlKey && e.key === "c";
      const isCtrlV = e.ctrlKey && e.key === "v";
      const isCtrlX = e.ctrlKey && e.key === "x";
      const isCtrlA = e.ctrlKey && e.key === "a";
      const isCtrlS = e.ctrlKey && e.key === "s";
      const isCtrlZ = e.ctrlKey && e.key === "z";
      const isCtrlY = e.ctrlKey && e.key === "y";
      const isCtrlU = e.ctrlKey && e.key === "u";
      const isCtrlShiftI = e.ctrlKey && e.shiftKey && e.key === "I";
      const isCtrlShiftC = e.ctrlKey && e.shiftKey && e.key === "C";
      const isCtrlShiftJ = e.ctrlKey && e.shiftKey && e.key === "J";
      const isAltTab = e.altKey && e.key === "Tab";
      const isCtrlTab = e.ctrlKey && e.key === "Tab";
      const isCtrlW = e.ctrlKey && e.key === "w";
      const isCtrlT = e.ctrlKey && e.key === "t";
      const isCtrlN = e.ctrlKey && e.key === "n";
      const isCtrlR = e.ctrlKey && e.key === "r";
      const isCtrlF = e.ctrlKey && e.key === "f";
      const isCtrlP = e.ctrlKey && e.key === "p";
      const isEscape = e.key === "Escape";

      let violationMessage = "";

      if (prohibitedSingleKeys.includes(e.key)) {
        violationMessage = `Attempted to use ${e.key} key.`;
      } else if (isEscape) {
        violationMessage = "Attempted to exit fullscreen (ESC key).";
      } else if (isCtrlC) {
        violationMessage = "Attempted to copy text (Ctrl+C).";
      } else if (isCtrlV) {
        violationMessage = "Attempted to paste text (Ctrl+V).";
      } else if (isCtrlX) {
        violationMessage = "Attempted to cut text (Ctrl+X).";
      } else if (isCtrlA) {
        violationMessage = "Attempted to select all (Ctrl+A).";
      } else if (isCtrlS) {
        violationMessage = "Attempted to save page (Ctrl+S).";
      } else if (isCtrlZ) {
        violationMessage = "Attempted to undo (Ctrl+Z).";
      } else if (isCtrlY) {
        violationMessage = "Attempted to redo (Ctrl+Y).";
      } else if (isCtrlU) {
        violationMessage = "Attempted to view page source (Ctrl+U).";
      } else if (isCtrlShiftI) {
        violationMessage = "Attempted to open developer tools (Ctrl+Shift+I).";
      } else if (isCtrlShiftC) {
        violationMessage = "Attempted to inspect element (Ctrl+Shift+C).";
      } else if (isCtrlShiftJ) {
        violationMessage = "Attempted to open console (Ctrl+Shift+J).";
      } else if (isAltTab) {
        violationMessage = "Attempted to switch applications (Alt+Tab).";
      } else if (isCtrlTab) {
        violationMessage = "Attempted to switch tabs (Ctrl+Tab).";
      } else if (isCtrlW) {
        violationMessage = "Attempted to close tab (Ctrl+W).";
      } else if (isCtrlT) {
        violationMessage = "Attempted to open new tab (Ctrl+T).";
      } else if (isCtrlN) {
        violationMessage = "Attempted to open new window (Ctrl+N).";
      } else if (isCtrlR) {
        violationMessage = "Attempted to refresh page (Ctrl+R).";
      } else if (isCtrlF) {
        violationMessage = "Attempted to open find dialog (Ctrl+F).";
      } else if (isCtrlP) {
        violationMessage = "Attempted to print page (Ctrl+P).";
      }

      if (violationMessage) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleViolation("Prohibited Shortcut", violationMessage);
        return false;
      }
    };

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      handleViolation(
        "Right Click",
        "Right-click context menu is disabled during the interview."
      );
      return false;
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave the interview?";
      return "Are you sure you want to leave the interview?";
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleViolation(
          "Fullscreen Exit",
          "Attempted to exit fullscreen mode during interview."
        );
        // Try to re-enter fullscreen
        setTimeout(() => {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(console.error);
          }
        }, 1000);
      }
    };

    // Prevent all forms of copying/pasting
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      handleViolation(
        "Copy Attempt",
        "Copying content is not allowed during the interview."
      );
      return false;
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      handleViolation(
        "Paste Attempt",
        "Pasting content is not allowed during the interview."
      );
      return false;
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      handleViolation(
        "Cut Attempt",
        "Cutting content is not allowed during the interview."
      );
      return false;
    };

    // Add all event listeners with capture phase
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("copy", handleCopy, true);
    document.addEventListener("paste", handlePaste, true);
    document.addEventListener("cut", handleCut, true);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Disable F11 specifically for fullscreen toggle
    const handleF11 = (e: KeyboardEvent) => {
      if (e.key === "F11") {
        e.preventDefault();
        handleViolation(
          "F11 Key",
          "F11 fullscreen toggle is disabled during interview."
        );
        return false;
      }
    };

    document.addEventListener("keydown", handleF11, true);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("copy", handleCopy, true);
      document.removeEventListener("paste", handlePaste, true);
      document.removeEventListener("cut", handleCut, true);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleF11, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          endInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Face detection monitoring
  useEffect(() => {
    if (!faceDetected) {
      const timeout = setTimeout(() => {
        if (!faceDetected) {
          handleViolation(
            "No Face Detected",
            "Please ensure your face is visible to the camera."
          );
        }
      }, 10000); // 10 seconds grace period

      return () => clearTimeout(timeout);
    }
  }, [faceDetected]);

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
        await endInterview(); // Use the async endInterview function
      }, 3000);
    }
  };

  const handleFaceDetected = (detected: boolean) => {
    setFaceDetected(detected);
  };

  const handleAnswerSubmitted = (answer: string) => {
    setIsWaitingForAnswer(false);
    setTimeout(() => {
      setCurrentQuestion(
        "Thank you for that answer. Here's your next question..."
      );
      setIsAISpeaking(true);
    }, 1000);
  };

  const endInterview = async () => {
    setFullScreen(false);
    // sessionStorage.removeItem("currentInterview");
    // await document.exitFullscreen();
    router.push("/find-jobs");
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
      className="fixed inset-0 bg-gray-900 select-none z-50 overflow-hidden"
    >
      {/* Security Header */}
      <div className="bg-red-600 p-3">
        <div className="flex items-center justify-between text-white text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>🔒 SECURE INTERVIEW MODE - ALL ACTIONS MONITORED</span>
            </div>

            {warningCount > 0 && (
              <div className="flex items-center gap-2 bg-red-700 px-3 py-1 rounded animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                <span>⚠️ VIOLATIONS: {warningCount}/5</span>
              </div>
            )}

            {!faceDetected && (
              <div className="flex items-center gap-2 bg-yellow-600 px-3 py-1 rounded animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                <span>👤 FACE NOT DETECTED</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>⏱️ {formatTime(timeRemaining)}</span>
            </div>
            <button
              onClick={endInterview}
              className="flex items-center gap-2 bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-sm font-medium"
            >
              <X className="w-4 h-4" />
              END INTERVIEW
            </button>
          </div>
        </div>
      </div>

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

        <div className="w-80 bg-gray-800 p-4 text-white overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Interview Details</h3>
              <div className="space-y-1 text-sm text-gray-300">
                <p>
                  <strong>Position:</strong> {interviewData.jobTitle}
                </p>
                <p>
                  <strong>Company:</strong> {interviewData.companyName}
                </p>
                <p>
                  <strong>Mode:</strong> {interviewData.interviewMode}
                </p>
                {interviewData.interviewerName && (
                  <p>
                    <strong>Interviewer:</strong>{" "}
                    {interviewData.interviewerName}
                  </p>
                )}
              </div>
            </div>

            {violations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-red-400">
                  🚨 Security Violations
                </h3>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {violations.map((violation, index) => (
                    <div
                      key={index}
                      className="text-xs text-red-300 bg-red-900/30 p-2 rounded border-l-2 border-red-500"
                    >
                      {violation}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-blue-800/50 p-3 rounded-lg">
              <h4 className="font-semibold mb-2">📋 Guidelines</h4>
              <ul className="text-sm space-y-1 text-blue-200">
                <li>• Stay in fullscreen mode</li>
                <li>• Keep face visible to camera</li>
                <li>• Do not use keyboard shortcuts</li>
                <li>• Answer questions honestly</li>
                <li>• Maintain professional conduct</li>
              </ul>
            </div>

            <div className="bg-red-800/50 p-3 rounded-lg">
              <h4 className="font-semibold mb-2 text-red-300">🚫 Prohibited</h4>
              <ul className="text-sm space-y-1 text-red-200">
                <li>• Copy/Paste (Ctrl+C/V)</li>
                <li>• Right-clicking</li>
                <li>• Tab switching</li>
                <li>• Developer tools</li>
                <li>• Screen recording</li>
                <li>• External applications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Violation Alert Dialog */}
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

export default InterviewPage;

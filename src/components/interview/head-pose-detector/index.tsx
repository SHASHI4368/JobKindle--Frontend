/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
// src/components/new-interview/index.tsx
"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { predictNewCheating } from "./utils/cheatDetector";
import { useModels } from "./hooks/useModels";
import { useWebcam } from "./hooks/useWebcam";
import CameraRequiredDialog from "./components/CameraRequiredDialog";
import { calculatePoseFromFace, hasPoseChanged } from "./utils/poseCalculation";
import {
  exportPoseToCSV,
  exportCheatingProbabilitiesToCSV,
} from "./utils/exportUtils";
import { VideoCanvas } from "./components/VideoCanvas";
import { AlertsPanel } from "./components/AlertsPanel";
import { HeadOrientationPanel } from "./components/HeadOrientationPanel";
import { DetectionStatsPanel } from "./components/DetectionStatsPanel";
import { ExportControls } from "./components/ExportControls";
import type {
  HeadPose,
  Detection,
  ViolationAlert,
  CheatingProbability,
} from "./types";

type HeadPoseDetectorProps = {
  handleViolationsUpdate?: (type: string, message: string) => void;
  cheatingProbabilityList: CheatingProbability[];
  setCheatingProbabilityList: React.Dispatch<
    React.SetStateAction<CheatingProbability[]>
  >;
  handleFaceDetected?: (faceCount: number) => void;
};

// Helper function to normalize violation messages by removing content in parentheses
const normalizeViolationMessage = (message: string): string => {
  return message.replace(/\s*\([^)]*\)/g, "").trim();
};

const HeadPoseDetector: React.FC<HeadPoseDetectorProps> = ({
  handleViolationsUpdate,
  cheatingProbabilityList,
  setCheatingProbabilityList,
  handleFaceDetected,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());
  const frameCountRef = useRef<number>(0);
  const lastPoseRef = useRef<HeadPose | null>(null);

  // Performance optimization: throttle cheating detection
  const lastCheatingCheckRef = useRef<number>(0);
  const CHEATING_CHECK_INTERVAL = 500;

  // Track active violations by their normalized key
  const activeViolationsRef = useRef<
    Map<string, { type: string; originalMessage: string }>
  >(new Map());

  // Store callbacks in refs to avoid dependency changes
  const handleViolationsUpdateRef = useRef(handleViolationsUpdate);
  const handleFaceDetectedRef = useRef(handleFaceDetected);

  useEffect(() => {
    handleViolationsUpdateRef.current = handleViolationsUpdate;
    handleFaceDetectedRef.current = handleFaceDetected;
  }, [handleViolationsUpdate, handleFaceDetected]);

  const { faceModel, objectModel, isLoading, error: modelError } = useModels();
  const [error, setError] = useState<string>("");
  const { videoRef, cameraDetected } = useWebcam(setError); // Updated

  const [headPose, setHeadPose] = useState<HeadPose | null>(null);
  const [poseHistory, setPoseHistory] = useState<HeadPose[]>([]);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [violations, setViolations] = useState<ViolationAlert[]>([]);
  const [fps, setFps] = useState(0);
  const [faceCount, setFaceCount] = useState(0);
  const [cheatingProbability, setCheatingProbability] = useState<number>(0);

  const checkCheating = useCallback(
    async (roll: number, pitch: number, yaw: number) => {
      const now = Date.now();
      if (now - lastCheatingCheckRef.current < CHEATING_CHECK_INTERVAL) {
        return;
      }
      lastCheatingCheckRef.current = now;

      try {
        const probability = await predictNewCheating(roll, pitch, yaw);
        setCheatingProbability(Number(probability));

        setCheatingProbabilityList((prev) => {
          const newList = [
            ...prev,
            { probability: Number(probability), timestamp: Date.now() },
          ];
          return newList.slice(-1000);
        });
      } catch (err) {
        console.error("Cheating detection error:", err);
      }
    },
    [setCheatingProbabilityList]
  );

  const getResolutionMessage = useCallback(
    (type: string, originalMessage: string): string => {
      if (type === "multiple_faces") {
        return `Additional face(s) no longer detected`;
      } else if (type === "no_face") {
        return "Face detected";
      } else if (type === "phone") {
        return "Phone no longer detected";
      } else if (type === "suspicious_object") {
        const objectMatch = originalMessage.match(/^(.+?) detected/);
        const objectName = objectMatch ? objectMatch[1] : "Object";
        return `${objectName} no longer detected`;
      }
      return "Violation cleared";
    },
    []
  );

  const addViolation = useCallback(
    (type: ViolationAlert["type"], message: string) => {
      // Normalize the message by removing parentheses content for comparison
      const normalizedMessage = normalizeViolationMessage(message);
      const violationKey = `${type}:${normalizedMessage}`;

      // Only log if this violation is not already active
      if (!activeViolationsRef.current.has(violationKey)) {
        activeViolationsRef.current.set(violationKey, {
          type,
          originalMessage: message,
        });

        setViolations((prev) => {
          return [...prev.slice(-9), { type, message, timestamp: Date.now() }];
        });

        if (handleViolationsUpdateRef.current) {
          handleViolationsUpdateRef.current(type, message);
        }
      }
    },
    []
  );

  const clearResolvedViolations = useCallback(
    (currentViolations: Set<string>) => {
      // Check which violations are no longer present
      const activeKeys = Array.from(activeViolationsRef.current.keys());

      for (const violationKey of activeKeys) {
        if (!currentViolations.has(violationKey)) {
          const violationDetails =
            activeViolationsRef.current.get(violationKey);
          if (violationDetails) {
            const resolutionMessage = getResolutionMessage(
              violationDetails.type,
              violationDetails.originalMessage
            );

            setViolations((prev) => {
              return [
                ...prev.slice(-9),
                {
                  type: `${violationDetails.type}_resolved` as ViolationAlert["type"],
                  message: resolutionMessage,
                  timestamp: Date.now(),
                },
              ];
            });

            if (handleViolationsUpdateRef.current) {
              handleViolationsUpdateRef.current(
                `${violationDetails.type}_resolved`,
                resolutionMessage
              );
            }

            activeViolationsRef.current.delete(violationKey);
          }
        }
      }
    },
    [getResolutionMessage]
  );

  const predictPose = useCallback(async () => {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      !faceModel ||
      !objectModel ||
      isLoading
    ) {
      animationRef.current = requestAnimationFrame(predictPose);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx || video.readyState !== 4) {
      animationRef.current = requestAnimationFrame(predictPose);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Track violations detected in this frame
    const currentFrameViolations = new Set<string>();

    try {
      const [facePredictions, objectPredictions] = await Promise.all([
        faceModel.estimateFaces(video, false),
        objectModel.detect(video),
      ]);

      if (handleFaceDetectedRef.current) {
        handleFaceDetectedRef.current(facePredictions.length);
      }

      // Process faces
      setFaceCount(facePredictions.length);

      if (facePredictions.length === 0) {
        // No face detected
        const message = "No face detected";
        const normalizedMessage = normalizeViolationMessage(message);
        const violationKey = `no_face:${normalizedMessage}`;
        currentFrameViolations.add(violationKey);
        addViolation("no_face", message);
      } else if (facePredictions.length > 1) {
        // Multiple faces detected
        const message = `${facePredictions.length} faces detected`;
        const normalizedMessage = normalizeViolationMessage(message);
        const violationKey = `multiple_faces:${normalizedMessage}`;
        currentFrameViolations.add(violationKey);
        addViolation("multiple_faces", message);
      }

      // Process objects
      const suspiciousObjects: Detection[] = [];
      const phoneClasses = [
        "cell phone",
        "phone",
        "mobile phone",
        "laptop",
        "book",
      ];

      objectPredictions.forEach((pred: any) => {
        const detection: Detection = {
          class: pred.class,
          score: pred.score,
          bbox: pred.bbox as [number, number, number, number],
        };

        if (
          phoneClasses.some((cls) => pred.class.toLowerCase().includes(cls))
        ) {
          suspiciousObjects.push(detection);

          if (pred.class.toLowerCase().includes("phone")) {
            const message = `Phone detected (${(pred.score * 100).toFixed(
              0
            )}% confidence)`;
            const normalizedMessage = normalizeViolationMessage(message);
            const violationKey = `phone:${normalizedMessage}`;
            currentFrameViolations.add(violationKey);
            addViolation("phone", message);
          } else {
            const message = `${pred.class} detected`;
            const normalizedMessage = normalizeViolationMessage(message);
            const violationKey = `suspicious_object:${normalizedMessage}`;
            currentFrameViolations.add(violationKey);
            addViolation("suspicious_object", message);
          }
        }

        // Draw detection boxes
        const [x, y, width, height] = pred.bbox;
        const isPhone = pred.class.toLowerCase().includes("phone");

        ctx.strokeStyle = isPhone ? "#ff0000" : "#ffa500";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = isPhone
          ? "rgba(255, 0, 0, 0.7)"
          : "rgba(255, 165, 0, 0.7)";
        ctx.fillRect(x, y - 25, width, 25);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px Arial";
        ctx.fillText(
          `${pred.class} ${(pred.score * 100).toFixed(0)}%`,
          x + 5,
          y - 8
        );
      });

      setDetections(suspiciousObjects);

      // Draw faces and calculate pose
      if (facePredictions.length > 0) {
        const face = facePredictions[0];
        const box = face.topLeft as number[];
        const bottomRight = face.bottomRight as number[];

        // Draw face box
        ctx.strokeStyle = facePredictions.length > 1 ? "#ff9900" : "#00ff00";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          box[0],
          box[1],
          bottomRight[0] - box[0],
          bottomRight[1] - box[1]
        );

        const keypoints = face.landmarks as number[][];

        keypoints.forEach((point) => {
          ctx.fillStyle = "#00ff00";
          ctx.beginPath();
          ctx.arc(point[0], point[1], 3, 0, 2 * Math.PI);
          ctx.fill();
        });

        // Calculate and display pose
        const pose = calculatePoseFromFace(face, canvas.width, canvas.height);
        setHeadPose(pose);

        // Throttled cheating detection
        checkCheating(pose.roll, pose.pitch, pose.yaw);

        if (hasPoseChanged(pose, lastPoseRef.current)) {
          setPoseHistory((prev) => {
            const newHistory = [...prev, pose];
            return newHistory.slice(-500);
          });
          lastPoseRef.current = pose;
        }

        // Draw pose overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(10, 10, 200, 90);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px Arial";
        ctx.fillText(`Roll:  ${pose.roll.toFixed(1)}°`, 20, 35);
        ctx.fillText(`Pitch: ${pose.pitch.toFixed(1)}°`, 20, 55);
        ctx.fillText(`Yaw:   ${pose.yaw.toFixed(1)}°`, 20, 75);
      } else {
        setHeadPose(null);
      }

      // Check for resolved violations
      clearResolvedViolations(currentFrameViolations);

      // Calculate FPS
      frameCountRef.current++;
      const currentTime = Date.now();
      if (currentTime - lastTimeRef.current >= 1000) {
        setFps(frameCountRef.current);
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }
    } catch (err) {
      console.error("Prediction error:", err);
    }

    animationRef.current = requestAnimationFrame(predictPose);
  }, [
    videoRef,
    faceModel,
    objectModel,
    isLoading,
    addViolation,
    checkCheating,
    clearResolvedViolations,
  ]);

  useEffect(() => {
    if (faceModel && objectModel && !isLoading) {
      predictPose();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [faceModel, objectModel, isLoading, predictPose]);

  const handleClearHistory = () => {
    setPoseHistory([]);
    setCheatingProbabilityList([]);
    setViolations([]);
    lastPoseRef.current = null;
    activeViolationsRef.current.clear();
  };

  const combinedError = error || modelError;

  return (
    <div className="h-full flex flec-col gap-4 bg-linear-to-br w-full from-gray-900 via-blue-900 to-gray-900 text-white p-8">
      <VideoCanvas
        videoRef={videoRef}
        canvasRef={canvasRef}
        fps={fps}
        faceCount={faceCount}
        detectionsCount={detections.length}
        poseHistoryLength={poseHistory.length}
        cheatingProbability={cheatingProbability}
      />

      {/* Camera Required Dialog */}
      <CameraRequiredDialog open={!cameraDetected} />
    </div>
  );
};

export default HeadPoseDetector;

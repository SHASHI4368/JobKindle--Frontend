"use client";

import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Mic, MicOff, Monitor } from "lucide-react";

interface CandidateVideoPanelProps {
  onFaceDetected: (detected: boolean) => void;
}

const CandidateVideoPanel: React.FC<CandidateVideoPanelProps> = ({
  onFaceDetected,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);

      // Simple face detection simulation (in real implementation, use face-api.js or similar)
      const faceDetectionInterval = setInterval(() => {
        const detected = Math.random() > 0.3; // Simulate face detection
        setFaceDetected(detected);
        onFaceDetected(detected);
      }, 2000);

      return () => clearInterval(faceDetectionInterval);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      {/* Video Display */}
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Face Detection Indicator */}
        <div className="absolute top-3 right-3">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
              faceDetected
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                faceDetected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {faceDetected ? "Face Detected" : "No Face Detected"}
          </div>
        </div>

        {/* Candidate Name */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            You
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleCamera}
            className={`p-3 rounded-full transition-colors duration-200 ${
              isCameraOn
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isCameraOn ? (
              <Camera className="w-5 h-5" />
            ) : (
              <CameraOff className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={toggleMic}
            className={`p-3 rounded-full transition-colors duration-200 ${
              isMicOn
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isMicOn ? (
              <Mic className="w-5 h-5" />
            ) : (
              <MicOff className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateVideoPanel;

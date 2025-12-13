/* eslint-disable react-hooks/exhaustive-deps */
// src/components/new-interview/hooks/useWebcam.ts
import { useEffect, useRef, useState } from "react";

export function useWebcam(onError: (error: string) => void) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraDetected, setCameraDetected] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const setupWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setCameraDetected(true);
          };
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setCameraDetected(false);
        onError("Failed to access webcam. Please grant camera permissions.");

        // Retry after 3 seconds
        if (!isRetrying) {
          setIsRetrying(true);
          setTimeout(() => {
            setIsRetrying(false);
            setupWebcam();
          }, 3000);
        }
      }
    };

    setupWebcam();

    // Listen for device changes (camera connected/disconnected)
    const handleDeviceChange = () => {
      if (!cameraDetected) {
        setupWebcam();
      }
    };

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange
      );
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [onError]);

  return { videoRef, cameraDetected };
}

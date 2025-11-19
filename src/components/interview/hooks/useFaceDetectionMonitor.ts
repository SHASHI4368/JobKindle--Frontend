import { useEffect, useRef } from "react";

type UseFaceDetectionMonitorProps = {
  faceDetected: boolean;
  handleViolation: (type: string, message: string) => void;
  onFaceMissing?: () => void;
  onFaceRecovered?: () => void;
  graceMs?: number;
};

export const useFaceDetectionMonitor = ({
  faceDetected,
  handleViolation,
  onFaceMissing,
  onFaceRecovered,
  graceMs = 5000, // shorter grace by default
}: UseFaceDetectionMonitorProps) => {
  const missingTimeout = useRef<number | null>(null);
  const prev = useRef<boolean | null>(null);

  useEffect(() => {
    // first run: set prev
    if (prev.current === null) {
      prev.current = faceDetected;
      if (!faceDetected) {
        // schedule missing handling on initial false
        missingTimeout.current = window.setTimeout(() => {
          onFaceMissing?.();
          handleViolation(
            "No Face Detected",
            "Please ensure your face is visible to the camera."
          );
        }, graceMs);
      }
      return;
    }

    // transitioned to missing
    if (prev.current === true && faceDetected === false) {
      // start grace timer
      if (missingTimeout.current) {
        clearTimeout(missingTimeout.current);
      }
      missingTimeout.current = window.setTimeout(() => {
        onFaceMissing?.();
        handleViolation(
          "No Face Detected",
          "Please ensure your face is visible to the camera."
        );
      }, graceMs);
    }

    // recovered
    if (prev.current === false && faceDetected === true) {
      if (missingTimeout.current) {
        clearTimeout(missingTimeout.current);
        missingTimeout.current = null;
      }
      onFaceRecovered?.();
    }

    prev.current = faceDetected;

    return () => {
      if (missingTimeout.current) {
        clearTimeout(missingTimeout.current);
        missingTimeout.current = null;
      }
    };
  }, [faceDetected, handleViolation, onFaceMissing, onFaceRecovered, graceMs]);
};

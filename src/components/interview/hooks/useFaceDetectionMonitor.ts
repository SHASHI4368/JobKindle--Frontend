import { useEffect } from "react";

type UseFaceDetectionMonitorProps = {
  faceDetected: boolean;
  handleViolation: (type: string, message: string) => void;
};

export const useFaceDetectionMonitor = ({
  faceDetected,
  handleViolation,
}: UseFaceDetectionMonitorProps) => {
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
  }, [faceDetected, handleViolation]);
};

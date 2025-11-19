"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  onFaceDetected: (detected: boolean) => void;
};

const CandidateVideoPanel: React.FC<Props> = ({ onFaceDetected }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraAvailable, setCameraAvailable] = useState<boolean | null>(null);
  const retryTimer = useRef<number | null>(null);

  const stopCurrentStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => {
        try {
          t.onended = null;
          t.stop();
        } catch (e) {}
      });
      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    stopCurrentStream();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      // set stream
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // try to play; ignore errors
        await videoRef.current.play().catch(() => {});
      }

      setCameraAvailable(true);
      onFaceDetected(true);

      // detect track end (user disabled camera)
      stream.getVideoTracks().forEach((track) => {
        track.onended = () => {
          setCameraAvailable(false);
          onFaceDetected(false);
        };
      });
    } catch (err) {
      // getUserMedia failed (no device or permission denied)
      console.warn("Camera init failed:", err);
      setCameraAvailable(false);
      onFaceDetected(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const attemptStart = async () => {
      // try start once immediately
      await startCamera();

      // if failed, keep small retry window while component mounted (covers permission popups / user enabling)
      if (mounted && cameraAvailable === false) {
        // try a few retries spaced out
        if (retryTimer.current) {
          clearTimeout(retryTimer.current);
        }
        retryTimer.current = window.setTimeout(async () => {
          await startCamera();
        }, 1500);
      }
    };

    attemptStart();

    const onDevicesChange = async () => {
      // device list changed (camera plugged/unplugged or permission changes). Check if video input exists then attempt start.
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasVideoInput = devices.some((d) => d.kind === "videoinput");
        // if there is a video input and we currently have no active stream, try to (re)start
        if (
          hasVideoInput &&
          (!streamRef.current ||
            streamRef.current.getVideoTracks().length === 0)
        ) {
          // short delay to allow OS to finish enabling device
          setTimeout(() => startCamera(), 400);
        } else if (!hasVideoInput) {
          // no device available
          stopCurrentStream();
          setCameraAvailable(false);
          onFaceDetected(false);
        }
      } catch (e) {
        console.warn("Error handling devicechange:", e);
      }
    };

    navigator.mediaDevices?.addEventListener?.("devicechange", onDevicesChange);
    // some browsers might expose ondevicechange directly
    if (
      navigator.mediaDevices &&
      (navigator.mediaDevices as any).ondevicechange === undefined
    ) {
      // addEventListener already used above; otherwise attach fallback
      try {
        (navigator.mediaDevices as any).ondevicechange = onDevicesChange;
      } catch {}
    }

    return () => {
      mounted = false;
      if (retryTimer.current) {
        clearTimeout(retryTimer.current);
        retryTimer.current = null;
      }
      navigator.mediaDevices?.removeEventListener?.(
        "devicechange",
        onDevicesChange
      );
      try {
        (navigator.mediaDevices as any).ondevicechange = null;
      } catch {}
      stopCurrentStream();
      if (videoRef.current) {
        try {
          videoRef.current.srcObject = null;
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full bg-black flex items-center justify-center relative">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-md"
        playsInline
        muted
        autoPlay
      />
      {cameraAvailable === false && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/60 text-white px-4 py-2 rounded">
            Camera not available — please enable camera and grant permissions
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateVideoPanel;

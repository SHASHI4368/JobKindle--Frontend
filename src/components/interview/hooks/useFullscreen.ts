import { useEffect, useRef } from "react";

type UseFullscreenProps = {
  enabled: boolean;
  onFullscreenExit?: () => void;
};

export const useFullscreen = ({
  enabled,
  onFullscreenExit,
}: UseFullscreenProps) => {
  const isExitingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const enterFullscreen = async () => {
      try {
        if (
          !document.fullscreenElement &&
          document.documentElement.requestFullscreen
        ) {
          await document.documentElement.requestFullscreen();
        }
      } catch (error) {
        console.error("Failed to enter fullscreen:", error);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !isExitingRef.current) {
        // User exited fullscreen
        if (onFullscreenExit) {
          onFullscreenExit();
        }

        // Re-enter fullscreen after a short delay
        setTimeout(() => {
          enterFullscreen();
        }, 100);
      }
    };

    // Initial fullscreen entry
    enterFullscreen();

    // Listen for fullscreen changes
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [enabled, onFullscreenExit]);

  const exitFullscreen = async () => {
    isExitingRef.current = true;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Failed to exit fullscreen:", error);
    }
  };

  return { exitFullscreen };
};

import { useEffect } from "react";

type UseSecurityMonitorProps = {
  handleViolation: (type: string, message: string) => void;
};

export const useSecurityMonitor = ({
  handleViolation,
}: UseSecurityMonitorProps) => {
  useEffect(() => {
    // const handleVisibilityChange = () => {
    //   if (document.hidden) {
    //     handleViolation(
    //       "Tab Switch",
    //       "You switched tabs or minimized the window during the interview."
    //     );
    //   }
    // };

    const handleKeyDown = (e: KeyboardEvent) => {
      // const prohibitedSingleKeys = ["F11", "F12", "F5"];
      const prohibitedSingleKeys = [ "F12", "F5"];

      const keyChecks = {
        // "Ctrl+C": e.ctrlKey && e.key === "c",
        // "Ctrl+V": e.ctrlKey && e.key === "v",
        "Ctrl+X": e.ctrlKey && e.key === "x",
        "Ctrl+A": e.ctrlKey && e.key === "a",
        "Ctrl+S": e.ctrlKey && e.key === "s",
        "Ctrl+Z": e.ctrlKey && e.key === "z",
        "Ctrl+Y": e.ctrlKey && e.key === "y",
        "Ctrl+U": e.ctrlKey && e.key === "u",
        "Ctrl+Shift+I": e.ctrlKey && e.shiftKey && e.key === "I",
        "Ctrl+Shift+C": e.ctrlKey && e.shiftKey && e.key === "C",
        "Ctrl+Shift+J": e.ctrlKey && e.shiftKey && e.key === "J",
        "Alt+Tab": e.altKey && e.key === "Tab",
        "Ctrl+Tab": e.ctrlKey && e.key === "Tab",
        "Ctrl+W": e.ctrlKey && e.key === "w",
        "Ctrl+T": e.ctrlKey && e.key === "t",
        "Ctrl+N": e.ctrlKey && e.key === "n",
        "Ctrl+R": e.ctrlKey && e.key === "r",
        "Ctrl+F": e.ctrlKey && e.key === "f",
        "Ctrl+P": e.ctrlKey && e.key === "p",
        Escape: e.key === "Escape",
      };

      const violationMessages: Record<string, string> = {
        // "Ctrl+C": "Attempted to copy text (Ctrl+C).",
        // "Ctrl+V": "Attempted to paste text (Ctrl+V).",
        "Ctrl+X": "Attempted to cut text (Ctrl+X).",
        "Ctrl+A": "Attempted to select all (Ctrl+A).",
        "Ctrl+S": "Attempted to save page (Ctrl+S).",
        "Ctrl+Z": "Attempted to undo (Ctrl+Z).",
        "Ctrl+Y": "Attempted to redo (Ctrl+Y).",
        "Ctrl+U": "Attempted to view page source (Ctrl+U).",
        "Ctrl+Shift+I": "Attempted to open developer tools (Ctrl+Shift+I).",
        "Ctrl+Shift+C": "Attempted to inspect element (Ctrl+Shift+C).",
        "Ctrl+Shift+J": "Attempted to open console (Ctrl+Shift+J).",
        "Alt+Tab": "Attempted to switch applications (Alt+Tab).",
        "Ctrl+Tab": "Attempted to switch tabs (Ctrl+Tab).",
        "Ctrl+W": "Attempted to close tab (Ctrl+W).",
        "Ctrl+T": "Attempted to open new tab (Ctrl+T).",
        "Ctrl+N": "Attempted to open new window (Ctrl+N).",
        "Ctrl+R": "Attempted to refresh page (Ctrl+R).",
        "Ctrl+F": "Attempted to open find dialog (Ctrl+F).",
        "Ctrl+P": "Attempted to print page (Ctrl+P).",
        Escape: "Attempted to exit fullscreen (ESC key).",
      };

      let violationMessage = "";

      if (prohibitedSingleKeys.includes(e.key)) {
        violationMessage = `Attempted to use ${e.key} key.`;
      } else {
        for (const [key, check] of Object.entries(keyChecks)) {
          if (check) {
            violationMessage = violationMessages[key];
            break;
          }
        }
      }

      if (violationMessage) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleViolation("Prohibited Shortcut", violationMessage);
        return false;
      }
    };

    // const handleContextMenu = (e: Event) => {
    //   e.preventDefault();
    //   handleViolation(
    //     "Right Click",
    //     "Right-click context menu is disabled during the interview."
    //   );
    //   return false;
    // };

    // const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    //   e.preventDefault();
    //   e.returnValue = "Are you sure you want to leave the interview?";
    //   return "Are you sure you want to leave the interview?";
    // };

    // const handleCopy = (e: ClipboardEvent) => {
    //   e.preventDefault();
    //   handleViolation(
    //     "Copy Attempt",
    //     "Copying content is not allowed during the interview."
    //   );
    //   return false;
    // };

    // const handlePaste = (e: ClipboardEvent) => {
    //   e.preventDefault();
    //   handleViolation(
    //     "Paste Attempt",
    //     "Pasting content is not allowed during the interview."
    //   );
    //   return false;
    // };

    // const handleCut = (e: ClipboardEvent) => {
    //   e.preventDefault();
    //   handleViolation(
    //     "Cut Attempt",
    //     "Cutting content is not allowed during the interview."
    //   );
    //   return false;
    // };

    // document.addEventListener("visibilitychange", handleVisibilityChange);
    // document.addEventListener("keydown", handleKeyDown, true);
    // document.addEventListener("contextmenu", handleContextMenu, true);
    // document.addEventListener("copy", handleCopy, true);
    // document.addEventListener("paste", handlePaste, true);
    // document.addEventListener("cut", handleCut, true);
    // window.addEventListener("beforeunload", handleBeforeUnload);

    // return () => {
    //   document.removeEventListener("visibilitychange", handleVisibilityChange);
    //   document.removeEventListener("keydown", handleKeyDown, true);
    //   document.removeEventListener("contextmenu", handleContextMenu, true);
    //   document.removeEventListener("copy", handleCopy, true);
    //   document.removeEventListener("paste", handlePaste, true);
    //   document.removeEventListener("cut", handleCut, true);
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, [handleViolation]);
};

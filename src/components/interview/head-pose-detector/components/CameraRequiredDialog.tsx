import React from "react";
import { Camera, AlertCircle } from "lucide-react";

interface CameraRequiredDialogProps {
  open: boolean;
}

const CameraRequiredDialog: React.FC<CameraRequiredDialogProps> = ({
  open,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border-2 border-red-500 rounded-lg shadow-2xl max-w-md w-full mx-4 p-8 animate-pulse">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-red-500/10 p-6 rounded-full border-2 border-red-500">
              <Camera className="w-16 h-16 text-red-500" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-500" />
              Camera Not Detected
            </h2>
            <p className="text-gray-300 text-sm">
              This interview requires camera access to continue
            </p>
          </div>

          {/* Message */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 w-full">
            <p className="text-white text-sm leading-relaxed">
              Please turn on your camera and grant permission to access it. The
              interview cannot proceed without video monitoring.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 w-full text-left">
            <p className="text-xs text-gray-400 font-semibold mb-2">
              Troubleshooting:
            </p>
            <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
              <li>Check if your camera is connected</li>
              <li>Grant camera permissions when prompted</li>
              <li>Close other applications using the camera</li>
              <li>Refresh the page if the issue persists</li>
            </ul>
          </div>

          {/* Loading indicator */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Waiting for camera...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraRequiredDialog;

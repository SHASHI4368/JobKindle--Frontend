import React from "react";

const InterviewGuidelines = () => {
  return (
    <>
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
    </>
  );
};

export default InterviewGuidelines;

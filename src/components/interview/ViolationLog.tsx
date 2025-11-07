import React from "react";

type ViolationLogProps = {
  violations: string[];
};

const ViolationLog = ({ violations }: ViolationLogProps) => {
  if (violations.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-red-400">
        🚨 Security Violations
      </h3>
      <div className="max-h-60 overflow-y-auto space-y-1">
        {violations.map((violation, index) => (
          <div
            key={index}
            className="text-xs text-red-300 bg-red-900/30 p-2 rounded border-l-2 border-red-500"
          >
            {violation}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViolationLog;

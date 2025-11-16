import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  loading: boolean;
  applicantsCount: number;
  onClose: () => void;
  onAnalyze: () => Promise<void>;
  hasResults: boolean;
};

const AnalyzeActions: React.FC<Props> = ({
  loading,
  applicantsCount,
  onClose,
  onAnalyze,
  hasResults,
}) => {
  return (
    <div className="flex gap-3 justify-end">
      <Button variant="outline" onClick={onClose} disabled={loading}>
        Close
      </Button>

      <Button
        onClick={onAnalyze}
        disabled={loading || applicantsCount === 0}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loading
          ? "Analyzing…"
          : hasResults
          ? "Re-run Analysis"
          : "Analyze CVs"}
      </Button>
    </div>
  );
};

export default AnalyzeActions;

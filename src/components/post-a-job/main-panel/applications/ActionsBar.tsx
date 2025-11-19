import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Application } from "@/types/application";
import CVAnalyzeDialog from "./cv-analyze-dialog";

type ActionsBarProps = {
  selectedCount: number;
  totalCount: number;
  onSendEmail: () => void;
  applicants: Application[]; // added: pass applicants list
  fetchApplications: () => void; // added: function to fetch applications
};

const ActionsBar = ({
  selectedCount,
  totalCount,
  onSendEmail,
  applicants,
  fetchApplications,
}: ActionsBarProps) => {
  const [openAnalyze, setOpenAnalyze] = useState(false);

  return (
    <div className="flex py-[20px] items-center justify-between">
      <div className="text-sm text-gray-600">
        <span className="font-semibold">{selectedCount}</span> of {totalCount}{" "}
        selected
      </div>

      <div className="flex gap-3">
        <Button onClick={() => setOpenAnalyze(true)} className="gap-2">
          Analyze CVs
        </Button>

        <Button onClick={onSendEmail} className="gap-2">
          <Send className="w-4 h-4" />
          Send Email to Selected
        </Button>
      </div>

      <CVAnalyzeDialog
        open={openAnalyze}
        onOpenChange={setOpenAnalyze}
        applicants={applicants}
        fetchApplications={fetchApplications}
      />
    </div>
  );
};

export default ActionsBar;

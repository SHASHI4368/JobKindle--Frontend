import React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type ActionsBarProps = {
  selectedCount: number;
  totalCount: number;
  onSendEmail: () => void;
};

const ActionsBar = ({
  selectedCount,
  totalCount,
  onSendEmail,
}: ActionsBarProps) => {
  return (
    <div className="flex py-[20px] items-center justify-between">
      <div className="text-sm text-gray-600">
        <span className="font-semibold">{selectedCount}</span> of {totalCount}{" "}
        selected
      </div>
      <Button
        onClick={onSendEmail}
        className="gap-2"
      >
        <Send className="w-4 h-4" />
        Send Email to Selected
      </Button>
    </div>
  );
};

export default ActionsBar;

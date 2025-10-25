import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import JobPostPreviewMain from "./main";

import React from "react";
import { JobPostPreviewMainProps } from "./types";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const JobPostPreviewDialog = ({ jobData }: JobPostPreviewMainProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="cursor-pointer">
          {/* You can add an icon here if needed */}
          <Eye className="text-primary" />
          <span className="text-[14px] text-primary font-semibold">
            Preview
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto max-h-[80vh]" style={{ width: "80vw", maxWidth: "900px" }}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <JobPostPreviewMain jobData={jobData} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default JobPostPreviewDialog;

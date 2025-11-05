"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUser, Hash } from "lucide-react";
import { ViewPostData } from "@/types/jobPosts";
import JobDetailsCard from "./JobDetailsCard";
import ApplicationsTable from "./ApplicationsTable";
import SendEmailDialog from "./SendEmailDialog";
import ActionsBar from "./ActionsBar";

type ViewApplicationsDialogProps = {
  jobData: ViewPostData;
};

// Dummy data for applications
const dummyApplications = [
  {
    id: 1,
    email: "john.doe@example.com",
    fullName: "John Doe",
    status: "pending",
    resumeScore: 85,
    interviewScore: null,
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    fullName: "Jane Smith",
    status: "interview_sent",
    resumeScore: 92,
    interviewScore: 88,
  },
  {
    id: 3,
    email: "mike.johnson@example.com",
    fullName: "Mike Johnson",
    status: "selected",
    resumeScore: 88,
    interviewScore: 95,
  },
  {
    id: 4,
    email: "sarah.williams@example.com",
    fullName: "Sarah Williams",
    status: "pending",
    resumeScore: 78,
    interviewScore: null,
  },
  {
    id: 5,
    email: "david.brown@example.com",
    fullName: "David Brown",
    status: "interview_sent",
    resumeScore: 90,
    interviewScore: 82,
  },
];

const ViewApplicationsDialog = ({ jobData }: ViewApplicationsDialogProps) => {
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const { basicInformation } = jobData.jobData;

  const toggleCandidate = (id: number) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedCandidates.length === dummyApplications.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(dummyApplications.map((app) => app.id));
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="cursor-pointer transition-all duration-150 w-full sm:w-auto mt-4 sm:mt-0"
            title="View Job Applications"
          >
            <FileUser className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] font-geist-sans min-w-[95vw] w-[80vw] max-h-[90vh] min-h-[50vh] overflow-auto flex flex-col beautiful-scrollbar">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold flex flex-row gap-4 items-center  ">
              <p className="">Job Applications</p>

            </DialogTitle>
            <DialogDescription className="text-base">
              Manage and review applications for this position
            </DialogDescription>
          </DialogHeader>

          <JobDetailsCard jobData={jobData} />

          <ActionsBar
            selectedCount={selectedCandidates.length}
            totalCount={dummyApplications.length}
            onSendEmail={() => setEmailDialogOpen(true)}
          />

          <ApplicationsTable
            applications={dummyApplications}
            selectedCandidates={selectedCandidates}
            onToggleCandidate={toggleCandidate}
            onToggleAll={toggleAll}
          />
        </DialogContent>
      </Dialog>

      <SendEmailDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        selectedCount={selectedCandidates.length}
      />
    </>
  );
};

export default ViewApplicationsDialog;

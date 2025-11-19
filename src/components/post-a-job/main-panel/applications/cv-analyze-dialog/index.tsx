import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ApplicantRow from "./ApplicantRow";
import ResultsList from "./ResultsList";
import AnalyzeActions from "./AnalyzeActions";
import type { CVScore } from "./cvTypes";
import { Application, ApplicationResponse } from "@/types/application";
import { DialogDescription } from "@radix-ui/react-dialog";
import { triggerCVPipeline } from "@/actions/applicationActions";
import Cookies from "js-cookie";

type CVAnalyzeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicants: Application[];
  fetchApplications: () => void;
};

const CVAnalyzeDialog: React.FC<CVAnalyzeDialogProps> = ({
  open,
  onOpenChange,
  applicants,
  fetchApplications,
}) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CVScore[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeCVs = async () => {
    const jobPostId = window.location.pathname.split("/").pop();
    const jwt = Cookies.get("jwt") || "";
    if (!jwt || !jobPostId) {
      setError("Unable to analyze CVs. Missing authentication or job post ID.");
      return;
    }
    console.log("Analyzing CVs for Job Post ID:", jobPostId);
    try {
      setLoading(true);
      const response = await triggerCVPipeline(Number(jobPostId), jwt);
      console.log("cv response: ", response);
      if (response.success) {
        console.log("CV analysis pipeline triggered successfully.");
        const results = response.data.map((item: ApplicationResponse) => ({
          email: item.email,
          score: item.score,
        }));
        setResults(results);
        await fetchApplications();
      }
    } catch (e) {
      console.error("Error analyzing CVs:", e);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between w-full">
            <span>Analyze CVs</span>
          </DialogTitle>
          <DialogDescription className="text-sm w-full justify-end flex text-gray-600 mt-1">
            <span className="text-sm text-gray-500">
              {applicants.length}{" "}
              {applicants.length === 1 ? "applicant" : "applicants"}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-3 space-y-3">
          <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto">
            {applicants.length === 0 && (
              <div className="text-sm text-gray-600">
                No applicants available.
              </div>
            )}
            {applicants.map((a) => (
              <ApplicantRow key={a.applicationId} applicant={a} />
            ))}
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <ResultsList results={results} applicants={applicants} />
        </div>

        <DialogFooter>
          <div className="w-full">
            <AnalyzeActions
              loading={loading}
              applicantsCount={applicants.length}
              onClose={() => onOpenChange(false)}
              onAnalyze={handleAnalyzeCVs}
              hasResults={!!results}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVAnalyzeDialog;

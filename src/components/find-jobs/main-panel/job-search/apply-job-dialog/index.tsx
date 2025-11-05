import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Building2,
  DollarSign,
  Upload,
  FileText,
  Paperclip,
} from "lucide-react";
import ResumeUploadBox from "./resume-upload";
import CoverLetterUploadBox from "./cover-letter-upload";
import { ApplicationDocument, Salary, ViewPostData } from "@/types/jobPosts";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { applyToJobPost } from "@/actions/jobPostActions";
import AskDialog from "@/components/common/dialogs/ask-dialog";
import { useSelector } from "react-redux";

type ApplyJobDialogProps = {
  dialogOpen: boolean;
  handleOpenChange: (open: boolean) => void;
  jobData: ViewPostData;
};

const ApplyJobDialog = ({
  dialogOpen,
  handleOpenChange,
  jobData,
}: ApplyJobDialogProps) => {
  const [resume, setResume] = useState<ApplicationDocument>(
    {} as ApplicationDocument
  );
  const [coverLetter, setCoverLetter] = useState<ApplicationDocument>(
    {} as ApplicationDocument
  );
  const account = useSelector((state: any) => state.account);

  const [resumeUpload, setResumeUpload] = useState(false);
  const [coverLetterUpload, setCoverLetterUpload] = useState(false);

  const formatSalary = (salary: Salary, currency: string): string => {
    const { min, max } = salary;
    return `${currency} ${min.toLocaleString()} - ${currency} ${max.toLocaleString()}`;
  };

  const handleApplyJobPost = async () => {
    if (resumeUpload || coverLetterUpload) {
      toast.error(
        "Please upload the documents before submitting the application"
      );
      return;
    }
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      console.error("User not authenticated");
      return;
    }
    try {
      const response = await applyToJobPost(
        jwt,
        jobData.jobData.basicInformation.id,
        account.profile.id,
        [resume, coverLetter]
      );
      if (response.success) {
        toast.success("Successfully applied for job");
      } else {
        toast.error(response.message || "Error applying for job");
      }
    } catch (error: any) {
      toast.error(error.message || "Error applying for job");
      console.error("Error applying for job:", error);
    } finally {
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="overflow-auto max-h-[80vh] beautiful-scrollbar w-[95vw] sm:w-[90vw] md:w-[80vw] max-w-[900px] p-4 sm:p-6"
        style={{ width: "80vw", maxWidth: "900px" }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            Apply for Position
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Complete your application by uploading your documents
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
          {/* Job Information */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {jobData.jobData.basicInformation.jobTitle}
              </h3>
              <div className="flex items-center gap-2 text-gray-600 mt-1 text-sm sm:text-base">
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {jobData.jobData.basicInformation.companyName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-green-600 font-semibold text-sm sm:text-base">
              <span>
                {formatSalary(
                  jobData.jobData.basicInformation.salary,
                  jobData.jobData.basicInformation.currency
                )}
              </span>
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                Required Skills:
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {jobData.jobData.skills.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 font-[500] border py-1 bg-blue-100 text-gray-700 rounded-full text-xs sm:text-[13px]"
                  >
                    {skill}
                  </span>
                ))}
                {jobData.jobData.skills.length > 4 && (
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 font-[500] border text-gray-500 rounded-full text-xs sm:text-[13px]">
                    +{jobData.jobData.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Documents Section Title */}
          <div className="pt-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
              Application Documents
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Upload your CV and cover letter to complete your application
            </p>
          </div>

          {/* CV Upload Section */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Curriculum Vitae (CV) <span className="text-red-500">*</span>
            </h4>
            <ResumeUploadBox
              resume={resume}
              setResume={setResume}
              resumeUpload={resumeUpload}
              setResumeUpload={setResumeUpload}
            />
          </div>

          {/* Cover Letter Upload Section */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-purple-600" />
              Cover Letter{" "}
              <span className="text-xs sm:text-sm text-gray-500 font-normal">
                (Optional)
              </span>
            </h4>
            <CoverLetterUploadBox
              coverLetter={coverLetter}
              setCoverLetter={setCoverLetter}
              coverLetterUpload={coverLetterUpload}
              setCoverLetterUpload={setCoverLetterUpload}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
            <Button
              variant="outline"
              className="flex-1 h-[40px] sm:h-[45px] text-sm sm:text-[14px] font-geist-sans font-[600]"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <AskDialog
              confirmAction={handleApplyJobPost}
              description="Are you sure you want to submit your application for this job?"
              button={
                <Button
                  onClick={(e) => {
                    // continue only if resumeUpload and coverLetterUpload is false
                    if (coverLetterUpload || resumeUpload) {
                      e.preventDefault();
                      toast.error(
                        "Please upload the documents before submitting the application"
                      );
                      return;
                    }
                  }}
                  disabled={resume.id === undefined || resume.id === ""}
                  className="flex-1 h-[40px] sm:h-[45px]  text-sm sm:text-[14px] font-geist-sans font-[600]"
                >
                  Submit Application
                </Button>
              }
              submitLoadingText="Applying..."
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobDialog;

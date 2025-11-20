"use client";

import React, { useEffect, useState } from "react";
import AppliedJobCard from "./AppliedJobCard";
import { AppliedJob } from "./types";
// import { getMyApplications, removeApplication } from "@/actions/applicationActions";
import Cookies from "js-cookie";
import { getMyApplications } from "@/actions/applicationActions";
import { getJobPostById } from "@/actions/jobPostActions";
import { FileUser, Link } from "lucide-react";
import NormalSelector from "@/components/common/selectors/normal-selector";
import ConfirmRemoveDialog from "./ConfirmRemoveDialog";

const AppliedJobsPanel: React.FC = () => {
  const [jobs, setJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState("all");
  const [removeTarget, setRemoveTarget] = useState<{
    id: number;
    title?: string;
  } | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const getJobPost = async (id: number) => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try {
      const response = await getJobPostById(jwt, id);
      if (response.success) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching job post:", error);
    }
  };

  const getAppliedJobPosts = async () => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try {
      setLoading(true);
      const response = await getMyApplications(jwt);
      if (response.success) {
        const applications = response.data;
        // reset list before populating to avoid duplicates on re-run
        setJobs([]);
        for (const application of applications) {
          const jobPost = await getJobPost(application.postId);
          if (jobPost) {
            const formattedAppliedJob = {
              applicationId: application.applicationId,
              jobData: {
                id: jobPost.postId,
                jobTitle: jobPost.title,
                companyName: jobPost.companyName,
                companyLogo: jobPost.companyLogo,
                location: jobPost.location,
                workType: jobPost.workType,
                experienceLevel: jobPost.experienceLevel,
                employmentType: jobPost.employmentType,
              },
              interviewDate: application.interviewDate,
              applicationStatus: application.applicationStatus,
              appliedAt: application.appliedAt,
            };
            console.log(formattedAppliedJob);
            setJobs((prevList) => [...prevList, formattedAppliedJob]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterList = [
    { label: "All", value: "all" },
    { label: "Not Completed", value: "not_completed" },
    { label: "Completed", value: "completed" },
  ];

  const handleFilterInterviews = (value: string) => {
    setFilterBy(value);
  };

  useEffect(() => {
    getAppliedJobPosts();
  }, []);

  const handleRemove = async (applicationId: number) => {
    setConfirmOpen(true);
  };

  const handleJoin = (job: AppliedJob) => {
    // navigate to interview or open confirmation dialog
    window.location.href = `/interview/${job.applicationId}`;
  };

  return (
    <>
      {loading && (
        <div className="fixed  inset-0 bg-white/60 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            {/* Loading spinner */}
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

            {/* Transition text */}
            <div className="text-primary font-semibold text-lg animate-pulse">
              Loading ...
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="flex w-full md:flex-row flex-col md:items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Icon */}
            <div
              className={`
          flex-shrink-0 p-2 rounded-lg transition-all duration-300
          bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary
        `}
            >
              <FileUser />
            </div>

            {/* Text content */}
            <div className="flex flex-col">
              <span
                className={`
            font-[700] text-[20px] transition-colors duration-300 text-gray-800 group-hover:text-primary
          `}
              >
                My Applied Jobs
              </span>
              <span
                className={`
              text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
            `}
              >
                View and manage your job applications
              </span>
            </div>
          </div>
          <div className="md:w-[16%] w-full">
            <NormalSelector
              label=""
              placeholder="Filter by"
              value={filterBy}
              onChange={handleFilterInterviews}
              items={filterList}
            />
          </div>
        </div>

        {/* Empty state when there are no interviews */}
        {!loading && jobs.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center gap-6 py-12">
            <div className="w-40 h-40 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100">
              {/* Illustrative SVG */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-indigo-600"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 12c0 5.52-4.48 10-10 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12h8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>

            <div className="text-center max-w-xl px-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                No applied jobs found
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                You haven't applied to any jobs yet. When you apply, they'll
                appear here.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <Link
                  href="/find-jobs"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                >
                  Browse Job Posts
                </Link>
                <button
                  onClick={() => getAppliedJobPosts()}
                  className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            {jobs.map((job, index) => {
              return (
                <AppliedJobCard
                  key={job.applicationId}
                  job={job}
                  onRemove={handleRemove}
                  onOpenJoin={handleJoin}
                />
              );
            })}
          </div>
        )}
      </div>
      <ConfirmRemoveDialog
        open={confirmOpen}
        jobTitle={removeTarget?.title}
        onConfirm={() => removeTarget && handleRemove(removeTarget.id)}
        onClose={() => {
          setConfirmOpen(false);
          setRemoveTarget(null);
        }}
      />
    </>
  );
};

export default AppliedJobsPanel;

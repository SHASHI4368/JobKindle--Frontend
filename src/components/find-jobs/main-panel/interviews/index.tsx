"use client";

import NormalSelector from "@/components/common/selectors/normal-selector";
import { Bot } from "lucide-react";
import React, { useEffect, useState } from "react";
import dummyInterviews from "./dummyInterviews.json";
import InterviewListingCard from "./InterviewListingCard";
import Cookies from "js-cookie";
import { getMyInterviews } from "@/actions/interviewActions";
import { getJobPostById } from "@/actions/jobPostActions";
import { InterviewScheduleDetails } from "./types";
import Link from "next/link";

const Interviews = () => {
  const [interviewList, setInterviewList] = useState<
    InterviewScheduleDetails[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState("all");

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

  const getInterview = async () => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try {
      setLoading(true);
      const response = await getMyInterviews(jwt);
      if (response.success) {
        const interviews = response.data;
        // reset list before populating to avoid duplicates on re-run
        setInterviewList([]);
        for (const interview of interviews) {
          const jobPost = await getJobPost(interview.postId);
          if (jobPost) {
            const formattedInterview = {
              applicationId: interview.applicationId,
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
              interviewDate: interview.interviewDate,
            };
            setInterviewList((prevList) => [...prevList, formattedInterview]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterList = [
    { label: "All", value: "all" },
    { label: "Not Completed", value: "not_completed" },
    { label: "Completed", value: "completed" },
  ];

  const handleFilterInterviews = (value: string) => {
    setFilterBy(value);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[200] flex items-center justify-center">
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
              <Bot />
            </div>

            {/* Text content */}
            <div className="flex flex-col">
              <span
                className={`
            font-[700] text-[20px] transition-colors duration-300 text-gray-800 group-hover:text-primary
          `}
              >
                My Interviews
              </span>
              <span
                className={`
              text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
            `}
              >
                View and manage job interviews
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
        {!loading && interviewList.length === 0 ? (
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
                No interviews found
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                You don't have any scheduled interviews yet. When interviews are
                scheduled they'll appear here.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <Link
                  href="/find-jobs"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                >
                  Browse Job Posts
                </Link>
                <button
                  onClick={() => getInterview()}
                  className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-4">
            {interviewList.map((interview, index) => {
              return (
                <InterviewListingCard key={index} interviewData={interview} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Interviews;

"use client";

import { Briefcase } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getMyJobPosts } from "@/actions/jobPostActions";
import JobPostCard from "./JobPostCard";
import { ViewPostData, ViewPostsProps } from "@/types/jobPosts";
import { useDispatch, useSelector } from "react-redux";
import { setCreateJobPostsData } from "@/redux/features/createJobPostsSlice";

const ViewPosts = () => {
  const [loading, setLoading] = useState(false);
  const createJobPosts = useSelector((state: any) => state.createJobPosts);
  const dispatch = useDispatch();

  const getCreatedPosts = async () => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try {
      setLoading(true);
      const response = await getMyJobPosts(jwt);
      if (response.success) {
        console.log("Fetched job posts:", response.data);
        response.jobPosts = response.data.map((post: ViewPostsProps) => ({
          jobData: {
            basicInformation: {
              id: post.postId,
              jobTitle: post.title,
              companyName: post.companyName,
              companyLogo: post.companyLogo,
              location: post.location,
              workType: post.workType,
              experienceLevel: post.experienceLevel,
              employmentType: post.employmentType,
              currency: post.currency,
              salary: { min: post.minSalary, max: post.maxSalary },
            },
            jobDetails: {
              jobDescription: post.description,
              requirements: post.requirements,
              benefits: post.benefits,
            },
            skills: post.skills
              ? post.skills.flat().map((skill) => skill.name)
              : [],
            deadline: post.deadline,
            applicationsCount: post.applicationsCount || 0
          },
        }));
        dispatch(setCreateJobPostsData(response.jobPosts || []));
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCreatedPosts();
  }, []);

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
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div
            className={`
              flex-shrink-0 p-2 rounded-lg transition-all duration-300
              bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary
            `}
          >
            <Briefcase />
          </div>

          {/* Text content */}
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col">
              <span
                className={`
                font-semibold text-[18px] transition-colors duration-300 text-gray-800 group-hover:text-primary
                
              `}
              >
                View Posts
              </span>
              <span
                className={`
                  text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
                  
                `}
              >
                Manage and view your job postings
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          {createJobPosts.jobPosts.length === 0 ? (
            <div className="w-full h-[200px] flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-gray-300 rounded-lg">
              <span className="text-gray-500 font-medium">
                No job posts found.
              </span>
            </div>
          ) : (
            createJobPosts.jobPosts.map((post: ViewPostData, index: number) => (
              <JobPostCard key={index} jobData={post} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ViewPosts;

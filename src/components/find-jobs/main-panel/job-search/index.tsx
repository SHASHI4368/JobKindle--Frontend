import NormalSelector from "@/components/common/selectors/normal-selector";
import { FileSearch2 } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";
import JobListingCard from "./JobListingCard";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getAllActiveJobPosts } from "@/actions/jobPostActions";
import { ViewPostData, ViewPostsProps } from "@/types/jobPosts";
import { setFindJobsPostsData } from "@/redux/features/findJobsSlice";


const JobSearch = () => {
  const [sortBy, setSortBy] = useQueryState("sortBy", parseAsString.withDefault("mostRecent"));
  const [loading, setLoading] = useState(false);
    const findJobs = useSelector((state: any) => state.findJobs);
    const dispatch = useDispatch();

  const filterList = [
    { label: "Most Recent", value: "mostRecent" },
    { label: "Most Relevant", value: "mostRelevant" },
    { label: "Highest Salary", value: "highestSalary" },
  ];

  const getActiveJobs = async () => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try {
      setLoading(true);
      const response = await getAllActiveJobPosts(jwt);
      if (response.success) {
        console.log("Fetched job posts:", response.data);
        response.jobPosts = response.data.content.map((post: ViewPostsProps) => ({
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
          },
        }));
        dispatch(setFindJobsPostsData(response.jobPosts || []));
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActiveJobs();
  }, []);

  

  const handleSortChange = (item: string) => {
    setSortBy(item);
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full md:flex-row flex-col md:items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div
            className={`
          flex-shrink-0 p-2 rounded-lg transition-all duration-300
          bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary
        `}
          >
            <FileSearch2 />
          </div>

          {/* Text content */}
          <div className="flex flex-col">
            <span
              className={`
            font-[700] text-[20px] transition-colors duration-300 text-gray-800 group-hover:text-primary
            
          `}
            >
              Job Search
            </span>
            <span
              className={`
              text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
              
            `}
            >
              Search for jobs based on your preferences
            </span>
          </div>
        </div>
        <div className="md:w-[16%] w-full">
          <NormalSelector
            label=""
            value={sortBy}
            onChange={handleSortChange}
            items={filterList}
            placeholder=""
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {findJobs.jobPosts.length === 0 ? (
          <div className="w-full h-[200px] flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-gray-300 rounded-lg">
            <span className="text-gray-500 font-medium">
              No job posts found.
            </span>
          </div>
        ) : (
          findJobs.jobPosts.map((post: ViewPostData, index: number) => (
            <JobListingCard key={index} jobData={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default JobSearch;

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Calendar,
  Building2,
  Pencil,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AskDialog from "@/components/common/dialogs/ask-dialog";
import { parseAsInteger, useQueryState } from "nuqs";
import EditJobPostDialog from "../edit-job-post";
import { Salary, ViewPostData, ViewPostsProps } from "@/types/jobPosts";
import Cookies from "js-cookie";
import { deleteJobPost, getMyJobPosts } from "@/actions/jobPostActions";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCreateJobPostsData } from "@/redux/features/createJobPostsSlice";

const JobPostCard = ({ jobData }: { jobData: ViewPostData }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [jobPostId, setJobPostId] = useQueryState("jobPostId", parseAsInteger);

  const { basicInformation, jobDetails, skills, deadline } = jobData.jobData;

  // Calculate days ago from deadline (mock calculation)
  const getDaysAgo = (deadlineDate: string): string => {
    const deadline = new Date(deadlineDate);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days left` : "2 days ago";
  };

  const formatSalary = (salary: Salary, currency: string): string => {
    const { min, max } = salary;
    return `${currency} ${min.toLocaleString()} - ${currency} ${max.toLocaleString()}`;
  };

  const getWorkTypeDisplay = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleEditDialogOpen = () => {
    setJobPostId(basicInformation.id || 0);
    setEditDialogOpen(true);
  };

  const handleDeletePost = async () => {
    try {
      const jwt = Cookies.get("jwt") || "";
      if (!jwt) {
        console.error("JWT token not found");
        return;
      }
      const response = await deleteJobPost(jwt, basicInformation.id || 0);
      if (response.success) {
        toast.success("Job post deleted successfully");
        await getCreatedPosts();
      } else {
        toast.error("Failed to delete job post");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const getCreatedPosts = async () => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try {
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
              requirements: post.requirements || [],
              benefits: post.benefits,
            },
            skills: post.skills
              ? post.skills.flat().map((skill) => skill.name)
              : [],
            deadline: post.deadline,
          },
        }));
        dispatch(setCreateJobPostsData(response.jobPosts || []));
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
    } finally {
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-start space-x-3 sm:space-x-4">
            {basicInformation.companyLogo ? (
              <img
                src={basicInformation.companyLogo}
                alt={basicInformation.companyName}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg"
              />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-raleway font-[700] text-gray-900 mb-1 leading-tight">
                {basicInformation.jobTitle}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Building2 className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm sm:text-base truncate">
                    {basicInformation.companyName}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm sm:text-base truncate">
                    {basicInformation.location}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block font-[600] py-1 border rounded-full px-3 text-xs sm:text-[13px]">
                  {getWorkTypeDisplay(basicInformation.workType)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{getDaysAgo(deadline)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>45 applicants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-green-600 text-sm sm:text-base">
                    {formatSalary(
                      basicInformation.salary,
                      basicInformation.currency || "$"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <AskDialog
              confirmAction={handleEditDialogOpen}
              button={
                <Button
                  variant={"outline"}
                  className="cursor-pointer w-full sm:w-auto mt-4 sm:mt-0"
                  title="Edit Job Post"
                >
                  <Pencil className="w-4 h-4 " />
                </Button>
              }
              description="Are you sure you want to edit this job post?"
              submitLoadingText=""
            />
            <AskDialog
              confirmAction={handleDeletePost}
              button={
                <Button
                  variant={"outline"}
                  className="cursor-pointer text-red-500 hover:text-red-400 transition-all duration-150 w-full sm:w-auto mt-4 sm:mt-0"
                  title="Delete Job Post"
                >
                  <Trash className="w-4 h-4 " />
                </Button>
              }
              submitLoadingText="Deleting..."
              description="Are you sure you want to delete this job post?"
            />
          </div>
        </div>

        {/* Job Description Preview */}
        <div className="mt-4">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-2">
            {jobDetails.jobDescription}
          </p>
        </div>

        {/* Skills Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2 sm:px-3 font-[500] border py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-[13px]"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-2 sm:px-3 py-1 bg-gray-100 font-[500] border text-gray-500 rounded-full text-xs sm:text-[13px]">
              +{skills.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className=""></div>
          <Button
            variant={"ghost"}
            onClick={() => setShowDetails(!showDetails)}
            className="flex cursor-pointer h-[40px] sm:h-[45px] items-center justify-center sm:justify-start space-x-2 text-blue-600 hover:text-blue-800 transition-colors w-full sm:w-auto"
          >
            <span className="font-raleway font-[500] text-sm sm:text-base">
              {showDetails ? "Hide Details" : "View Full Details"}
            </span>
            {showDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Expandable Details Section */}
      {showDetails && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Full Job Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Job Description
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {jobDetails.jobDescription}
              </p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Requirements
              </h3>
              <ul className="space-y-2">{jobDetails.requirements}</ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Benefits
              </h3>
              <p className="">{jobDetails.benefits}</p>
            </div>

            {/* All Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Application Deadline */}
            <div className="flex items-start sm:items-center space-x-2 text-gray-600">
              <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
              <span className="text-sm sm:text-base">
                Application Deadline:{" "}
                {new Date(deadline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Additional Apply Button */}
            {/* <div className="pt-4 border-t border-gray-200">
              <Button
                variant={"default"}
                className="h-[40px] sm:h-[45px] w-full cursor-pointer text-sm sm:text-[14px] font-raleway font-[600]"
              >
                Apply for this Position
              </Button>
            </div> */}
          </div>
        </div>
      )}
      <EditJobPostDialog open={editDialogOpen} setOpen={setEditDialogOpen} />
    </div>
  );
};

export default JobPostCard;

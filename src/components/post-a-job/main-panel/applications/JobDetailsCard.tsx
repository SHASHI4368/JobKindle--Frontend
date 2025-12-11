import React from "react";
import {
  Hash,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Users,
} from "lucide-react";
import { BasicInformation, ViewPostData } from "@/types/jobPosts";

type JobDetailsCardProps = {
  jobData: ViewPostData;
};

const JobDetailsCard = ({ jobData }: JobDetailsCardProps) => {
  const { basicInformation, deadline, applicationsCount } = jobData.jobData;

  const getWorkTypeDisplay = (workType: string) => {
    const workTypeMap: { [key: string]: string } = {
      remote: "Remote",
      onsite: "On-site",
      hybrid: "Hybrid",
    };
    return workTypeMap[workType.toLowerCase()] || workType;
  };

  const getDaysAgo = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  const formatSalary = (salary: any, currency: string) => {
    if (!salary) return "Not specified";
    return `${currency} ${salary.min?.toLocaleString()} - ${currency} ${salary.max?.toLocaleString()}`;
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br font-geist-sans from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-blue-200 shadow-sm">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-start space-x-3 sm:space-x-4">
            {basicInformation.companyLogo ? (
              <img
                src={basicInformation.companyLogo}
                alt={basicInformation.companyName}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shadow-md"
              />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-geist-sans font-[700] text-gray-900 mb-1 leading-tight">
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

              <div className="mb-3 flex items-center gap-2">
                <span className="inline-block font-[600] py-1 border border-blue-300 bg-white/60 backdrop-blur-sm rounded-full px-3 text-xs sm:text-[13px] text-blue-700">
                  {getWorkTypeDisplay(basicInformation.workType)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{getDaysAgo(deadline)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{`${applicationsCount} ${applicationsCount === 1 ? 'applicant' : 'applicants'}`} </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-green-700 text-sm sm:text-base">
                    {formatSalary(
                      basicInformation.salary,
                      basicInformation.currency || "$"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsCard;

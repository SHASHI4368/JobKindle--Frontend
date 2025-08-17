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
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Salary {
  min: number;
  max: number;
}

interface BasicInformation {
  jobTitle: string;
  companyName: string;
  location: string;
  workType: string;
  experienceLevel: string;
  employmentType: string;
  currency: string;
  salary: Salary;
}

interface JobDetails {
  jobDescription: string;
  requirements: string[];
  benifits: string[];
}

interface JobData {
  basicInformation: BasicInformation;
  jobDetails: JobDetails;
  skills: string[];
  deadline: string;
}

interface JobListingCardProps {
  jobData: JobData;
}

const JobListingCard = ({ jobData }: JobListingCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const { basicInformation, jobDetails, skills, deadline } = jobData;

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

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-raleway font-[700] text-gray-900 mb-1">
                {basicInformation.jobTitle}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Building2 className="w-4 h-4" />
                  <span>{basicInformation.companyName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{basicInformation.location}</span>
                </div>
                <span className="font-[600] py-1 border rounded-l-full rounded-r-full px-3 text-[13px]">
                  {getWorkTypeDisplay(basicInformation.workType)}
                </span>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{getDaysAgo(deadline)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>45 applicants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-green-600">
                    {formatSalary(
                      basicInformation.salary,
                      basicInformation.currency
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button variant={"outline"} className="cursor-pointer">
            Save
          </Button>
        </div>

        {/* Job Description Preview */}
        <div className="mt-4">
          <p className="text-gray-700 line-clamp-2">
            {jobDetails.jobDescription}
          </p>
        </div>

        {/* Skills Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-3 font-[500] border py-1 bg-gray-100 text-gray-700 rounded-full text-[13px]"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 font-[500] border text-gray-500 rounded-full text-[13px]">
              +{skills.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between">
          <Button variant={"default"} className="h-[40px] cursor-pointer">
            Apply Now
          </Button>

          <Button
            variant={"ghost"}
            onClick={() => setShowDetails(!showDetails)}
            className="flex cursor-pointer h-[45px] items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span className="font-raleway font-[500] ">
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
          <div className="p-6 space-y-6">
            {/* Full Job Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Job Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {jobDetails.jobDescription}
              </p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Requirements
              </h3>
              <ul className="space-y-2">
                {jobDetails.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Benefits
              </h3>
              <ul className="space-y-2">
                {jobDetails.benifits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
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
                    className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Application Deadline */}
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>
                Application Deadline:{" "}
                {new Date(deadline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Additional Apply Button */}
            <div className="pt-4 border-t border-gray-200">
              <Button variant={'default'}  className="h-[45px] w-full cursor-pointer text-[14px] font-raleway font-[600]">
                Apply for this Position
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListingCard;

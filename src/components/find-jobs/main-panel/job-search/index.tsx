import NormalSelector from "@/components/common/selectors/normal-selector";
import { FileSearch2 } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";
import JobListingCard from "./JobListingCard";

const JobSearch = () => {
  const [sortBy, setSortBy] = useQueryState("sortBy", parseAsString.withDefault("mostRecent"));

  const filterList = [
    { label: "Most Recent", value: "mostRecent" },
    { label: "Most Relevant", value: "mostRelevant" },
    { label: "Highest Salary", value: "highestSalary" },
  ];

  const jobPosts = [
    {
      basicInformation: {
        jobTitle: "Frontend Developer",
        companyName: "TechNova Solutions",
        location: "Colombo, Sri Lanka",
        workType: "hybrid",
        experienceLevel: "mid level",
        employmentType: "full time",
        currency: "LKR",
        salary: {
          min: 150000,
          max: 250000,
        },
      },
      jobDetails: {
        jobDescription:
          "We are seeking a passionate and skilled Frontend Developer to join our growing team. You will be responsible for building intuitive and visually appealing web interfaces using modern JavaScript frameworks. This role offers the opportunity to work in a collaborative, fast-paced environment and contribute to cutting-edge digital solutions.",
        requirements: [
          "3+ years of experience in frontend development",
          "Proficiency in React.js and TypeScript",
          "Strong understanding of HTML5, CSS3, and responsive design",
          "Experience with REST APIs and asynchronous programming",
          "Familiarity with Git and version control workflows",
        ],
        benifits: [
          "Hybrid work environment",
          "Flexible working hours",
          "Monthly performance bonuses",
          "Comprehensive health insurance",
          "Annual training and development budget",
        ],
      },
      skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "REST APIs"],
      deadline: "2025-09-30",
    },
    {
      basicInformation: {
        jobTitle: "Data Analyst Intern",
        companyName: "InsightWave Analytics",
        location: "Remote",
        workType: "remote",
        experienceLevel: "entry level",
        employmentType: "intern",
        currency: "USD",
        salary: {
          min: 300,
          max: 500,
        },
      },
      jobDetails: {
        jobDescription:
          "InsightWave Analytics is offering an exciting internship opportunity for aspiring data analysts. This internship will give you hands-on experience in data cleaning, analysis, and visualization using real-world datasets, all while being mentored by industry experts.",
        requirements: [
          "Basic knowledge of data analysis concepts",
          "Familiarity with Excel and data visualization tools",
          "Understanding of Python or R for data analysis",
          "Strong analytical and problem-solving skills",
          "Enthusiastic and eager to learn",
        ],
        benifits: [
          "Remote work opportunity",
          "Mentorship from experienced data scientists",
          "Letter of recommendation upon successful completion",
          "Flexible schedule",
          "Exposure to real industry data",
        ],
      },
      skills: ["Excel", "Python", "Data Visualization", "Problem Solving"],
      deadline: "2025-08-20",
    },
    {
      basicInformation: {
        jobTitle: "Senior Project Manager",
        companyName: "Apex Global Systems",
        location: "Singapore",
        workType: "onsite",
        experienceLevel: "senior level",
        employmentType: "full time",
        currency: "SGD",
        salary: {
          min: 9000,
          max: 12000,
        },
      },
      jobDetails: {
        jobDescription:
          "We are seeking an experienced and highly organized Senior Project Manager to lead our enterprise IT projects. The ideal candidate will have a proven track record in managing large-scale software development projects, excellent communication skills, and the ability to manage cross-functional teams.",
        requirements: [
          "8+ years of project management experience",
          "PMP or PRINCE2 certification preferred",
          "Strong leadership and team management skills",
          "Experience with Agile and Waterfall methodologies",
          "Excellent stakeholder communication and negotiation skills",
        ],
        benifits: [
          "Attractive salary package",
          "Onsite gym and wellness programs",
          "Annual performance bonuses",
          "Opportunities for career growth",
          "Company-sponsored conferences and workshops",
        ],
      },
      skills: [
        "Project Management",
        "Agile",
        "Scrum",
        "Leadership",
        "Communication",
      ],
      deadline: "2025-09-15",
    },
  ];

  const handleSortChange = (item: string) => {
    setSortBy(item);
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-row items-center justify-between">
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
        <div className="w-[16%]">
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
        {jobPosts.map((job, index) => (
          <JobListingCard key={index} jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default JobSearch;

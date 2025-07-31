import React from "react";
import { advertisement } from "./types";
import JobCard from "./JobCard";
import { Button } from "@/components/ui/button";

const advertisements: advertisement[] = [
  {
    job: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    fullTime: true,
    onSite: false,
    requirements: ["React", "Node.js", "AWS", "TypeScript"],
    calledDate: "2025-07-15",
    rating: 4.8,
    applications: 150,
  },
  {
    job: "Data Scientist",
    company: "Data Insights Ltd.",
    location: "New York, NY",
    salary: "$110,000 - $140,000",
    fullTime: true,
    onSite: true,
    requirements: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    calledDate: "2025-07-16",
    rating: 4.5,
    applications: 200,
  },
  {
    job: "Product Manager",
    company: "Innovate Solutions",
    location: "Remote",
    salary: "$100,000 - $130,000",
    fullTime: true,
    onSite: false,
    requirements: ["Agile", "Scrum", "Stakeholder Management"],
    calledDate: "2025-07-14",
    rating: 4.7,
    applications: 180,
  },
  {
    job: "UX Designer",
    company: "Creative Agency",
    location: "Los Angeles, CA",
    salary: "$90,000 - $120,000",
    fullTime: true,
    onSite: true,
    requirements: ["Figma", "User Research", "Prototyping"],
    calledDate: "2025-07-15",
    rating: 4.6,
    applications: 120,
  },
  {
    job: "DevOps Engineer",
    company: "Cloud Solutions",
    location: "Austin, TX",
    salary: "$115,000 - $145,000",
    fullTime: true,
    onSite: false,
    requirements: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    calledDate: "2025-07-12",
    rating: 4.9,
    applications: 160,
  },
];

const Featured = () => {
  return (
    <div className="w-full flex py-[20px] bg-gray-white items-center justify-start flex-col">
      <h1 className="font-raleway font-[700] md:text-[60px] sm:text-[50px] text-[40px] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Featured Jobs
      </h1>
      <p className="text-gray-600 font-raleway md:text-[23px] sm:text-[20px] text-[18px] sm:mt-[40px] mt-[20px] md:max-w-[50vw] max-w-[90vw] text-center">
        Discover hand-picked opportunities from top companies, matched by our AI
        to your skills and preferences
      </p>
      <div className="md:px-[10vw] w-full  mt-[30px] flex flex-row items-center justify-evenly flex-wrap gap-[30px]">
        {advertisements.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
      <div className="flex w-full pt-[80px] justify-center items-center">
        <Button size={"card"} className="w-[200px]" variant={"outlineStrong"}>
          View All Jobs
        </Button>
      </div>
    </div>
  );
};

export default Featured;

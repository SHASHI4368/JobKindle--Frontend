"use client";

import React, { useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { Bot, FileSearch2, FileUser } from "lucide-react";
import SidePanel from "../common/side-panel";
import JobSearch from "./main-panel/job-search";
import LargeScreenSearch from "./header/LargeScreenSearch";
import SmallScreenSearch from "./header/SmallScreenSearch";

const FindJobs = () => {
  const [activeItem, setActiveItem] = useQueryState(
    "activeItem",
    parseAsString.withDefault("Job Search")
  );
  const [searchTerm, setSearchTerm] = useQueryState("searchTerm");
  const [location, setLocation] = useQueryState("location");
  const [datePosted, setDatePosted] = useQueryState(
    "datePosted",
    parseAsString.withDefault("")
  );
  const [experienceLevel, setExperienceLevel] = useQueryState(
    "experienceLevel",
    parseAsString.withDefault("")
  );
  const [workType, setWorkType] = useQueryState(
    "workType",
    parseAsString.withDefault("")
  );
  const [loading, setLoading] = useState(false);
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);

  const dateOptions = [
    { label: "Anytime", value: "anytime" },
    { label: "Past 24 hours", value: "24h" },
    { label: "Past 3 days", value: "3d" },
    { label: "Past week", value: "7d" },
    { label: "Past month", value: "30d" },
  ];

  const experienceOptions = [
    { label: "Any", value: "any" },
    { label: "Entry Level", value: "entry" },
    { label: "Mid Level", value: "mid" },
    { label: "Senior Level", value: "senior" },
    { label: "Executive", value: "executive" },
  ];

  const workTypeOptions = [
    { label: "Any", value: "any" },
    { label: "Remote", value: "remote" },
    { label: "Onsite", value: "onsite" },
    { label: "Hybrid", value: "hybrid" },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleDatePostedChange = (value: string) => {
    setDatePosted(value);
  };

  const handleExperienceLevelChange = (value: string) => {
    setExperienceLevel(value);
  };

  const handleWorkTypeChange = (value: string) => {
    setWorkType(value);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setLocation("");
    setDatePosted("");
    setExperienceLevel("");
    setWorkType("");
    setLoading(false);
    setLoadingCompleted(false);
    setResultsCount(0);
  };

  const handleJobSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoadingCompleted(true);
      setResultsCount(10); // Simulate 10 results found
    }, 2000);
  };

  const menuItems = [
    {
      title: "Job Search",
      icon: <FileSearch2 size={18} />,
      description: "Search for jobs based on your preferences",
    },
    {
      title: "Applied Jobs",
      icon: <FileUser size={18} />,
      description: "Manage selected jobs",
    },
    {
      title: "Interviews",
      icon: <Bot size={18} />,
      description: "Manage selected job interviews",
    },
  ];
  return (
    <div className="w-full gap-4 mb-[20px] flex flex-col xl:px-[10vw] px-[5vw]">
      <LargeScreenSearch
        searchProps={{
          searchTerm,
          location,
          datePosted,
          experienceLevel,
          workType,
          setLocation,
          dateOptions,
          experienceOptions,
          workTypeOptions,
          handleClearFilters,
          handleJobSearch,
          handleDatePostedChange,
          handleExperienceLevelChange,
          handleWorkTypeChange,
          handleSearchChange,
          handleLocationChange,
        }}
      />
      <div className="flex-1 gap-5 flex lg:flex-row lg:mt-0 mt-[20px] flex-col">
        <SidePanel
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          menuItems={menuItems}
        />
        <SmallScreenSearch
          searchProps={{
            searchTerm,
            location,
            datePosted,
            experienceLevel,
            workType,
            setLocation,
            dateOptions,
            experienceOptions,
            workTypeOptions,
            handleClearFilters,
            handleJobSearch,
            handleDatePostedChange,
            handleExperienceLevelChange,
            handleWorkTypeChange,
            handleSearchChange,
            handleLocationChange,
          }}
        />
        <div className="flex-1 flex-col">
          <div className="rounded-[10px] w-full md:pl-4 mb-[10px]">
            {activeItem === "Job Search" && <JobSearch />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;

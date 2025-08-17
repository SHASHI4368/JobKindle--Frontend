"use client";

import InputWithIcon from "@/components/common/input-fields/input-with-icon";
import LocationInput from "@/components/common/input-fields/location-input";
import NormalSelector from "@/components/common/selectors/normal-selector";
import { Button } from "@/components/ui/button";
import { MapPin, Search, X } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import React, { useState } from "react";

const FindJobsHeader = () => {
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

  return (
    <div className="w-full gap-2 flex flex-col  relative mt-[20px]  min-h-[20vh]  ">
      <div className="flex w-full flex-row items-end gap-[1%]">
        <div className="w-[59%] ">
          <InputWithIcon
            label=""
            icon={<Search size={18} className="text-gray-500" />}
            placeholder="Search for jobs, companies, or skills"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-[29%]">
          <LocationInput
            icon={<MapPin size={18} className="text-gray-500" />}
            label=""
            placeholder="Location"
            value={location}
            onChange={handleLocationChange}
            isLocationSearch={true}
            onLocationSelect={(location) => {
              setLocation(location.display_name.split(",")[0]);
            }}
          />
        </div>
        <div className="w-[10%]">
          <Button
            onClick={handleJobSearch}
            className="h-[45px]"
            variant="default"
          >
            <Search size={16} className="text-white" />
            <span className="text-white">Search Jobs</span>
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-row items-end gap-[1%]">
        <div className="flex w-[69%] gap-[1%]">
          <NormalSelector
            label=""
            items={dateOptions}
            value={datePosted}
            onChange={handleDatePostedChange}
            placeholder="Date Posted"
          />
          <NormalSelector
            label=""
            items={experienceOptions}
            value={experienceLevel}
            onChange={handleExperienceLevelChange}
            placeholder="Experience Level"
          />
          <NormalSelector
            label=""
            items={workTypeOptions}
            value={workType}
            onChange={handleWorkTypeChange}
            placeholder="Work Type"
          />
        </div>
        <Button
          onClick={handleClearFilters}
          className="h-[45px] cursor-pointer "
          variant="outline"
        >
          <span className="text-red-500">Clear Filters</span>
        </Button>
      </div>
      {/* <div className="relative mt-[20px] w-full h-px ">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-pulse"></div>
      </div> */}
    </div>
  );
};

export default FindJobsHeader;

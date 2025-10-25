"use client";

import InputWithIcon from "@/components/common/input-fields/input-with-icon";
import LocationInput from "@/components/common/input-fields/location-input";
import NormalSelector from "@/components/common/selectors/normal-selector";
import { Button } from "@/components/ui/button";
import { MapPin, Search, X } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import React, { useState } from "react";
import { searchProps } from "./searchProps";

const LargeScreenSearch = ({ searchProps }: { searchProps: searchProps }) => {
  const {
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
  } = searchProps;

  return (
    <div className="w-full gap-2 lg:flex hidden flex-col  relative mt-[20px]  min-h-[20vh]  ">
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

export default LargeScreenSearch;

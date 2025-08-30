"use client";

import InputWithIcon from "@/components/common/input-fields/input-with-icon";
import LocationInput from "@/components/common/input-fields/location-input";
import NormalSelector from "@/components/common/selectors/normal-selector";
import { Button } from "@/components/ui/button";
import { MapPin, Search, X } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import React, { useState } from "react";
import { searchProps } from "./searchProps";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SmallScreenSearch = ({ searchProps }: { searchProps: searchProps }) => {
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
    <Accordion className="w-full  lg:hidden flex" type="single" collapsible>
      <AccordionItem className="w-full" value="item-1">
        <AccordionTrigger >
          <div className="flex w-full ">
            <span className="text-gray-500 text-[16px]  ">
              Filters
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="w-full  md:hidden flex">
          <div className=" flex-col w-full relative   min-h-[20vh]  ">
            <div className="flex w-full flex-col items-end ">
              <div className="w-full ">
                <InputWithIcon
                  label=""
                  icon={<Search size={18} className="text-gray-500" />}
                  placeholder="Search for jobs, companies, or skills"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="w-full">
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
            </div>
            <div className="flex w-full flex-col items-end">
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
              <div className="flex w-full mt-2 flex-col gap-2">
                <Button
                  onClick={handleClearFilters}
                  className="h-[45px] w-full cursor-pointer "
                  variant="outline"
                >
                  <span className="text-red-500">Clear Filters</span>
                </Button>
                <Button
                  onClick={handleJobSearch}
                  className="h-[45px] w-full"
                  variant="default"
                >
                  <Search size={16} className="text-white" />
                  <span className="text-white">Search Jobs</span>
                </Button>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SmallScreenSearch;

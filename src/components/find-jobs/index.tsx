"use client";

import React from "react";
import FindJobsHeader from "./header";
import { parseAsString, useQueryState } from "nuqs";
import { Bot, FileSearch2, FileUser } from "lucide-react";
import SidePanel from "../common/side-panel";
import JobSearch from "./main-panel/job-search";

const FindJobs = () => {
  const [activeItem, setActiveItem] = useQueryState(
    "activeItem",
    parseAsString.withDefault("Job Search")
  );

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
      <FindJobsHeader />
      <div className="flex-1 gap-5 flex flex-row">
        <SidePanel
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          menuItems={menuItems}
        />
        <div className="flex-1 flex-col">
          <div className="rounded-[10px] w-full pl-4 mb-[10px]">
            {activeItem === "Job Search" && <JobSearch />}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;

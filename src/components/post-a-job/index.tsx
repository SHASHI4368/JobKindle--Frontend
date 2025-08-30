"use client";

import React from "react";
import PostAJobHeader from "./header";
import { parseAsString, useQueryState } from "nuqs";
import NewJob from "./main-panel/new-job";
import { Briefcase, FileUser } from "lucide-react";
import SidePanel from "../common/side-panel";

const PostAJob = () => {
  const [activeItem, setActiveItem] = useQueryState(
    "activeItem",
    parseAsString.withDefault("New Job")
  );

  const menuItems = [
    {
      title: "New Job",
      icon: <Briefcase size={18} />,
      description: "Create a new job posting",
    },
    {
      title: "Applications",
      icon: <FileUser size={18} />,
      description: "Manage job applications",
    },
  ];
  
  return (
    <div className="w-full gap-4 mb-[20px] flex flex-col xl:px-[10vw] px-[5vw]">
      {/* <PostAJobHeader /> */}
      <div className="flex-1 gap-5 mt-[20px] flex flex-col md:flex-row">
        <SidePanel
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          menuItems={menuItems}
        />
        <div className="flex-1 rounded-[10px] w-full border border-gray-100 shadow-lg bg-white p-4 mb-[10px]">
          {activeItem === "New Job" && <NewJob />}
        </div>
      </div>
    </div>
  );
};

export default PostAJob;

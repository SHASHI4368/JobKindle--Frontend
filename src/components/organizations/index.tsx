"use client";

import React from 'react'
import OrganizationHeader from './header';
import SidePanel from './side-panel';
import { parseAsString, useQueryState } from 'nuqs';
import CreateOrganization from './main-panel/create-organization';
import ViewOrganization from './main-panel/view-organization';

const Organizations = () => {
 const [activeItem, setActiveItem] = useQueryState(
   "activeItem",
   parseAsString.withDefault("Create")
 );
  return (
    <div className="w-full gap-5  flex flex-col xl:px-[10vw] px-[5vw]">
      <OrganizationHeader />
      <div className="flex lg:flex-row flex-col gap-5">
        <SidePanel />
        <div className="flex-1 p-4 min-h-[500px] border border-gray-200 bg-white shadow-lg mb-[20px] rounded-[10px]">
          {/* Main content area */}
          {activeItem === "Create" && <CreateOrganization />}
          {activeItem === "View" && <ViewOrganization />}
        </div>
      </div>
    </div>
  );
}

export default Organizations
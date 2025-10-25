"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { Building2, EditIcon, Plus } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';

const OrganizationHeader = () => {
  const [activeItem, setActiveItem] = useQueryState(
    "activeItem",
    parseAsString.withDefault("Create")
  );
  return (
    <div className="flex flex-row w-full">
      <div className="w-full px-[20px] md:flex hidden flex-row  items-center justify-between mt-[20px] border border-gray-200 bg-white h-[20vh] shadow-lg rounded-[10px] ">
        <div className="flex flex-row gap-4 items-center">
          <Building2 size={40} className="text-gray-600" />
          <div className="flex flex-col justify-items-center-safe">
            <h1 className="font-raleway text-[20px] font-[600] ">
              Organization Management
            </h1>
            <p className="font-raleway text-[14px] font-[400] text-gray-500">
              Manage your organizations and post jobs
            </p>
          </div>
        </div>
        <Button
          onClick={() => setActiveItem("Create")}
          variant={"default"}
          className="cursor-pointer"
        >
          {/* You can add an icon here if needed */}
          <Plus className="ml-2" />
          <span className="text-[14px] font-semibold">Create Organization</span>
        </Button>
      </div>
      <div className="w-full px-[20px] md:hidden flex flex-col gap-4 items-start justify-center mt-[20px] border border-gray-200 bg-white h-[20vh] shadow-lg rounded-[10px] ">
        <div className="flex flex-row gap-4 items-center">
          <Building2  className="text-gray-600  " />
          <div className="flex flex-col justify-items-center-safe">
            <h1 className="font-raleway sm:text-[20px] text-[18px] font-[600] ">
              Organization Management
            </h1>
            <p className="font-raleway sm:text-[14px] text-[12px] font-[400] text-gray-500">
              Manage your organizations and post jobs
            </p>
          </div>
        </div>
        <Button
          onClick={() => setActiveItem("Create")}
          variant={"default"}
          className="cursor-pointer w-full"
        >
          {/* You can add an icon here if needed */}
          <Plus className="ml-2" />
          <span className="text-[14px] font-semibold">Create Organization</span>
        </Button>
      </div>
    </div>
  );
}

export default OrganizationHeader
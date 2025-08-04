import React from "react";
import SidePanelItem from "./SidePanelItem";

const SidePanel = () => {
  return (
    <div className="flex h-fit flex-col gap-4 p-4 w-[30%] border border-gray-200 bg-white shadow-lg rounded-[10px]">
      <div className="flex flex-col justify-items-center-safe">
        <h1 className="font-raleway text-[18px] font-[600] ">
          Your Organizations
        </h1>
        <p className="font-raleway text-[14px] font-[400] text-gray-500">
          Select an organization to manage
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {/* Example items, replace with dynamic data */}
        <SidePanelItem
          imageUrl="/images/company-logo-1.png"
          organizationName="Tech Innovators"
          industry="Technology"
        />
      </div>
    </div>
  );
};

export default SidePanel;

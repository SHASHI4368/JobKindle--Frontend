import React from "react";
import SidePanelItem from "./SidePanelItem";
import { OrgProps } from "@/types/organization";
import { useDispatch, useSelector } from "react-redux";

const SidePanel = () => {
  const organization = useSelector((state: any) => state.organization);
  const dispatch = useDispatch();
  return (
    <div className="flex h-fit flex-col gap-4 p-4 lg:w-[30%] w-full border border-gray-200 bg-white shadow-lg rounded-[10px]">
      <div className="flex flex-col justify-items-center-safe">
        <h1 className="font-raleway text-[18px] font-[600] ">
          Your Organizations
        </h1>
        <p className="font-raleway text-[14px] font-[400] text-gray-500">
          Select an organization to manage
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {organization.myOrganizations &&
          organization.myOrganizations.map((org: OrgProps) => (
            <SidePanelItem
              key={org.orgId}
              orgId={org.orgId}
              imageUrl={org.organizationLogo}
              organizationName={org.organizationName}
              industry={org.industry}
            />
          ))}
      </div>
    </div>
  );
};

export default SidePanel;

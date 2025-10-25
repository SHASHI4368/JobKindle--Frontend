"use client";

import React, { useEffect, useState } from "react";
import OrganizationHeader from "./header";
import SidePanel from "./side-panel";
import { parseAsString, useQueryState } from "nuqs";
import CreateOrganization from "./main-panel/create-organization";
import ViewOrganization from "./main-panel/view-organization";
import Cookies from "js-cookie";
import { getAllOrganizations } from "@/actions/organizationActions";
import { OrgProps } from "@/types/organization";
import { useDispatch, useSelector } from "react-redux";
import { setOrganizationMyOrganizations } from "@/redux/features/organizationSlice";


const Organizations = () => {
  const [loading, setLoading] = useState(false);
  const organization = useSelector((state: any) => state.organization);
  const dispatch = useDispatch();

  const [activeItem, setActiveItem] = useQueryState(
    "activeItem",
    parseAsString.withDefault("Create")
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const jwt = Cookies.get("jwt");
        if (jwt) {
          const data = await getAllOrganizations(jwt);
          if (data.success) {
            dispatch(setOrganizationMyOrganizations(data.data));
          }
        }
      } catch (error) {
        console.log("Error fetching organizations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            {/* Loading spinner */}
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

            {/* Transition text */}
            <div className="text-primary font-semibold text-lg animate-pulse">
              Loading ...
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full gap-5  flex flex-col xl:px-[10vw] px-[5vw]">
        <OrganizationHeader />
        <div className="flex lg:flex-row flex-col gap-5">
          <SidePanel/>
          <div className="flex-1 p-4 min-h-[500px] border border-gray-200 bg-white shadow-lg mb-[20px] rounded-[10px]">
            {/* Main content area */}
            {activeItem === "Create" && <CreateOrganization />}
            {activeItem === "View" && <ViewOrganization />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Organizations;

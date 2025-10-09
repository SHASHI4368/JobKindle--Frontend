"use client";

import { parseAsString, useQueryState } from "nuqs";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { getOrganizationDetails } from "@/actions/organizationActions";
import { useDispatch } from "react-redux";
import { setSelectedOrganization } from "@/redux/features/organizationSlice";
import toast from "react-hot-toast";

type SidePanelItemProps = {
  orgId: number;
  imageUrl: string;
  organizationName: string;
  industry: string;
};

const SidePanelItem = ({
  orgId,
  imageUrl,
  organizationName,
  industry,
}: SidePanelItemProps) => {
  const [activeItem, setActiveItem] = useQueryState(
    "activeItem",
    parseAsString.withDefault("Create")
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async () => {
    const jwt = Cookies.get("jwt");
    try {
      if (jwt) {
        setLoading(true);
        const response = await getOrganizationDetails(jwt, orgId);
        if (response.success) {
          dispatch(setSelectedOrganization(response.data));
          setActiveItem("View");
        } else {
          console.log(
            "Failed to fetch organization details:",
            response.message
          );
        }
      }
    } catch (err) {
      toast.error(
        "An unexpected error occurred while fetching organization details."
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
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
      <div
        className="flex flex-row p-4 rounded-[10px] border items-center border-gray-200 hover:border-primary/40 hover:bg-gray-50 cursor-pointer transition-all duration-200"
        onClick={() => {
          setActiveItem("View");
          handleClick();
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={organizationName}
            className="w-10 h-10 rounded-full mr-4"
          />
        )}
        <div className="flex flex-col">
          <span className="font-raleway font-[600] text-[16px] ">
            {organizationName}
          </span>
          <span className="font-raleway text-[14px] text-gray-500">
            {industry}
          </span>
        </div>
      </div>
    </>
  );
};

export default SidePanelItem;

"use client";

import React, { useEffect, useState } from "react";
import Picture from "./Picture";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import IsEditDialog from "../dialogs/IsEditDialog";
import { useDispatch, useSelector } from "react-redux";
import { setIsProfileEditing } from "@/redux/features/accountSlice";
import { fetchProfileData } from "@/actions/profileActions";
import Cookies from "js-cookie";

const AccountHeader = () => {
  const account = useSelector((state: any) => state.account);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const isEditing = sessionStorage.getItem("isEditing");
    if (isEditing) {
      dispatch(setIsProfileEditing(JSON.parse(isEditing)));
    }
  }, [dispatch]);

  useEffect(() => {
    setFirstName(account.profile.firstname || "John");
    setLastName(account.profile.lastname || "Doe");
    setJobTitle(account.profile.jobTitle || "johndoe@example.com");
    setLocation(account.profile.location || "New York, USA");
  }, [account.profile]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const jwt = Cookies.get("jwt");
      if (jwt) {
        try {
          setLoading(true);
          const data = await fetchProfileData(jwt);
          if (data.success) {
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
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
      <div className="w-full px-[20px] flex md:flex-row flex-col items-center justify-between mt-[20px] border border-gray-200 bg-white md:h-[20vh] shadow-lg md:py-0 py-[20px] rounded-[10px] ">
        <Picture />
        <div className="md:w-[150px] w-full md:mt-0 mt-[10px] flex flex-row md:justify-end justify-center">
          <IsEditDialog />
        </div>
      </div>
    </>
  );
};

export default AccountHeader;

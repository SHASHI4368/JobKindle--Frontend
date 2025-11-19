"use client"

import React, { useEffect, useState } from 'react'
import AccountHeader from './header';
import Profile from './main-panel/profile';
import { parseAsString, useQueryState } from 'nuqs';
import Professional from './main-panel/professional';
import Documents from './main-panel/documents';
import Organizations from './main-panel/organizations';
import { User, Briefcase, FileText, Building2 } from "lucide-react";
import SidePanel from '../common/side-panel';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { fetchProfileData } from '@/actions/profileActions';
import { setProfileDetails } from '@/redux/features/accountSlice';

const Account = () => {
  const [activeItem, setActiveItem] = useQueryState(
    "activeItem",
    parseAsString.withDefault("Profile")
  );
  const [loading, setLoading] = useState(false);
  const account = useSelector((state: any) => state.account);
  const dispatch = useDispatch();

   useEffect(() => {
     const fetchData = async () => {
       const jwt = Cookies.get("jwt");
       if (jwt) {
         try {
           setLoading(true);
           const data = await fetchProfileData(jwt);
           if (data.success) {
              dispatch(setProfileDetails({
                email: data.data.email || "",
                firstname: data.data.firstname || "",
                lastname: data.data.lastname || "",
                location: data.data.location || "",
                phone: data.data.phone || "",
                profilePic: data.data.profilePic || null,
                jobTitle: data.data.jobTitle || "",
                bio: data.data.bio || "",
                linkedin: data.data.linkedin || "",
                experience: data.data.experience || [],
                education: data.data.education || [],
                githubUrl: data.data.githubUrl || "",
                resume: data.data.resume || null,
              }));
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

  const menuItems = [
    {
      title: "Profile",
      icon: <User size={18} />,
      description: "Personal information",
    },
    {
      title: "Professional",
      icon: <Briefcase size={18} />,
      description: "Work and education details",
    },
    {
      title: "Documents",
      icon: <FileText size={18} />,
      description: "Manage your documents",
    },
    {
      title: "Organization",
      icon: <Building2 size={18} />,
      description: "Manage your organizations",
    },
  ];

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
      <AccountHeader />
      <div className="flex-1 gap-5 flex flex-col lg:flex-row">
        <SidePanel
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          menuItems={menuItems}
        />
        <div className="flex-1 rounded-[10px] w-full border border-gray-100 shadow-lg bg-white p-4 mb-[10px]">
          {activeItem === "Profile" && <Profile />}
          {activeItem === "Professional" && <Professional />}
          {activeItem === "Documents" && <Documents />}
          {activeItem === "Organization" && <Organizations />}
        </div>
      </div>
    </div>
    </>
  ); 
}

export default Account
"use client"

import React from 'react'
import AccountHeader from './header';
import Profile from './main-panel/profile';
import { parseAsString, useQueryState } from 'nuqs';
import Professional from './main-panel/professional';
import Documents from './main-panel/documents';
import Organizations from './main-panel/organizations';
import { User, Briefcase, FileText, Building2 } from "lucide-react";
import SidePanel from '../common/side-panel';

const Account = () => {
  const [activeItem, setActiveItem] = useQueryState(
    "activeItem",
    parseAsString.withDefault("Profile")
  );

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
    <div className="w-full gap-5  flex flex-col xl:px-[10vw] px-[5vw]">
      <AccountHeader />
      <div className="flex-1 gap-5 flex flex-row">
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
  ); 
}

export default Account
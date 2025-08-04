"use client"

import React from 'react'
import AccountHeader from './header';
import SidePanel from './side-panel';
import Profile from './main-panel/profile';
import { parseAsString, useQueryState } from 'nuqs';
import Professional from './main-panel/professional';
import Documents from './main-panel/documents';
import Organizations from './main-panel/organizations';

const Account = () => {
  const [activeItem, setActiveItem] = useQueryState(
    "activeItem",
    parseAsString.withDefault("Profile")
  );
  return (
    <div className="w-full gap-5  flex flex-col xl:px-[10vw] px-[5vw]">
      <AccountHeader />
      <div className="flex-1 gap-5 flex flex-row">
        <SidePanel />
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
import React from 'react'
import AccountHeader from './header';
import SidePanel from './side-panel';
import Profile from './main-panel/profile';

const Account = () => {
  return (
    <div className="w-full gap-5  flex flex-col xl:px-[10vw] px-[5vw]">
      <AccountHeader />
      <div className="flex-1 gap-5 flex flex-row">
        <SidePanel />
        <div className="flex-1 rounded-[10px] w-full border border-gray-100 shadow-lg bg-white p-4 mb-[10px]">
          <Profile />
        </div>
      </div>
    </div>
  ); 
}

export default Account
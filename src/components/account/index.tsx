import React from 'react'
import AccountHeader from './header';
import SidePanel from './side-panel';

const Account = () => {
  return (
    <div className="w-full gap-5  flex flex-col xl:px-[10vw] px-[5vw]">
      <AccountHeader />
      <div className="flex-1 flex flex-row">
        <SidePanel />
        <div className="flex-1 rounde p-4">Main Content</div>
      </div>
    </div>
  );
}

export default Account
import React from 'react'
import Picture from './Picture';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';

const AccountHeader = () => {
  return (
    <div className="w-full px-[20px] flex flex-row items-center justify-between mt-[20px] bg-white h-[20vh] shadow-sm rounded-[10px] ">
      <Picture />
      <Button variant={"outline"} className="cursor-pointer">
        {/* You can add an icon here if needed */}
        <EditIcon className="ml-2" />
        <span className="text-[14px] font-semibold">Edit Profile</span>
      </Button>
    </div>
  );
}

export default AccountHeader
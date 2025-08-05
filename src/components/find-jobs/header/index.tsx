"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { Briefcase,   ScanSearch,   Search,  } from 'lucide-react';
import SearchDialog from '../search-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { setJobSearchDialogOpen } from '@/redux/features/findJobsSlice';

const FindJobsHeader = () => {
  const findJobs = useSelector((state: any) => state.findJobs);
  const dispatch = useDispatch();

  const handleDialogOpen = () => {
    dispatch(setJobSearchDialogOpen(true));
  }
  
  return (
    <div className="w-full px-[20px] flex flex-row items-center justify-between mt-[20px] border border-gray-200 bg-white h-[20vh] shadow-lg rounded-[10px] ">
      <div className="flex flex-row gap-4 items-center">
        <ScanSearch size={40} className="text-gray-600" />
        <div className="flex flex-col justify-items-center-safe">
          <h1 className="font-raleway text-[20px] font-[600] ">Find Jobs</h1>
          <p className="font-raleway text-[14px] font-[400] text-gray-500">
            Explore opportunities that match your skills and interests
          </p>
        </div>
      </div>
      <Button
        onClick={handleDialogOpen}
        variant={"outline"}
        className="cursor-pointer text-primary"
      >
        {/* You can add an icon here if needed */}
        <Search className="text-primary" />
        <h1 className="text-[16px] text-primary font-semibold">Search Jobs</h1>
      </Button>
      <SearchDialog/>
    </div>
  );
}

export default FindJobsHeader
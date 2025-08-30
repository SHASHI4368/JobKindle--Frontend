import React from 'react'
import BasicInfo from './basic-info';
import JobDetails from './job-details';
import Skills from './skills';
import { Button } from '@/components/ui/button';
import { ArrowUpFromLine, Briefcase, Eye, X } from 'lucide-react';


const NewJob = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center space-x-3">
        {/* Icon */}
        <div
          className={`
          flex-shrink-0 p-2 rounded-lg transition-all duration-300
          bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary
        `}
        >
          <Briefcase />
        </div>

        {/* Text content */}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col">
            <span
              className={`
            font-semibold text-[18px] transition-colors duration-300 text-gray-800 group-hover:text-primary
            
          `}
            >
              Post a New Job
            </span>
            <span
              className={`
              text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
              
            `}
            >
              Fill in the details below to create a new job listing.
            </span>
          </div>
          <Button variant={"outline"} className="cursor-pointer">
            {/* You can add an icon here if needed */}
            <Eye className="text-primary" />
            <span className="text-[14px] text-primary font-semibold">
              Preview
            </span>
          </Button>
        </div>
      </div>
      <BasicInfo />
      <JobDetails />
      <Skills />
      <div className="md:flex hidden flex-row items-center justify-between">
        <Button variant="outline">
          <X className="text-red-500" />
          <span className="text-red-500">Cancel</span>
        </Button>
        <div className="flex flex-row gap-4 items-center">
          <Button variant="outline">Save as Draft</Button>
          <Button variant="default">
            <ArrowUpFromLine />
            <span className="">Post Job</span>
          </Button>
        </div>
      </div>
      <div className="md:hidden flex flex-col gap-2">
        <Button className="w-full" variant="outline">
          <X className="text-red-500" />
          <span className="text-red-500">Cancel</span>
        </Button>
        <div className="flex w-full flex-col gap-2 items-center">
          <Button className="w-full" variant="outline">
            Save as Draft
          </Button>
          <Button className="w-full" variant="default">
            <ArrowUpFromLine />
            <span className="">Post Job</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewJob
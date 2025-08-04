import React from 'react'
import BasicInfo from './basic-info';
import JobDetails from './job-details';
import Skills from './skills';
import { Button } from '@/components/ui/button';
import { ArrowUpFromLine, Briefcase, X } from 'lucide-react';


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
      </div>
      <BasicInfo />
      <JobDetails />
      <Skills />
      <div className="flex flex-row items-center justify-between">
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
    </div>
  );
}

export default NewJob
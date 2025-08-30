"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { Briefcase,  Eye,  } from 'lucide-react';

const PostAJobHeader = () => {
  
  return (
    <div className="w-full px-[20px] flex flex-row items-center justify-between mt-[20px] border border-gray-200 bg-white h-[20vh] shadow-lg rounded-[10px] ">
      <div className="flex flex-row gap-4 items-center">
        <Briefcase size={40} className="text-gray-600" />
        <div className="flex flex-col justify-items-center-safe">
          <h1 className="font-raleway text-[20px] font-[600] ">
            Post Jobs
          </h1>
          <p className="font-raleway text-[14px] font-[400] text-gray-500">
            Find the perfect candidate for your team
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default PostAJobHeader
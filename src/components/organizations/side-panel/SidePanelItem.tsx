"use client";

import { parseAsString, useQueryState } from 'nuqs';
import React from 'react'

type SidePanelItemProps = {
 imageUrl?: string;
 organizationName: string;
 industry: string;
}

const SidePanelItem = ({ imageUrl, organizationName, industry }: SidePanelItemProps) => {
 const [activeItem, setActiveItem] = useQueryState(
   "activeItem",
   parseAsString.withDefault("Create")
 );
  return (
    <div className='flex flex-row p-4 rounded-[10px] border items-center border-gray-200 hover:border-primary/40 hover:bg-gray-50 cursor-pointer transition-all duration-200' onClick={() => setActiveItem("View")}>
      {imageUrl && <img src={imageUrl} alt={organizationName} className='w-10 h-10 rounded-full mr-4' />}
      <div className='flex flex-col'>
        <span className='font-raleway font-[600] text-[16px] '>{organizationName}</span>
        <span className='font-raleway text-[14px] text-gray-500'>{industry}</span>
      </div>
    </div>
  )
}

export default SidePanelItem
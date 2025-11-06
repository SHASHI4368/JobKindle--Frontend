"use client";

import React, { useState } from "react";
import SidePanelItem from "./SidePanelItem";

import { parseAsString, useQueryState } from "nuqs";

type SidePanelProps = {
  activeItem?: any;
  setActiveItem?: any;
  menuItems: {
    title: string;
    icon: React.ReactNode;
    description: string;
  }[];
}

const SidePanel = ({ activeItem, setActiveItem, menuItems }: SidePanelProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleItemClick = (itemTitle: string) => {
    if (itemTitle === activeItem) return;

    setIsAnimating(true);
    setTimeout(() => {
      setActiveItem(itemTitle);
      console.log(`Selected: ${itemTitle}`);

      // Simulate content change animation
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    }, 100);
  };

  

  return (
    <div className="relative font-geist-sans w-full lg:w-[25%]">
      
      <div
        className={`
        w-full rounded-[10px] shadow-lg flex flex-col p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200
        transition-all duration-300 ${
          isAnimating ? "scale-98 opacity-90" : "scale-100 opacity-100"
        }
      `}
      >
        {/* Menu items */}
        <div className="flex flex-col space-y-1">
          {menuItems.map((item) => (
            <SidePanelItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              description={item.description}
              isActive={activeItem === item.title}
              onClick={() => handleItemClick(item.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;

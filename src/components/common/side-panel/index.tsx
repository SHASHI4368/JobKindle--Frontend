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
    <div className="relative w-[25%]">
      {/* Loading overlay for transitions */}
      {/* {isAnimating && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-[10px] z-10 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      )} */}

      {/* Main panel */}
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

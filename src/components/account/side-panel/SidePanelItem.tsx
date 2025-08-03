import React from 'react'

import { User, Shield, Bell, Lock, ChevronRight } from "lucide-react";

type SidePanelItemProps = {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  description?: string;
};

const SidePanelItem = ({
  title,
  icon,
  isActive,
  onClick,
  description,
}: SidePanelItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`
        group relative flex items-center justify-between p-4 rounded-xl cursor-pointer 
        transition-all duration-300 ease-in-out mb-2 last:mb-0
        ${
          isActive
            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg transform scale-105"
            : "hover:bg-white hover:shadow-md hover:scale-102 text-gray-700"
        }
      `}
    >
      {/* Left content */}
      <div className="flex items-center space-x-3">
        {/* Icon */}
        <div
          className={`
          flex-shrink-0 p-2 rounded-lg transition-all duration-300
          ${
            isActive
              ? "bg-white/20 text-white"
              : "bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary"
          }
        `}
        >
          {icon}
        </div>

        {/* Text content */}
        <div className="flex flex-col">
          <span
            className={`
            font-semibold text-sm transition-colors duration-300
            ${
              isActive ? "text-white" : "text-gray-800 group-hover:text-primary"
            }
          `}
          >
            {title}
          </span>
          {description && (
            <span
              className={`
              text-xs mt-1 transition-colors duration-300
              ${
                isActive
                  ? "text-white/80"
                  : "text-gray-500 group-hover:text-gray-600"
              }
            `}
            >
              {description}
            </span>
          )}
        </div>
      </div>

      

      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
      )}

      {/* Hover glow effect */}
      {!isActive && (
        <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </div>
  );
};

export default SidePanelItem
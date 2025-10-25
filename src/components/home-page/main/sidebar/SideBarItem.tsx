import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

interface SideBarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
  badge?: number;
  description?: string;
  isActive?: boolean;
}

const SideBarItem = ({ 
  icon, 
  label, 
  onClick, 
  variant = "default",
  badge,
  description,
  isActive = false
}: SideBarItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative w-full p-4 rounded-xl text-left overflow-hidden
        transition-all duration-300 ease-out transform
        ${isActive 
          ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 shadow-lg scale-[1.02]" 
          : variant === "danger" 
            ? "hover:bg-red-50 hover:border-red-200 border-2 border-transparent" 
            : "hover:bg-gray-50 hover:border-gray-200 border-2 border-transparent hover:shadow-md hover:scale-[1.01]"
        }
      `}
    >
      {/* Background animation */}
      <div className={`
        absolute inset-0 opacity-0 transition-opacity duration-300
        ${variant === "danger" 
          ? "bg-gradient-to-r from-red-50 to-red-100" 
          : "bg-gradient-to-r from-primary/5 to-secondary/5"
        }
        ${isHovered ? "opacity-100" : "opacity-0"}
      `}></div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`
            p-2 rounded-lg transition-all duration-300
            ${isActive 
              ? "bg-gradient-to-br from-primary to-secondary text-white shadow-md" 
              : variant === "danger" 
                ? "bg-red-100 text-red-600 group-hover:bg-red-200" 
                : "bg-gray-100 text-gray-600 group-hover:bg-primary group-hover:text-white"
            }
          `}>
            {icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`
                font-semibold text-[15px] font-raleway transition-colors duration-300
                ${isActive 
                  ? "text-primary" 
                  : variant === "danger" 
                    ? "text-red-700 group-hover:text-red-800" 
                    : "text-gray-800 group-hover:text-gray-900"
                }
              `}>
                {label}
              </span>
              
              {badge && badge > 0 && (
                <div className="bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-2 animate-pulse">
                  {badge > 99 ? '99+' : badge}
                </div>
              )}
            </div>
            
            {description && (
              <p className={`
                text-xs mt-1 transition-colors duration-300
                ${variant === "danger" 
                  ? "text-red-500 group-hover:text-red-600" 
                  : "text-gray-500 group-hover:text-gray-600"
                }
              `}>
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Arrow indicator */}
        <ChevronRight 
          size={16} 
          className={`
            transition-all duration-300 opacity-0 translate-x-2
            ${isHovered ? "opacity-60 translate-x-0" : ""}
            ${variant === "danger" ? "text-red-400" : "text-gray-400"}
          `} 
        />
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-r-full"></div>
      )}
    </button>
  );
};

export default SideBarItem;
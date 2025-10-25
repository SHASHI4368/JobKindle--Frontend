import React, { useState } from "react";

type NavigationItemProps = {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  icon?: React.ReactNode;
};

const NavigationItem = ({
  label,
  onClick,
  isActive = false,
  icon,
}: NavigationItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer group"
    >
      {/* Main navigation item */}
      <div
        className={`
        flex items-center gap-2 xl:px-4 px-1 py-2 rounded-xl font-raleway text-[14px] font-[500] 
        transition-all duration-300 ease-in-out transform
        ${
          isActive
            ? "text-white bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25"
            : "text-gray-700 hover:text-primary hover:bg-gray-50"
        }
        ${isHovered ? "scale-105 -translate-y-0.5" : "scale-100"}
      `}
      >
        {/* Icon if provided */}
        {icon && (
          <span
            className={`transition-all duration-300 ${
              isActive ? "text-white" : "text-gray-500 group-hover:text-primary"
            }`}
          >
            {icon}
          </span>
        )}

        {/* Label */}
        <span className="relative xl:text-[14px] text-[12px] ">
          {label}

          {/* Animated underline */}
          <span
            className={`
            absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary
            transition-all duration-300 ease-out
            ${isHovered && !isActive ? "w-full opacity-100" : "w-0 opacity-0"}
          `}
          ></span>
        </span>
      </div>

      {/* Glow effect for active state */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-lg opacity-20 -z-10"></div>
      )}

      {/* Hover ripple effect */}
      {isHovered && !isActive && (
        <div className="absolute inset-0 bg-primary/5 rounded-xl animate-ping"></div>
      )}
    </div>
  );
};

export default NavigationItem;

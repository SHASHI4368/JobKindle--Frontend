"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

type PasswordWithIconProps = {
  label: string;
  icon: React.ReactNode;
  placeholder?: string;

  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordWithIcon = ({
  label,
  icon,
  placeholder = "",
  value = "",
  onChange = () => {},
}: PasswordWithIconProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col w-full gap-2 font-raleway">
      <Label className="sm:text-[14px] text-[12px] text-gray-700">
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            {icon}
          </span>
        )}
        <Input
          className="pl-[40px] md:h-[45px] h-[40px] md:text-[16px] text-[14px]"
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          value={value ?? ""} // ensure it's never undefined
          onChange={onChange}
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
          {showPassword ? (
            <EyeOff
              size={18}
              className="text-gray-500"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <Eye
              size={18}
              className="text-gray-500"
              onClick={togglePasswordVisibility}
            />
          )}
        </span>
      </div>
    </div>
  );
};


export default PasswordWithIcon;

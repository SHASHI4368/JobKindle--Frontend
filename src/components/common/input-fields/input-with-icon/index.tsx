import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type InputWithIconProps = {
  label: string;
  icon: React.ReactNode;
  placeholder?: string;
  type?: string;
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
};

const InputWithIcon = ({
  label,
  icon,
  placeholder = "",
  type = "text",
  value = "",
  onChange = () => {},
  isDisabled = false,
}: InputWithIconProps) => {
  return (
    <div className="flex flex-col w-full gap-2 font-geist-sans">
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
          type={type}
          value={value ?? ""} // ensure it's never undefined
          onChange={onChange}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default InputWithIcon;

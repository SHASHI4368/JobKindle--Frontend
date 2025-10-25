import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type NormalInputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
};

const NormalInput = ({
  label,
  placeholder = "",
  type = "text",
  value = "",
  onChange = () => {},
  isDisabled = false,
}: NormalInputProps) => {
  return (
    <div className="flex flex-col w-full gap-2 font-raleway">
      <Label className="sm:text-[14px] text-[12px] text-gray-700">
        {label}
      </Label>
      <div>
        <Input
          className=" md:h-[45px] h-[40px]   md:text-[16px] text-[14px]"
          placeholder={placeholder}
          type={type}
          value={value ?? ""}
          onChange={onChange}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default NormalInput;

import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NormalSelectorProps = {
  label: string;
  placeholder?: string;
  value: any;
  items: { label: string; value: string }[];
  onChange?: (value: string) => void;
  isDisabled?: boolean;
};

const NormalSelector = ({
  label,
  placeholder = "",
  value = "",
  items = [],
  onChange = () => {},
  isDisabled = false,
}: NormalSelectorProps) => {
  return (
    <div className="flex flex-col w-full  gap-2 font-geist-sans">
      <Label className="sm:text-[14px] text-[12px] text-gray-700">
        {label}
      </Label>
      <div className="">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            disabled={isDisabled}
            className="w-full md:text-[16px] text-[14px] md:min-h-[45px] min-h-[40px]"
          >
            <SelectValue
              className="md:text-[16px] text-[14px] md:h-[60px] h-[40px]"
              placeholder={placeholder}
            />
          </SelectTrigger>
          <SelectContent className="z-[1000]">
            {items.map((item, index) => (
              <SelectItem
                key={index}
                value={item.value}
                className=" text-gray-500 font-geist-sans md:text-[16px] text-[14px] min-h-[45px]"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default NormalSelector;

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
};

const NormalSelector = ({
  label,
  placeholder = "",
  value = "",
  items = [],
  onChange = () => {},
}: NormalSelectorProps) => {
  return (
    <div className="flex flex-col w-full  gap-2 font-raleway">
      <Label className="sm:text-[14px] text-[12px] text-gray-700">
        {label}
      </Label>
      <div className="">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full  md:min-h-[45px] min-h-[40px]">
            <SelectValue
              className="sm:text-[18px]  text-[14px] md:h-[60px] h-[40px]"
              placeholder={placeholder}
            />
          </SelectTrigger>
          <SelectContent className="z-[1000]">
            {items.map((item, index) => (
              <SelectItem
                key={index}
                value={item.value}
                className="sm:text-[14px]  text-gray-500 font-raleway text-[14px] min-h-[45px]"
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

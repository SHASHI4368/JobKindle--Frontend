import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

type NormalTextAreaProps = {
  label: string;
  placeholder?: string;
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows: number;
  cols?: number;
};

const NormalTextArea = ({
  label,
  placeholder = "",
  value = "",
  onChange = () => {},
  rows,
  cols = 50,
}: NormalTextAreaProps) => {
  return (
    <div className="flex flex-col w-full gap-2 font-raleway">
      <Label className="sm:text-[14px] text-[12px] text-gray-700">
        {label}
      </Label>
      <div >
        <Textarea
          className="md:h-[100px] min-h-[40px] md:text-[16px] text-[14px]"
          placeholder={placeholder}
          value={value ?? ""} 
          onChange={onChange}
          rows={rows}
          cols={cols}
        />
      </div>
    </div>
  );
};

export default NormalTextArea;

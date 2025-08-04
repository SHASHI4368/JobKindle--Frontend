"use client";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const formatDate = (date: Date | undefined) => {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};



type CalendarInputProps = {
  label: string;
  placeholder?: string;
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
};


const CalendarInput = ({ label, placeholder, date, onDateChange }: CalendarInputProps) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));

  return (
    <div className="flex flex-col w-full gap-2 font-raleway">
      <Label
        htmlFor="date"
        className="sm:text-[14px] text-[12px] text-gray-700"
      >
        {label}
      </Label>
      <div className="relative flex gap-2">
        <Input
          value={value}
          placeholder={placeholder}
          className="md:h-[45px] h-[40px] sm:text-[18px] text-[14px]"
          disabled
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-4 text-primary " />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                onDateChange?.(date);
                setValue(formatDate(date));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CalendarInput;

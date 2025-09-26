import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { separateThousandsByComma } from "@/utils/number-formatters/numberFormatters";
import React from "react";

type MoneyInputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currencySymbol?: string;
  isRange?: boolean;
  minValue?: string | number;
  maxValue?: string | number;
  onMinChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minPlaceholder?: string;
  maxPlaceholder?: string;
};

const MoneyInput = ({
  label,
  placeholder = "",
  type = "text",
  value = "",
  onChange = () => {},
  currencySymbol,
  isRange = false,
  minValue = "",
  maxValue = "",
  onMinChange = () => {},
  onMaxChange = () => {},
  minPlaceholder = "Min amount",
  maxPlaceholder = "Max amount",
}: MoneyInputProps) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/,/g, ""); // Remove existing commas
    const numericValue = inputValue.replace(/[^0-9.]/g, ""); // Only allow numbers and decimal

    if (numericValue === "" || !isNaN(Number(numericValue))) {
      const formattedValue = numericValue
        ? separateThousandsByComma(Number(numericValue))
        : "";
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: formattedValue },
      };
      onMinChange(syntheticEvent);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/,/g, ""); // Remove existing commas
    const numericValue = inputValue.replace(/[^0-9.]/g, ""); // Only allow numbers and decimal

    if (numericValue === "" || !isNaN(Number(numericValue))) {
      const formattedValue = numericValue
        ? separateThousandsByComma(Number(numericValue))
        : "";
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: formattedValue },
      };
      onMaxChange(syntheticEvent);
    }
  };

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/,/g, ""); // Remove existing commas
    const numericValue = inputValue.replace(/[^0-9.]/g, ""); // Only allow numbers and decimal

    if (numericValue === "" || !isNaN(Number(numericValue))) {
      const formattedValue = numericValue
        ? separateThousandsByComma(Number(numericValue))
        : "";
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: formattedValue },
      };
      onChange(syntheticEvent);
    }
  };

  if (isRange) {
    return (
      <div className="flex flex-col w-full gap-2 font-raleway">
        <Label className="sm:text-[14px] text-[12px] text-gray-700">
          {label}
        </Label>
        <div className="flex items-center gap-3">
          {/* Min Input */}
          <div className="flex-1 relative">
            {currencySymbol && (
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium z-10 bg-white">
                {currencySymbol}
              </span>
            )}
            <Input
              className={`md:h-[45px] h-[40px]  md:text-[16px] text-[14px] ${
                currencySymbol ? "pl-12" : ""
              }`}
              placeholder={minPlaceholder}
              type="text"
              value={minValue}
              onChange={handleMinChange}
            />
          </div>

          {/* Separator */}
          <span className="text-gray-500 font-medium text-sm">to</span>

          {/* Max Input */}
          <div className="flex-1 relative">
            {currencySymbol && (
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium z-10 bg-white">
                {currencySymbol}
              </span>
            )}
            <Input
              className={`md:h-[45px] h-[40px]  md:text-[16px] text-[14px]${
                currencySymbol ? "pl-12" : ""
              }`}
              placeholder={maxPlaceholder}
              type="text"
              value={maxValue}
              onChange={handleMaxChange}
            />
          </div>
        </div>
      </div>
    );
  }

  // Single input mode
  return (
    <div className="flex flex-col w-full gap-2 font-raleway">
      <Label className="sm:text-[14px] text-[12px] text-gray-700">
        {label}
      </Label>
      <div className="relative">
        {currencySymbol && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium z-10 bg-white">
            {currencySymbol}
          </span>
        )}
        <Input
          className={`md:h-[45px] h-[40px] sm:text-[18px] text-[14px] ${
            currencySymbol ? "pl-12" : ""
          }`}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={handleSingleChange}
        />
      </div>
    </div>
  );
};

export default MoneyInput;

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const formatNumberWithCommas = (value: string | number): string => {
    // Handle nullish or invalid inputs
    if (value === null || value === undefined || value === "") return "0";

    // Convert safely to number
    const numericValue = Number(String(value).replace(/,/g, ""));

    // If conversion fails, default to 0
    if (isNaN(numericValue)) return "0";

    const [integerPart, decimalPart] = String(value).split(".");

    // Format only the integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimalPart
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    let inputValue = e.target.value;

    // Remove all commas first
    inputValue = inputValue.replace(/,/g, "");

    // Allow empty string
    if (inputValue === "") {
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: "",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      callback(newEvent);
      return;
    }

    // Only allow numbers and one decimal point
    // Remove any non-numeric characters except decimal point
    const cleanValue = inputValue.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    const decimalCount = (cleanValue.match(/\./g) || []).length;
    let finalValue = cleanValue;

    if (decimalCount > 1) {
      // Keep only the first decimal point
      const firstDecimalIndex = cleanValue.indexOf(".");
      finalValue =
        cleanValue.slice(0, firstDecimalIndex + 1) +
        cleanValue.slice(firstDecimalIndex + 1).replace(/\./g, "");
    }

    // Don't format while typing (to avoid cursor jumping)
    // Just pass the clean numeric value
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: finalValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    callback(newEvent);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, onMinChange);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, onMaxChange);
  };

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, onChange);
  };

  if (isRange) {
    return (
      <div className="flex flex-col w-full gap-2 font-geist-sans">
        <Label className="sm:text-[14px] text-[12px] text-gray-700">
          {label}
        </Label>
        <div className="flex items-center gap-3">
          {/* Min Input */}
          <div className="flex-1 relative">
            {currencySymbol && (
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium z-10 bg-white pointer-events-none">
                {currencySymbol}
              </span>
            )}
            <Input
              className={`md:h-[45px] h-[40px] md:text-[16px] text-[14px] ${
                currencySymbol ? "pl-12" : ""
              }`}
              placeholder={minPlaceholder}
              type="text"
              value={formatNumberWithCommas(minValue)}
              onChange={handleMinChange}
            />
          </div>

          {/* Separator */}
          <span className="text-gray-500 font-medium text-sm">to</span>

          {/* Max Input */}
          <div className="flex-1 relative">
            {currencySymbol && (
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium z-10 bg-white pointer-events-none">
                {currencySymbol}
              </span>
            )}
            <Input
              className={`md:h-[45px] h-[40px] md:text-[16px] text-[14px] ${
                currencySymbol ? "pl-12" : ""
              }`}
              placeholder={maxPlaceholder}
              type="text"
              value={formatNumberWithCommas(maxValue)}
              onChange={handleMaxChange}
            />
          </div>
        </div>
      </div>
    );
  }

  // Single input mode
  return (
    <div className="flex flex-col w-full gap-2 font-geist-sans">
      <Label className="sm:text-[14px] text-[12px] text-gray-700">
        {label}
      </Label>
      <div className="relative">
        {currencySymbol && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium z-10 bg-white pointer-events-none">
            {currencySymbol}
          </span>
        )}
        <Input
          className={`md:h-[45px] h-[40px] sm:text-[18px] text-[14px] ${
            currencySymbol ? "pl-12" : ""
          }`}
          placeholder={placeholder}
          type={type}
          value={formatNumberWithCommas(value)}
          onChange={handleSingleChange}
        />
      </div>
    </div>
  );
};

export default MoneyInput;

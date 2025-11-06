import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect, useRef } from "react";
import { MapPin, Search, Loader2, X, GraduationCap } from "lucide-react";

type SchoolResult = {
  display_name: string;
  lat: string;
  lon: string;
  place_id: string;
};

type SchoolInputProps = {
  label: string;
  icon: React.ReactNode;
  placeholder?: string;
  type?: string;
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSchoolSearch?: boolean;
  onSchoolSelect?: (school: SchoolResult) => void;
  isDisabled?: boolean;
};

const SchoolInput = ({
  label,
  icon,
  placeholder = "",
  type = "text",
  value = "",
  onChange = () => {},
  isSchoolSearch = false,
  onSchoolSelect = () => {},
  isDisabled = false,
}: SchoolInputProps) => {
  const [searchResults, setSearchResults] = useState<SchoolResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search for locations using Nominatim API (OpenStreetMap)
  const searchLocations = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&addressdetails=1`,
        {
          headers: {
            "User-Agent": "JobKindle-App", // Required by Nominatim
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShowDropdown(data.length > 0);
      }
    } catch (error) {
      console.error("Error searching locations:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(e);

    if (isSchoolSearch) {
      // Clear previous timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      // Set new timeout for debounced search
      const newTimeout = setTimeout(() => {
        searchLocations(inputValue);
      }, 500); // 500ms delay

      setSearchTimeout(newTimeout);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location: SchoolResult) => {
    // Create a synthetic event to update the input value
    const syntheticEvent = {
      target: { value: location.display_name },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
    onSchoolSelect(location);
    setShowDropdown(false);
    setSearchResults([]);

    // Focus back to input
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // Clear search results
  const clearSearch = () => {
    setSearchResults([]);
    setShowDropdown(false);
    const syntheticEvent = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  return (
    <div
      className="flex flex-col w-full gap-2 font-geist-sans relative"
      ref={dropdownRef}
    >
      <Label className="sm:text-[14px] text-[12px] text-gray-700">
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
            <GraduationCap size={18} className="text-gray-400" />
          </span>
        )}

        <Input
          ref={inputRef}
          className={`${icon ? "pl-[40px]" : "pl-3"} ${
            isSchoolSearch && value ? "pr-[70px]" : "pr-3"
          } md:h-[45px] h-[40px] md:text-[16px] text-[14px]`}
          placeholder={placeholder}
          type={type}
          value={value ?? ""}
          onChange={handleInputChange}
          autoComplete={isSchoolSearch ? "off" : "on"}
          disabled={isDisabled}
        />

        {/* Loading spinner and clear button for location search */}
        {isSchoolSearch && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {isLoading && (
              <Loader2 size={16} className="text-primary animate-spin" />
            )}
            {value && !isLoading && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isDisabled}
              >
                <X size={14} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Location dropdown */}
      {isSchoolSearch && showDropdown && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {searchResults.map((location) => (
            <div
              key={location.place_id}
              onClick={() => handleLocationSelect(location)}
              className="flex items-start p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <GraduationCap
                size={16}
                className="text-primary mt-1 mr-3 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {location.display_name.split(",")[0]}
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {location.display_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {isSchoolSearch &&
        showDropdown &&
        searchResults.length === 0 &&
        !isLoading &&
        value &&
        value.length >= 3 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
            <div className="flex items-center text-gray-500">
              <Search size={16} className="mr-2" />
              <span className="text-sm">No locations found for "{value}"</span>
            </div>
          </div>
        )}
    </div>
  );
};

export default SchoolInput;

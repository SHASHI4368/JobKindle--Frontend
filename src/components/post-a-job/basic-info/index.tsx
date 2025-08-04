"use client";

import CurrencyInput, {
  CurrencyResult,
} from "@/components/common/input-fields/currency-input";
import LocationInput from "@/components/common/input-fields/location-input";
import MoneyInput from "@/components/common/input-fields/money-input";
import NormalInput from "@/components/common/input-fields/normal-input";
import NormalSelector from "@/components/common/selectors/normal-selector";
import { DollarSign, MapPin, SquareLibrary } from "lucide-react";
import React, { useEffect, useState } from "react";

const BasicInfo = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [salary, setSalary] = useState("");

  const companies = [
    { label: "TechCorp Inc.", value: "TechCorp Inc." },
    { label: "Innovatech Solutions", value: "Innovatech Solutions" },
    { label: "Global Tech Industries", value: "Global Tech Industries" },
  ];

  const workTypes = [
    { label: "Remote", value: "remote" },
    { label: "Onsite", value: "onsite" },
    { label: "Hybrid", value: "hybrid" },
  ];

  const experienceLevels = [
    { label: "Entry Level", value: "entry" },
    { label: "Mid Level", value: "mid" },
    { label: "Senior Level", value: "senior" },
    { label: "Executive", value: "executive" },
  ];

  const employmentTypes = [
    { label: "Full-time", value: "full-time" },
    { label: "Part-time", value: "part-time" },
    { label: "Contract", value: "contract" },
    { label: "Internship", value: "internship" },
  ];

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  const handleCompanyNameChange = (value: string) => {
    setCompanyName(value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleWorkTypeChange = (value: string) => {
    setWorkType(value);
  };

  const handleExperienceLevelChange = (value: string) => {
    setExperienceLevel(value);
  };

  const handleEmploymentTypeChange = (value: string) => {
    setEmploymentType(value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(e.target.value);
  };

  const handleCurrencySelect = (currencyResult: CurrencyResult) => {
    setCurrency(currencyResult.name);
    setCurrencySymbol(currencyResult.symbol);
  };

  const handleMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinSalary(e.target.value);
  };

  const handleMaxSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxSalary(e.target.value);
  };

 
  return (
    <div className="w-full px-[20px] flex flex-col gap-4 justify-between mt-[20px] border border-gray-200 bg-white shadow-lg rounded-[10px] p-4 ">
      <div className="flex flex-row items-center w-fit justify-start gap-2">
        <SquareLibrary size={25} className="text-blue-600" />
        <h1 className="font-raleway font-[600] text-[20px] ">
          Basic Information
        </h1>
      </div>
      <div className="flex w-full flex-row gap-4 items-center">
        <NormalInput
          label="Job Title"
          placeholder="Eg: Software Engineer"
          value={jobTitle}
          onChange={handleJobTitleChange}
        />
        <NormalSelector
          label="Company Name"
          items={companies}
          value={companyName}
          onChange={handleCompanyNameChange}
          placeholder="Eg: TechCorp Inc."
        />
      </div>
      <div className="flex w-full flex-row gap-4 items-center">
        <LocationInput
          icon={<MapPin size={18} className="text-gray-400" />}
          label="Location"
          placeholder="Enter your location"
          value={location}
          onChange={handleLocationChange}
          isLocationSearch={true}
          onLocationSelect={(selectedLocation) => {
            console.log("Selected:", selectedLocation);
            // selectedLocation contains: display_name, lat, lon, place_id
          }}
        />
        <NormalSelector
          label="Work Type"
          items={workTypes}
          value={workType}
          onChange={handleWorkTypeChange}
          placeholder="Select work type"
        />
      </div>
      <div className="flex w-full flex-row gap-4 items-center">
        <NormalSelector
          label="Experience Level"
          items={experienceLevels}
          value={experienceLevel}
          onChange={handleExperienceLevelChange}
          placeholder="Select experience level"
        />
        <NormalSelector
          label="Employment Type"
          items={employmentTypes}
          value={employmentType}
          onChange={handleEmploymentTypeChange}
          placeholder="Select employment type"
        />
      </div>
      <div className="flex w-full flex-row gap-4 items-center">
        <CurrencyInput
          label="Currency"
          placeholder="Enter Currency"
          value={currency}
          onChange={handleCurrencyChange}
          onCurrencySelect={handleCurrencySelect}
        />
        <MoneyInput
          value={salary}
          label="Salary"
          placeholder="Enter salary"
          isRange={true}
          minValue={minSalary}
          maxValue={maxSalary}
          onMinChange={handleMinSalaryChange}
          onMaxChange={handleMaxSalaryChange}
          minPlaceholder="Min Salary"
          maxPlaceholder="Max Salary"
          currencySymbol={currencySymbol}
          type="string"
        />
      </div>
    </div>
  );
};

export default BasicInfo;

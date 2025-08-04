"use client";

import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";
import CompanyLogo from "./CompanyLogo";
import NormalInput from "@/components/common/input-fields/normal-input";
import NormalSelector from "@/components/common/selectors/normal-selector";
import NormalTextArea from "@/components/common/text-areas/normal-textarea";
import InputWithIcon from "@/components/common/input-fields/input-with-icon";
import LocationInput from "@/components/common/input-fields/location-input";
import { Button } from "@/components/ui/button";

const CreateOrganization = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  const industries = [
    { value: "Technology", label: "Technology" },
    { value: "Finance", label: "Finance" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Education", label: "Education" },
    { value: "Retail", label: "Retail" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Other", label: "Other" },
  ];

  const companySizes = [
    { value: "1-10", label: "1-10" },
    { value: "11-50", label: "11-50" },
    { value: "51-200", label: "51-200" },
    { value: "201-500", label: "201-500" },
    { value: "501+", label: "501+" },
  ];

  const handleOrganizationNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrganizationName(e.target.value);
  };

  const handleIndustryChange = (value: string) => {
    setIndustry(value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleCompanySizeChange = (value: string) => {
    setCompanySize(value);
  };

  const handleFoundedYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoundedYear(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };

  const handleCancel = () => {
    // Logic to handle cancel action, e.g., reset form or navigate away
    setOrganizationName("");
    setIndustry("");
    setDescription("");
    setCompanySize("");
    setFoundedYear("");
    setEmail("");
    setPhone("");
    setLocation("");
    setWebsite("");
  };

  const handleSubmit = () => {
    // Logic to handle form submission
    console.log("Organization Created", {
      organizationName,
      industry,
      description,
      companySize,
      foundedYear,
      email,
      phone,
      location,
      website,
    });
    handleCancel(); // Reset form after submission
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center space-x-3">
        {/* Icon */}
        <div
          className={`
          flex-shrink-0 p-2 rounded-lg transition-all duration-300
          bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary
        `}
        >
          <Building2 />
        </div>

        {/* Text content */}
        <div className="flex flex-col">
          <span
            className={`
            font-semibold text-[18px] transition-colors duration-300 text-gray-800 group-hover:text-primary
            
          `}
          >
            Create Organization
          </span>
          <span
            className={`
              text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
              
            `}
          >
            Fill in the details to create your organization
          </span>
        </div>
      </div>
      <CompanyLogo />
      <div className="flex flex-row w-full gap-4 mt-[10px] items-center">
        <NormalInput
          label="Organization Name*"
          placeholder="Enter your organization name"
          value={organizationName}
          onChange={handleOrganizationNameChange}
        />
        <NormalSelector
          label="Industry*"
          placeholder="Select an industry"
          items={industries}
          value={industry}
          onChange={handleIndustryChange}
        />
      </div>
      <NormalTextArea
        label="Description*"
        placeholder="Enter a brief description of your organization"
        value={description}
        onChange={handleDescriptionChange}
        rows={4}
      />
      <div className="flex flex-row gap-4 items-center">
        <NormalSelector
          label="Company Size*"
          placeholder="Select company size"
          items={companySizes}
          value={companySize}
          onChange={handleCompanySizeChange}
        />
        <NormalInput
          label="Founded Year*"
          placeholder="Enter the year your organization was founded"
          value={foundedYear}
          onChange={handleFoundedYearChange}
          type="number"
        />
      </div>
      <div className="flex items-center gap-4">
        <InputWithIcon
          icon={<Mail size={18} className="text-gray-400" />}
          label="Email*"
          placeholder="Enter your organization email"
          value={email}
          onChange={handleEmailChange}
        />
        <InputWithIcon
          icon={<Phone size={18} className="text-gray-400" />}
          label="Phone*"
          placeholder="Enter your organization phone number"
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>
      <div className="flex items-center gap-4">
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
        <InputWithIcon
          icon={<Globe size={18} className="text-gray-400" />}
          label="Website*"
          placeholder="Enter your organization website"
          value={website}
          onChange={handleWebsiteChange}
        />
      </div>
      <div className="flex justify-between items-center py-[20px]">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="default" onClick={handleSubmit}>
          Create Organization
        </Button>
      </div>
    </div>
  );
};

export default CreateOrganization;

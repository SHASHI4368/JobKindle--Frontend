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
import { NewJobType } from "../types";
import Cookies from "js-cookie";
import { getAllOrganizations } from "@/actions/organizationActions";

const BasicInfo = ({
  jobData,
  setJobData,
}: {
  jobData: NewJobType;
  setJobData: React.Dispatch<React.SetStateAction<NewJobType>>;
}) => {
  const [myOrganizations, setMyOrganizations] = useState<
    { label: string; value: string }[]
  >([]);

  const getMyOrgs = async () => {
    const jwt = Cookies.get("jwt");
    try {
      if (jwt) {
        const data = await getAllOrganizations(jwt);
        console.log(data);
        if (data.success) {
          const formattedOrgs = data.data.map((org: any) => ({
            label: org.organizationName,
            value: org.orgId,
          }));
          console.log(formattedOrgs);
          setMyOrganizations(formattedOrgs);
        }
      }
    } catch (error) {
      console.log("Error fetching organizations:", error);
    }
  };

  useEffect(() => {
    getMyOrgs();
  }, []);

  const workTypes = [
    { label: "Remote", value: "Remote" },
    { label: "Onsite", value: "On-site" },
    { label: "Hybrid", value: "Hybrid" },
  ];

  const experienceLevels = [
    { label: "Entry Level", value: "Entry" },
    { label: "Mid Level", value: "Mid" },
    { label: "Senior Level", value: "Senior" },
    { label: "Executive", value: "Executive" },
  ];

  const employmentTypes = [
    { label: "Full-time", value: "Full-time" },
    { label: "Part-time", value: "Part-time" },
    { label: "Contract", value: "Contract" },
    { label: "Internship", value: "Internship" },
  ];

  const handleCurrencySelect = (currencyResult: CurrencyResult) => {
    setJobData({
      ...jobData,
      currency: { name: currencyResult.name, symbol: currencyResult.symbol },
    });
  };

  return (
    <div className="w-full px-[20px] flex flex-col gap-4 justify-between mt-[20px] border border-gray-200 bg-white  rounded-[10px] p-4 ">
      <div className="flex flex-row items-center w-fit justify-start gap-2">
        <SquareLibrary size={25} className="text-blue-600" />
        <h1 className="font-geist-sans font-[600] text-[20px] ">
          Basic Information
        </h1>
      </div>
      <div className="flex w-full md:flex-row flex-col gap-4 items-center">
        <NormalInput
          label="Job Title"
          placeholder="Eg: Software Engineer"
          value={jobData.title}
          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
        />
        <NormalSelector
          label="Company Name"
          items={myOrganizations}
          value={jobData.company.orgId}
          onChange={(value) => {
            setJobData({
              ...jobData,
              company: { ...jobData.company, orgId: parseInt(value) },
            });
            const selectedOrg = myOrganizations.find(
              (org: any) => org.value === parseInt(value)
            );
            if (selectedOrg) {
              setJobData({
                ...jobData,
                company: {
                  ...jobData.company,
                  name: selectedOrg.label,
                  orgId: parseInt(value),
                },
              });
            }
          }}
          placeholder="Eg: TechCorp Inc."
        />
      </div>
      <div className="flex w-full md:flex-row flex-col gap-4 items-center">
        <LocationInput
          icon={<MapPin size={18} className="text-gray-400" />}
          label="Location"
          placeholder="Enter your location"
          value={jobData.location}
          onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
          isLocationSearch={true}
          onLocationSelect={(selectedLocation) => {
            console.log("Selected:", selectedLocation);
            // selectedLocation contains: display_name, lat, lon, place_id
          }}
        />
        <NormalSelector
          label="Work Type"
          items={workTypes}
          value={jobData.workType}
          onChange={(value) => setJobData({ ...jobData, workType: value })}
          placeholder="Select work type"
        />
      </div>
      <div className="flex w-full md:flex-row flex-col gap-4 items-center">
        <NormalSelector
          label="Experience Level"
          items={experienceLevels}
          value={jobData.experienceLevel}
          onChange={(value) =>
            setJobData({ ...jobData, experienceLevel: value })
          }
          placeholder="Select experience level"
        />
        <NormalSelector
          label="Employment Type"
          items={employmentTypes}
          value={jobData.employmentType}
          onChange={(value) =>
            setJobData({ ...jobData, employmentType: value })
          }
          placeholder="Select employment type"
        />
      </div>
      <div className="flex w-full md:flex-row flex-col gap-4 items-center">
        <CurrencyInput
          label="Currency"
          placeholder="Enter Currency"
          value={jobData.currency.name}
          onChange={(e) =>
            setJobData({
              ...jobData,
              currency: { ...jobData.currency, name: e.target.value },
            })
          }
          onCurrencySelect={handleCurrencySelect}
        />
        <MoneyInput
          value={jobData.salary}
          label="Salary"
          placeholder="Enter salary"
          isRange={true}
          minValue={jobData.minSalary}
          maxValue={jobData.maxSalary}
          onMinChange={(e) =>
            setJobData({ ...jobData, minSalary: parseFloat(e.target.value) })
          }
          onMaxChange={(e) =>
            setJobData({ ...jobData, maxSalary: parseFloat(e.target.value) })
          }
          minPlaceholder="Min Salary"
          maxPlaceholder="Max Salary"
          currencySymbol={jobData.currency.symbol}
          type="string"
        />
      </div>
    </div>
  );
};

export default BasicInfo;

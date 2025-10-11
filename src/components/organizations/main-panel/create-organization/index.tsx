"use client";

import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import CompanyLogo from "../CompanyLogo";
import NormalInput from "@/components/common/input-fields/normal-input";
import NormalSelector from "@/components/common/selectors/normal-selector";
import NormalTextArea from "@/components/common/text-areas/normal-textarea";
import InputWithIcon from "@/components/common/input-fields/input-with-icon";
import LocationInput from "@/components/common/input-fields/location-input";
import { Button } from "@/components/ui/button";
import CancelDialog from "../../dialogs/CancelDialog";
import SubmitDialog from "@/components/common/dialogs/submit-dialog";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { createOrganization } from "@/actions/organizationActions";
import { useDispatch } from "react-redux";
import { addOrganization } from "@/redux/features/organizationSlice";

const CreateOrganization = () => {
  // const [organizationData, setOrganizationData] = useState({
  //   organizationName: "TechSpark Solutions",
  //   industry: "Technology",
  //   description:
  //     "A young startup focusing on AI-powered solutions for small businesses.",
  //   companySize: "11-50",
  //   foundedYear: "2021",
  //   email: "contact@techspark.io",
  //   phone: "+14151234567",
  //   location: "San Francisco, California, USA",
  //   website: "https://techspark.io",
  //   logoUrl: "",
  // });
  const [organizationData, setOrganizationData] = useState({
    organizationName: "",
    industry: "",
    description: "",
    companySize: "",
    foundedYear: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    logoUrl: "",
  });
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const dispatch = useDispatch();

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

  const handleCancel = () => {
    setOrganizationData({
      organizationName: "",
      industry: "",
      description: "",
      companySize: "",
      foundedYear: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      logoUrl: "",
    });
  };

  const handleSubmit = async () => {
    const jwt = Cookies.get("jwt") || "";
    const body = {
      companyEmail: organizationData.email,
      organizationName: organizationData.organizationName,
      organizationLogo: organizationData.logoUrl,
      industry: organizationData.industry,
      description: organizationData.description,
      companySize: organizationData.companySize,
      foundedYear: organizationData.foundedYear,
      companyPhone: organizationData.phone,
      companyLocation: organizationData.location,
      companyWebsite: organizationData.website,
    };
    console.log(body);
    try {
      const response = await createOrganization(jwt, body);
      if (response.success) {
        toast.success("Organization created successfully!");
        handleCancel();
        const org = {
          orgId: response.data.orgId,
          organizationName: response.data.organizationName,
          organizationLogo: response.data.organizationLogo,
          industry: response.data.industry,
        };
        dispatch(addOrganization(org));
        setSubmitDialogOpen(false);
      } else {
        toast.error(
          response.message || "Failed to create organization. Please try again."
        );
      }
    } catch (error) {
      console.error("Error creating organization:", error);
      toast.error("Failed to create organization. Please try again.");
    }
  };

  useEffect(() => {
    let disabled = false;
    // checks if any required field is empty
    if (
      !organizationData.organizationName ||
      !organizationData.industry ||
      !organizationData.description ||
      !organizationData.companySize ||
      !organizationData.foundedYear ||
      !organizationData.email ||
      !organizationData.phone ||
      !organizationData.location ||
      !organizationData.website
    ) {
      disabled = true;
    }
    setSubmitDisabled(disabled);
  }, [organizationData]);

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
      <CompanyLogo
        logoUrl={organizationData.logoUrl}
        setLogoUrl={(url) =>
          setOrganizationData({ ...organizationData, logoUrl: url })
        }
      />
      <div className="flex md:flex-row flex-col w-full gap-4 mt-[10px] items-center">
        <NormalInput
          label="Organization Name*"
          placeholder="Enter your organization name"
          value={organizationData.organizationName}
          onChange={(e) =>
            setOrganizationData({
              ...organizationData,
              organizationName: e.target.value,
            })
          }
        />
        <NormalSelector
          label="Industry*"
          placeholder="Select an industry"
          items={industries}
          value={organizationData.industry}
          onChange={(val) =>
            setOrganizationData({ ...organizationData, industry: val })
          }
        />
      </div>
      <NormalTextArea
        label="Description*"
        placeholder="Enter a brief description of your organization"
        value={organizationData.description}
        onChange={(e) =>
          setOrganizationData({
            ...organizationData,
            description: e.target.value,
          })
        }
        rows={4}
      />
      <div className="flex md:flex-row flex-col gap-4 items-center">
        <NormalSelector
          label="Company Size*"
          placeholder="Select company size"
          items={companySizes}
          value={organizationData.companySize}
          onChange={(val) =>
            setOrganizationData({ ...organizationData, companySize: val })
          }
        />
        <NormalInput
          label="Founded Year*"
          placeholder="Enter the year your organization was founded"
          value={organizationData.foundedYear}
          onChange={(e) =>
            setOrganizationData({
              ...organizationData,
              foundedYear: e.target.value,
            })
          }
          type="number"
        />
      </div>
      <div className="flex md:flex-row flex-col items-center gap-4">
        <InputWithIcon
          icon={<Mail size={18} className="text-gray-400" />}
          label="Email*"
          placeholder="Enter your organization email"
          value={organizationData.email}
          onChange={(e) =>
            setOrganizationData({ ...organizationData, email: e.target.value })
          }
        />
        <InputWithIcon
          icon={<Phone size={18} className="text-gray-400" />}
          label="Phone*"
          placeholder="Enter your organization phone number"
          value={organizationData.phone}
          onChange={(e) =>
            setOrganizationData({ ...organizationData, phone: e.target.value })
          }
        />
      </div>
      <div className="flex md:flex-row flex-col items-center gap-4">
        <LocationInput
          icon={<MapPin size={18} className="text-gray-400" />}
          label="Location"
          placeholder="Enter your location"
          value={organizationData.location}
          onChange={(e) =>
            setOrganizationData({
              ...organizationData,
              location: e.target.value,
            })
          }
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
          value={organizationData.website}
          onChange={(e) =>
            setOrganizationData({
              ...organizationData,
              website: e.target.value,
            })
          }
        />
      </div>
      <div className="sm:flex hidden justify-between items-center py-[20px]">
        <CancelDialog screenSize=" " handleCancel={handleCancel} />
        <SubmitDialog
          screenSize=" "
          handleSubmit={handleSubmit}
          submitText="Create Organization"
          submitLoadingText="Creating..."
          description="Are you sure you want to create this organization?"
          toastText="Organization created successfully!"
          open={submitDialogOpen}
          setOpen={setSubmitDialogOpen}
          disabled={submitDisabled}
          onTriggerClick={(e) => {
            e.preventDefault();
            if (!submitDisabled) {
              if (organizationData.logoUrl == "") {
                toast.error("Please upload a company logo.");
                return;
              }
              setSubmitDialogOpen(true);
            }
          }}
        />
      </div>
      <div className="sm:hidden flex gap-2 flex-col justify-between items-center py-[20px]">
        <SubmitDialog
          screenSize="w-full"
          handleSubmit={handleSubmit}
          submitText="Create Organization"
          submitLoadingText="Creating..."
          description="Are you sure you want to create this organization?"
          toastText="Organization created successfully!"
          open={submitDialogOpen}
          setOpen={setSubmitDialogOpen}
          disabled={submitDisabled}
          onTriggerClick={(e) => {
            e.preventDefault();
            if (!submitDisabled) {
              if (organizationData.logoUrl == "") {
                toast.error("Please upload a company logo.");
                return;
              }
              setSubmitDialogOpen(true);
            }
          }}
        />
        <CancelDialog screenSize="w-full" handleCancel={handleCancel} />
      </div>
    </div>
  );
};

export default CreateOrganization;

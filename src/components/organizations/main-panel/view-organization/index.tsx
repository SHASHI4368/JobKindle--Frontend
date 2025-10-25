"use client";

import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import NormalInput from "@/components/common/input-fields/normal-input";
import NormalSelector from "@/components/common/selectors/normal-selector";
import NormalTextArea from "@/components/common/text-areas/normal-textarea";
import InputWithIcon from "@/components/common/input-fields/input-with-icon";
import LocationInput from "@/components/common/input-fields/location-input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import CompanyLogo from "../CompanyLogo";
import IsEditDialog from "../../dialogs/IsEditDialog";
import { setSelectedOrganization } from "@/redux/features/organizationSlice";
import {
  getOrganizationDetails,
  updateOrganization,
} from "@/actions/organizationActions";
import { parseAsString, useQueryState } from "nuqs";
import toast from "react-hot-toast";
import SubmitDialog from "@/components/common/dialogs/submit-dialog";
import DeleteDialog from "../../dialogs/DeleteDialog";

const ViewOrganization = () => {
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
  const organization = useSelector((state: any) => state.organization);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [id, setId] = useQueryState("id", parseAsString.withDefault(""));
  const dispatch = useDispatch();

  useEffect(() => {
    const isEdit = sessionStorage.getItem("isOrgEditing");
    if (isEdit) {
      setIsEditing(JSON.parse(isEdit));
    }
  }, []);

  useEffect(() => {
    if (organization.selectedOrganization) {
      setOrganizationData({
        organizationName: organization.selectedOrganization.organizationName,
        industry: organization.selectedOrganization.industry,
        description: organization.selectedOrganization.description,
        companySize: organization.selectedOrganization.companySize,
        foundedYear: organization.selectedOrganization.foundedYear,
        email: organization.selectedOrganization.companyEmail,
        phone: organization.selectedOrganization.companyPhone,
        location: organization.selectedOrganization.companyLocation,
        website: organization.selectedOrganization.companyWebsite,
        logoUrl: organization.selectedOrganization.organizationLogo,
      });
    }
  }, [organization.selectedOrganization]);

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
    try {
      const response = await updateOrganization(jwt, Number(id), body);
      if (response.success) {
        toast.success("Organization updated successfully!");
        setSubmitDialogOpen(false);
        setIsEditing(false);
        sessionStorage.setItem("isOrgEditing", "false");
      } else {
        toast.error(
          response.message || "Failed to update organization. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating organization:", error);
      toast.error("Failed to update organization. Please try again.");
    }
  };

  const getOrganization = async () => {
    const jwt = Cookies.get("jwt");
    try {
      if (jwt) {
        setLoading(true);
        const response = await getOrganizationDetails(jwt, Number(id));
        if (response.success) {
          dispatch(setSelectedOrganization(response.data));
        } else {
          console.log(
            "Failed to fetch organization details:",
            response.message
          );
        }
      }
    } catch (err) {
      toast.error(
        "An unexpected error occurred while fetching organization details."
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getOrganization();
    }
  }, [id]);

  const checkEmpty = () => {
    if (organizationData.logoUrl == "") {
      toast.error("Please upload a company logo.");
      return false;
    }
    if (organizationData.organizationName == "") {
      toast.error("Please enter organization name.");
      return false;
    }
    if (organizationData.industry == "") {
      toast.error("Please select an industry.");
      return false;
    }
    if (organizationData.description == "") {
      toast.error("Please enter a description.");
      return false;
    }
    if (organizationData.companySize == "") {
      toast.error("Please select a company size.");
      return false;
    }
    if (organizationData.foundedYear == "") {
      toast.error("Please enter founded year.");
      return false;
    }
    if (organizationData.email == "") {
      toast.error("Please enter company email.");
      return false;
    }
    if (organizationData.phone == "") {
      toast.error("Please enter company phone.");
      return false;
    }
    if (organizationData.website == "") {
      toast.error("Please enter company website.");
      return false;
    }
    return true;
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            {/* Loading spinner */}
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

            {/* Transition text */}
            <div className="text-primary font-semibold text-lg animate-pulse">
              Loading ...
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col gap-4">
        <div className="md:flex hidden items-center justify-between flex-row">
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
          <div className="flex justify-end gap-4">
            <IsEditDialog
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              sessionStorageKey="isOrgEditing"
              editButtonClassName="Organization"
            />
            <DeleteDialog />
          </div>
        </div>
        <div className="md:hidden flex items-center justify-between flex-col gap-4">
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
          <div className="flex w-full flex-col justify-end gap-2">
            <IsEditDialog
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              sessionStorageKey="isOrgEditing"
              editButtonClassName="Organization"
            />
            <DeleteDialog />
          </div>
        </div>
        <CompanyLogo
          isDisabled={!isEditing}
          logoUrl={organizationData.logoUrl}
          setLogoUrl={(url) =>
            setOrganizationData({ ...organizationData, logoUrl: url })
          }
        />
        <div className="flex md:flex-row flex-col w-full gap-4 mt-[10px] items-center">
          <NormalInput
            label="Organization Name*"
            isDisabled={!isEditing}
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
            isDisabled={!isEditing}
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
          isDisabled={!isEditing}
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
            isDisabled={!isEditing}
            label="Company Size*"
            placeholder="Select company size"
            items={companySizes}
            value={organizationData.companySize}
            onChange={(val) =>
              setOrganizationData({ ...organizationData, companySize: val })
            }
          />
          <NormalInput
            isDisabled={!isEditing}
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
            isDisabled={!isEditing}
            icon={<Mail size={18} className="text-gray-400" />}
            label="Email*"
            placeholder="Enter your organization email"
            value={organizationData.email}
            onChange={(e) =>
              setOrganizationData({
                ...organizationData,
                email: e.target.value,
              })
            }
          />
          <InputWithIcon
            isDisabled={!isEditing}
            icon={<Phone size={18} className="text-gray-400" />}
            label="Phone*"
            placeholder="Enter your organization phone number"
            value={organizationData.phone}
            onChange={(e) =>
              setOrganizationData({
                ...organizationData,
                phone: e.target.value,
              })
            }
          />
        </div>
        <div className="flex md:flex-row flex-col items-center gap-4">
          <LocationInput
            isDisabled={!isEditing}
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
            isDisabled={!isEditing}
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
        {isEditing && (
          <>
            <div className="sm:flex hidden justify-between items-center py-[20px]">
              <Button
                disabled={!isEditing}
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <div className="">
                <SubmitDialog
                  screenSize="w-full"
                  handleSubmit={handleSubmit}
                  submitText="Update Organization"
                  submitLoadingText="Updating..."
                  description="Are you sure you want to update this organization?"
                  toastText="Organization updated successfully!"
                  open={submitDialogOpen}
                  setOpen={setSubmitDialogOpen}
                  disabled={!isEditing}
                  onTriggerClick={(e) => {
                    e.preventDefault();
                    if (checkEmpty()) {
                      setSubmitDialogOpen(true);
                    }
                  }}
                />
              </div>
            </div>
            <div className="sm:hidden flex gap-2 flex-col justify-between items-center py-[20px]">
              <SubmitDialog
                screenSize="w-full"
                handleSubmit={handleSubmit}
                submitText="Update Organization"
                submitLoadingText="Updating..."
                description="Are you sure you want to update this organization?"
                toastText="Organization updated successfully!"
                open={submitDialogOpen}
                setOpen={setSubmitDialogOpen}
                disabled={!isEditing}
                onTriggerClick={(e) => {
                  e.preventDefault();
                  if (checkEmpty()) {
                    setSubmitDialogOpen(true);
                  }
                }}
              />
              <Button
                disabled={!isEditing}
                className="w-full"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ViewOrganization;

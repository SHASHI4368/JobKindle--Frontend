"use client";

import InputWithIcon from "@/components/common/input-fields/input-with-icon";
import LocationInput from "@/components/common/input-fields/location-input";
import NormalInput from "@/components/common/input-fields/normal-input";
import { Mail, MapPin, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileUpdateDialog from "../../dialogs/ProfileUpdateDialog";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchProfileData } from "@/actions/profileActions";
const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Profile = () => {
  const [location, setLocation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const account = useSelector((state: any) => state.account);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const jwt = Cookies.get("jwt");
      if (jwt) {
        try {
          setLoading(true);
          const data = await fetchProfileData(jwt);
          if (data.success) {
            console.log(data.data);
            setFirstName(data.data.firstname || "");
            setLastName(data.data.lastname || "");
            setEmail(data.data.email || "");
            setPhone(data.data.phone || "");
            setLocation(data.data.location || "");
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

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
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div
            className={`
          flex-shrink-0 p-2 rounded-lg transition-all duration-300
          bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary
        `}
          >
            <User />
          </div>

          {/* Text content */}
          <div className="flex flex-col">
            <span
              className={`
            font-semibold text-[18px] transition-colors duration-300 text-gray-800 group-hover:text-primary
            
          `}
            >
              Personal Information
            </span>
            <span
              className={`
              text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
              
            `}
            >
              Manage your basic personal details and contact information
            </span>
          </div>
        </div>
        <div className="flex md:flex-row flex-col mt-[20px] gap-4 items-center ">
          <NormalInput
            label="First Name"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            isDisabled={!account.isProfileEditing}
          />
          <NormalInput
            label="Last Name"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            isDisabled={!account.isProfileEditing}
          />
        </div>
        <div className="flex md:flex-row flex-col mt-[20px] gap-4 items-center ">
          <InputWithIcon
            icon={<Mail size={18} className="text-gray-400" />}
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isDisabled={!account.isProfileEditing}
          />
          <InputWithIcon
            icon={<Phone size={18} className="text-gray-400" />}
            label="Phone Number"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            isDisabled={!account.isProfileEditing}
          />
        </div>
        <div className="flex md:flex-row flex-col mt-[20px] gap-4 items-center ">
          <LocationInput
            icon={<MapPin size={18} className="text-gray-400" />}
            label="Location"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            isLocationSearch={true}
            onLocationSelect={(selectedLocation) => {
              console.log("Selected:", selectedLocation);
              // selectedLocation contains: display_name, lat, lon, place_id
            }}
            isDisabled={!account.isProfileEditing}
          />
        </div>
        {account.isProfileEditing && (
          <>
            <div className="w-full mt-[20px] justify-end flex">
              <ProfileUpdateDialog
                location={location}
                firstName={firstName}
                lastName={lastName}
                email={email}
                phone={phone}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;

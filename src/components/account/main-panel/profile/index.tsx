"use client"

import InputWithIcon from '@/components/common/input-fields/input-with-icon';
import LocationInput from '@/components/common/input-fields/location-input';
import NormalInput from '@/components/common/input-fields/normal-input'
import SchoolInput from '@/components/common/input-fields/school-input';
import InputSchool from '@/components/common/input-fields/school-input';
import { Mail, MapPin, Phone, User } from 'lucide-react';
import React, { useState } from 'react'

const Profile = () => {
 const [location, setLocation] = useState("");
 const [school, setSchool] = useState("");
 

 const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
   setLocation(e.target.value);
 }

 const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   setSchool(e.target.value);
 }

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
          value=""
        />
        <NormalInput
          label="Last Name"
          placeholder="Enter your last name"
          value=""
        />
      </div>
      <div className="flex md:flex-row flex-col mt-[20px] gap-4 items-center ">
        <InputWithIcon
          icon={<Mail size={18} className="text-gray-400" />}
          label="Email"
          placeholder="Enter your email"
          value=""
        />
        <InputWithIcon
          icon={<Phone size={18} className="text-gray-400" />}
          label="Phone Number"
          placeholder="Enter your phone number"
          value=""
        />
      </div>
      <div className="flex md:flex-row flex-col mt-[20px] gap-4 items-center ">
        <LocationInput
          icon={<MapPin size={18} className="text-gray-400" />}
          label="Location"
          placeholder="Enter your location"
          value={location}
          onChange={handleLocation}
          isLocationSearch={true}
          onLocationSelect={(selectedLocation) => {
            console.log("Selected:", selectedLocation);
            // selectedLocation contains: display_name, lat, lon, place_id
          }}
        />
      </div>
      <div className="flex md:flex-row flex-col mt-[20px] gap-4 items-center ">
        <SchoolInput
          icon={<MapPin size={18} className="text-gray-400" />}
          label="Location"
          placeholder="Enter your location"
          value={school}
          onChange={handleSchoolChange}
          isSchoolSearch={true}
          onSchoolSelect={(selectedSchool) => {
            console.log("Selected:", selectedSchool);
            // selectedSchool contains: display_name, lat, lon, place_id
          }}
        />
      </div>
    </div>
  );
}

export default Profile
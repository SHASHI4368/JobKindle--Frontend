import NormalInput from "@/components/common/input-fields/normal-input";
import SchoolInput from "@/components/common/input-fields/school-input";
import NormalSelector from "@/components/common/selectors/normal-selector";
import NormalTextArea from "@/components/common/text-areas/normal-textarea";
import { Briefcase, MapPin } from "lucide-react";
import React, { useState } from "react";

const Professional = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [professionalBio, setProfessionalBio] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [school, setSchool] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [personalWebsite, setPersonalWebsite] = useState("");

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  const handleProfessionalBioChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProfessionalBio(e.target.value);
  };

  const handleExperienceLevelChange = (value: string) => {
    setExperienceLevel(value);
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchool(e.target.value);
  };

  const handleLinkedinProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinkedinProfile(e.target.value);
  };

  const handlePersonalWebsiteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPersonalWebsite(e.target.value);
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
          <Briefcase />
        </div>

        {/* Text content */}
        <div className="flex flex-col">
          <span
            className={`
            font-semibold text-[18px] transition-colors duration-300 text-gray-800 group-hover:text-primary
            
          `}
          >
            Professional Information
          </span>
          <span
            className={`
              text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
              
            `}
          >
            Update your professional details, skills, and experience
          </span>
        </div>
      </div>
      <div className="w-full flex mt-[20px]">
        <NormalInput
          label="Current Job Title"
          placeholder="Enter your job title"
          value={jobTitle}
          onChange={handleJobTitleChange}
        />
      </div>
      <div className="w-full flex">
        <NormalTextArea
          label="Professional Bio"
          placeholder="Enter your professional bio"
          value={professionalBio}
          onChange={handleProfessionalBioChange}
          rows={10}
        />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <NormalSelector
          label="Experience Level"
          placeholder="Select your experience level"
          value={experienceLevel}
          items={[
            { label: "Entry Level (0-2 years)", value: "entry" },
            { label: "Mid Level (2-5 years)", value: "mid" },
            { label: "Senior Level (5-10 years)", value: "senior" },
            { label: "Expert Level (10+ years)", value: "expert" },
          ]}
          onChange={handleExperienceLevelChange}
        />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <SchoolInput
          icon={<MapPin size={18} className="text-gray-400" />}
          label="Education"
          placeholder="Enter your education institution"
          value={school}
          onChange={handleSchoolChange}
          isSchoolSearch={true}
          onSchoolSelect={(selectedSchool) => {
            console.log("Selected:", selectedSchool);
            // selectedSchool contains: display_name, lat, lon, place_id
          }}
        />
      </div>
      <div className="w-full gap-4 flex mt-[20px]">
        <NormalInput
          label="LinkedIn Profile"
          placeholder="Enter your LinkedIn profile URL"
          value={linkedinProfile}
          onChange={handleLinkedinProfileChange}
        />
        <NormalInput
          label="Personal Website"
          placeholder="Enter your Personal Website URL"
          value={personalWebsite}
          onChange={handlePersonalWebsiteChange}
        />
      </div>
    </div>
  );
};

export default Professional;

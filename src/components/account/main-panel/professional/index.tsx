import NormalInput from "@/components/common/input-fields/normal-input";
import SchoolInput from "@/components/common/input-fields/school-input";
import NormalSelector from "@/components/common/selectors/normal-selector";
import NormalTextArea from "@/components/common/text-areas/normal-textarea";
import { Briefcase, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileUpdateDialog from "../../dialogs/ProfileUpdateDialog";
import Cookies from "js-cookie";
import { fetchProfileData } from "@/actions/profileActions";

const Professional = () => {
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [professionalBio, setProfessionalBio] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [school, setSchool] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const account = useSelector((state: any) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    setJobTitle(account.profile.jobTitle || "");
    setProfessionalBio(account.profile.bio || "");
    setExperienceLevel(account.profile.experience || "");
    setSchool(account.profile.education || "");
    setLinkedinProfile(account.profile.linkedin || "");
    setGithubUrl(account.profile.githubUrl || "");
  }, [account.profile]);

  return (
    <>
      
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
            onChange={(e) => setJobTitle(e.target.value)}
            isDisabled={!account.isProfileEditing}
          />
        </div>
        <div className="w-full flex">
          <NormalTextArea
            label="Professional Bio"
            placeholder="Enter your professional bio"
            value={professionalBio}
            onChange={(e) => setProfessionalBio(e.target.value)}
            isDisabled={!account.isProfileEditing}
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
            onChange={(value) => setExperienceLevel(value)}
            isDisabled={!account.isProfileEditing}
          />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <SchoolInput
            icon={<MapPin size={18} className="text-gray-400" />}
            label="Education"
            placeholder="Enter your education institution"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            isSchoolSearch={true}
            onSchoolSelect={(selectedSchool) => {
              console.log("Selected:", selectedSchool);
              // selectedSchool contains: display_name, lat, lon, place_id
            }}
            isDisabled={!account.isProfileEditing}
          />
        </div>
        <div className="w-full gap-4 flex mt-[20px]">
          <NormalInput
            label="LinkedIn Profile"
            placeholder="Enter your LinkedIn profile URL"
            value={linkedinProfile}
            onChange={(e) => setLinkedinProfile(e.target.value)}
            isDisabled={!account.isProfileEditing}
          />
          <NormalInput
            label="GitHub Profile"
            placeholder="Enter your GitHub profile URL"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            isDisabled={!account.isProfileEditing}
          />
        </div>
        {account.isProfileEditing && (
          <>
            <div className="w-full mt-[20px] justify-end flex">
              <ProfileUpdateDialog
                jobTitle={jobTitle}
                bio={professionalBio}
                experience={experienceLevel}
                education={school}
                linkedin={linkedinProfile}
                githubUrl={githubUrl}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Professional;

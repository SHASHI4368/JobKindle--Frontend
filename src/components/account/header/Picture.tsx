"use client";

import ImageUploadDialog from "@/components/common/document-upload/ImageUploadDialog";
import { setAccountImageUploadDialogOpen, setProfileDetails } from "@/redux/features/accountSlice";
import { Camera } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { updatePersonalInfo } from "@/actions/profileActions";
const Picture = () => {
  const account = useSelector((state: any) => state.account);
  const dispatch = useDispatch();

  const [upload, setUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    setFirstName(account.profile.firstname || "John");
    setLastName(account.profile.lastname || "Doe");
    setJobTitle(account.profile.jobTitle || "johndoe@example.com");
    setLocation(account.profile.location || "New York, USA");
    setFileUrl(account.profile.profilePic || null);
  }, [account.profile]);

  const [loading, setLoading] = useState(false);

  const handleImageUploadDialog = () => {
    dispatch(setAccountImageUploadDialogOpen(true));
  };
  const handleUploadSuccess = async (response: any) => {
    setFileUrl(response.url);
    console.log("File uploaded successfully:", response);
    try {
      const message = await updatePersonalInfo(Cookies.get("jwt") || "", {
        profilePic: response.url,
      });
      dispatch(setProfileDetails({ profilePic: response.url }));
      toast.success(message || "Profile picture updated successfully");
      dispatch(setAccountImageUploadDialogOpen(false));
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }
    e.preventDefault();
    setUpload(true);
    
  };

  const handleClose = () => {
    dispatch(setAccountImageUploadDialogOpen(false));
    setSelectedFile(null); // Reset selected file on close
    setUpload(false); // Reset upload state on close
  };

  return (
    <div className="flex h-full items-center md:flex-row flex-col gap-3">
      <div className="w-[110px] h-[110px] bg-blue-100 rounded-full p-[5px] relative">
        {fileUrl ? (
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={fileUrl || ""}              
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full  h-full bg-gradient-to-br from-primary to-primary/90 rounded-full justify-center flex items-center">
            <span className="text-white text-[25px] font-bold">JD</span>
          </div>
        )}
        <div
          onClick={handleImageUploadDialog}
          className="absolute bottom-0 right-0 w-[30px] z-[5] h-[30px] bg-blue-400 rounded-full flex items-center justify-center hover:scale-[1.02] hover:bg-blue-500 transition-all duration-300 cursor-pointer"
        >
          <Camera className="text-white" size={15} />
        </div>
      </div>
      <div className="flex flex-col  justify-center-safe md:items-start items-center  h-full">
        <h1 className="text-[30px]  font-bold">{`${firstName} ${lastName}`}</h1>
        <h2 className="text-[17px] text-gray-500">{jobTitle}</h2>
        <div className="flex flex-row gap-1 items-center">
          <p className="text-[14px] text-gray-500">{account.profile.email}</p>
          <span className="text-gray-400">|</span>
          <p className="text-[14px] text-gray-500">{location}</p>
        </div>
      </div>
      <ImageUploadDialog
        openState={account.imageUploadDialogOpen}
        closeHandler={handleClose}
        upload={upload}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleUploadSuccess={handleUploadSuccess}
        handleSubmit={handleSubmit}
        placeholder="Upload Your Profile Picture"
      />
    </div>
  );
};

export default Picture;

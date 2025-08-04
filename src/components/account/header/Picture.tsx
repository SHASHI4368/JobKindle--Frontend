"use client";

import ImageUploadDialog from "@/components/common/document-upload/ImageUploadDialog";
import { setAccountImageUploadDialogOpen } from "@/redux/features/accountSlice";
import { Camera } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Picture = () => {

  const dispatch = useDispatch();

  const handleImageUploadDialog = () => {
    dispatch(setAccountImageUploadDialogOpen(true));
  }

  const account = useSelector((state: any) => state.account);
  const [upload, setUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleUploadSuccess = (response: any) => {
    setFileUrl(response.url);
    console.log("File uploaded successfully:", response);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    e.preventDefault();
    setUpload(true);
  };

  const handleClose = () => {
    dispatch(setAccountImageUploadDialogOpen(false));
    setSelectedFile(null); // Reset selected file on close
    setFileUrl(null); // Reset file URL on close
    setUpload(false); // Reset upload state on close
  };

  return (
    <div className="flex h-full items-center flex-row gap-3">
      <div className="w-[110px] h-[110px] bg-blue-100 rounded-full p-[5px] relative">
        <div className="w-full  h-full bg-gradient-to-br from-primary to-primary/90 rounded-full justify-center flex items-center">
          <span className="text-white text-[25px] font-bold">JD</span>
        </div>
        <div
          onClick={handleImageUploadDialog}
          className="absolute bottom-0 right-0 w-[30px] z-[5] h-[30px] bg-blue-400 rounded-full flex items-center justify-center hover:scale-[1.02] hover:bg-blue-500 transition-all duration-300 cursor-pointer"
        >
          <Camera className="text-white" size={15} />
        </div>
      </div>
      <div className="flex flex-col  justify-center-safe  h-full">
        <h1 className="text-[30px]  font-bold">John Doe</h1>
        <h2 className="text-[17px] text-gray-500">Software Engineer</h2>
        <div className="flex flex-row gap-1 items-center">
          <p className="text-[14px] text-gray-500">johndoe@example.com</p>
          <span className="text-gray-400">|</span>
          <p className="text-[14px] text-gray-500">San Francisco, CA</p>
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

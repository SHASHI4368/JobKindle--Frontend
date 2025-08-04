"use client";

import ImageUploadDialog from "@/components/common/document-upload/ImageUploadDialog";
import { Button } from "@/components/ui/button";
import { setOrganizationImageUploadDialogOpen } from "@/redux/features/organizationSlice";
import { Building2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CompanyLogo = () => {
 const dispatch = useDispatch();

 const handleImageUploadDialog = () => {
   dispatch(setOrganizationImageUploadDialogOpen(true));
 };

 const organization = useSelector((state: any) => state.organization);
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
   dispatch(setOrganizationImageUploadDialogOpen(false));
   setSelectedFile(null); // Reset selected file on close
   setFileUrl(null); // Reset file URL on close
   setUpload(false); // Reset upload state on close
 };
  return (
    <div className="flex w-full flex-row gap-4 mt-[20px] items-center">
      <div className="h-[100px] w-[100px] justify-center items-center flex border-dashed border-[2px] rounded-[10px] p-4 border-primary/40 ">
        <Building2 size={50} className="text-primary" />
      </div>
      <div className="flex flex-col gap-3 justify-items-center-safe">
        <Button onClick={handleImageUploadDialog} variant={"outline"} className="cursor-pointer">
          Upload Logo
        </Button>
        <p className="font-raleway text-gray-500 text-[12px] ">
          PNG, JPG or SVG. Max size 10MB.
        </p>
      </div>
      <ImageUploadDialog
        openState={organization.imageUploadDialogOpen}
        closeHandler={handleClose}
        upload={upload}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleUploadSuccess={handleUploadSuccess}
        handleSubmit={handleSubmit}
        placeholder="Upload Your Company Logo"
      />
    </div>
  );
};

export default CompanyLogo;

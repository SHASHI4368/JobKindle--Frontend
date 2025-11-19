"use client";

import { FileText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ImageKitUploader from "@/components/common/document-upload/ImageKitUploader";
import PDFFileBox from "./PDFFileBox";
import Cookies from "js-cookie";
import { fetchProfileData, updatePersonalInfo } from "@/actions/profileActions";
import toast from "react-hot-toast";
import { getImageData } from "@/actions/imagekit";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationDocument } from "@/types/jobPosts";

type CoverLetterUploadBoxProps = {
  coverLetter: ApplicationDocument;
  setCoverLetter: (doc: ApplicationDocument) => void;
  coverLetterUpload: boolean;
  setCoverLetterUpload: (upload: boolean) => void;
};

const CoverLetterUploadBox = ({
  coverLetter,
  setCoverLetter,
  coverLetterUpload,
  setCoverLetterUpload,
}: CoverLetterUploadBoxProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUploadSuccess = (response: any) => {
    console.log("File uploaded successfully:", response);
    setCoverLetter({
      id: response.fileId,
      type: "COVER_LETTER",
      url: response.url,
      name: response.name,
      size: (response.size / 1024).toFixed(2) + " KB",
    });
    setCoverLetterUpload(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    e.preventDefault();
    setCoverLetterUpload(true);
  };

  const handleRemoveCoverLetter = () => {
    setCoverLetter({} as ApplicationDocument);
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
        <div className="flex flex-row items-center justify-end">
          {!coverLetter.id && (
            <Button
              disabled={!selectedFile}
              onClick={handleSubmit}
              variant={"outline"}
            >
              Upload
            </Button>
          )}
        </div>
        {coverLetter.id && (
          <div className="w-full flex items-center justify-start ">
            <PDFFileBox
              fileName={coverLetter.name}
              fileSize={coverLetter.size}
              url={coverLetter.url}
              setResumeId={handleRemoveCoverLetter}
            />
          </div>
        )}

        {!coverLetter.id && (
          <ImageKitUploader
            onUploadSuccess={handleUploadSuccess}
            upload={coverLetterUpload}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            placeholder="Upload your cover letter"
          />
        )}
        <div className="w-full flex justify-end "></div>
      </div>
    </>
  );
};

export default CoverLetterUploadBox;

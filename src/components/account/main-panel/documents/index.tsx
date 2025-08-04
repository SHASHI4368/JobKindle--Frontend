"use client";

import { FileText } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageKitUploader from "@/components/common/document-upload/ImageKitUploader";

const Documents = () => {
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
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div
            className={`
          flex-shrink-0 p-2 rounded-lg transition-all duration-300
          bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary
        `}
          >
            <FileText />
          </div>

          {/* Text content */}
          <div className="flex flex-col">
            <span
              className={`
            font-semibold text-[18px] transition-colors duration-300 text-gray-800 group-hover:text-primary
            
          `}
            >
              Documents & Resume
            </span>
            <span
              className={`
              text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
              
            `}
            >
              Upload and manage your resume, cover letter, and other documents
            </span>
          </div>
        </div>
        <Button disabled={!selectedFile} onClick={handleSubmit} variant={"outline"}>
          Upload
        </Button>
      </div>

      <ImageKitUploader
        onUploadSuccess={handleUploadSuccess}
        upload={upload}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        placeholder="Upload your resume or any document"
      />
      <div className="w-full flex justify-end "></div>
    </div>
  );
};

export default Documents;

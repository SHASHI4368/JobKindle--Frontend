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

const Documents = () => {
  const [upload, setUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [resumeId, setResumeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const account = useSelector((state: any) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const jwt = Cookies.get("jwt");
      if (jwt) {
        try {
          setLoading(true);
          if (account.profile.resume) {
            setResumeId(account.profile.resume);
            const resumeDetails = await getImageData(account.profile.resume);
            if (resumeDetails) {
              setResumeId(resumeDetails.versionInfo.id);
              setFileName(resumeDetails.name);
              setFileSize((resumeDetails.size / 1024).toFixed(2) + " KB");
              setFileUrl(resumeDetails.url);
            }
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [account.profile]);

  const handleSaveChanges = async (resumeUrl: string) => {
    try {
      const message = await updatePersonalInfo(Cookies.get("jwt") || "", {
        resumeUrl,
      });
      toast.success(message || "Resume updated successfully");
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
    }
  };

  const handleUploadSuccess = (response: any) => {
    setFileUrl(response.url);
    console.log("File uploaded successfully:", response);
    handleSaveChanges(response.fileId);
    setResumeId(response.fileId);
    setFileName(response.name);
    setFileSize((response.size / 1024).toFixed(2) + " KB");
    setUpload(false);
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
          {!resumeId && (
            <Button
              disabled={!selectedFile}
              onClick={handleSubmit}
              variant={"outline"}
            >
              Upload
            </Button>
          )}
        </div>
        {resumeId && (
          <div className="w-full flex items-center justify-start pt-[20px]">
            <PDFFileBox
              fileName={fileName}
              fileSize={fileSize}
              url={fileUrl}
              setResumeId={setResumeId}
            />
          </div>
        )}

        {!resumeId && (
          <ImageKitUploader
            onUploadSuccess={handleUploadSuccess}
            upload={upload}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            placeholder="Upload your resume or any document"
          />
        )}
        <div className="w-full flex justify-end "></div>
      </div>
    </>
  );
};

export default Documents;

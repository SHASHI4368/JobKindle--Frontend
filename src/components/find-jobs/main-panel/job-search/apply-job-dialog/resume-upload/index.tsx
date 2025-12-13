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

type ResumeUploadBoxProps = {
  resume: ApplicationDocument;
  setResume: (doc: ApplicationDocument) => void;
  resumeUpload: boolean;
  setResumeUpload: (upload: boolean) => void;
};

const ResumeUploadBox = ({
  resume,
  setResume,
  resumeUpload,
  setResumeUpload,
}: ResumeUploadBoxProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const account = useSelector((state: any) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const jwt = Cookies.get("jwt");
      if (jwt) {
        try {
          setLoading(true);
          console.log("Hi")
          const profileDataRes = await fetchProfileData(jwt);
          console.log(profileDataRes);
          if (profileDataRes.success) {
            const resumeUrl = profileDataRes.data.resume;
            if (resumeUrl) {
              const resumeDetails = await getImageData(resumeUrl);
              console.log(resumeDetails);
              if (resumeDetails) {
                setResume({
                  id: resumeDetails.versionInfo.id,
                  type: "CV",
                  url: resumeDetails.url,
                  name: resumeDetails.name,
                  size: (resumeDetails.size / 1024).toFixed(2) + " KB",
                });
              }
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
  }, []);

  const handleSaveChanges = async (resumeUrl: string) => {
    try {
      const message = await updatePersonalInfo(Cookies.get("jwt") || "", {
        resumeUrl,
      });
      toast.success(message || "Resume updated successfully");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleUploadSuccess = (response: any) => {
    console.log("File uploaded successfully:", response);
    handleSaveChanges(response.fileId);
    setResume({
      id: response.fileId,
      type: "CV",
      url: response.url,
      name: response.name,
      size: (response.size / 1024).toFixed(2) + " KB",
    });
    setResumeUpload(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    e.preventDefault();
    setResumeUpload(true);
  };

  const handleRemoveResume = () => {
    setResume({} as ApplicationDocument);
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
          {!resume.id && (
            <Button
              disabled={!selectedFile}
              onClick={handleSubmit}
              variant={"outline"}
            >
              Upload
            </Button>
          )}
        </div>
        {resume.id && (
          <div className="w-full flex items-center justify-start ">
            <PDFFileBox
              fileName={resume.name}
              fileSize={resume.size}
              url={resume.url}
              setResumeId={handleRemoveResume}
            />
          </div>
        )}

        {!resume.id && (
          <ImageKitUploader
            onUploadSuccess={handleUploadSuccess}
            upload={resumeUpload}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            placeholder="Upload your resume"
          />
        )}
        <div className="w-full flex justify-end "></div>
      </div>
    </>
  );
};

export default ResumeUploadBox;

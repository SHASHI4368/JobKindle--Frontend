import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  X,
  Check,
  AlertCircle,
  FileText,
  Image,
  Video,
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ImageKitUploaderProps = {
  publicKey?: string;
  urlEndpoint?: string;
  authenticationEndpoint?: string;
  onUploadSuccess?: (response: any) => void;
  onUploadError?: (error: Error) => void;
  maxFileSize?: number;
  acceptedFileTypes?: string;
  upload?: boolean;
  selectedFile?: File | null;
  setSelectedFile?: (file: File | null) => void;
};

const ImageKitUploader = ({
  publicKey = "public_Nb3Uiddx43llkFGng2BHCcZHgWo=",
  urlEndpoint = "https://ik.imagekit.io/web92xyy0/",
  authenticationEndpoint = "http://localhost:3000/api/auth",
  onUploadSuccess,
  onUploadError,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  acceptedFileTypes = "image/*,video/*,.pdf,.doc,.docx",
  upload,
  selectedFile,
  setSelectedFile,
}: ImageKitUploaderProps) => {
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  // Effect to trigger upload when upload prop becomes true
  useEffect(() => {
    if (upload && selectedFile && uploadStatus === "idle") {
      uploadToImageKit(selectedFile);
    }
  }, [upload, selectedFile]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: any) => {
    if (file.size > maxFileSize) {
      throw new Error(
        `File size must be less than ${(maxFileSize / 1024 / 1024).toFixed(
          1
        )}MB`
      );
    }
    return true;
  };

  const uploadToImageKit = async (file: any) => {
    try {
      validateFile(file);
      setUploadStatus("uploading");
      setUploadProgress(0);
      setError("");

      // Get authentication parameters from your backend
      const authResponse = await fetch(authenticationEndpoint);
      const authData = await authResponse.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("publicKey", publicKey);
      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire);
      formData.append("token", authData.token);
      formData.append("fileName", file.name);

      const xhr = new XMLHttpRequest();

      return new Promise((resolve, reject) => {
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(progress);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            setUploadedFile(response);
            setUploadStatus("success");
            onUploadSuccess?.(response);
            resolve(response);
          } else {
            const errorResponse = JSON.parse(xhr.responseText);
            console.log("Upload error:", errorResponse);
            reject(new Error(errorResponse.message || "Upload failed"));
          }
        });

        xhr.addEventListener("error", () => {
          reject(new Error("Network error occurred"));
        });

        xhr.open("POST", "https://upload.imagekit.io/api/v1/files/upload");
        xhr.send(formData);
      });
    } catch (err: any) {
      setError(err.message);
      setUploadStatus("error");
      onUploadError?.(err);
      throw err;
    }
  };

  const handleFileSelect = (files: any) => {
    const file = files[0];
    if (file) {
      if (setSelectedFile) {
        setSelectedFile(file);
      }
      // Only upload immediately if upload prop is true
      if (upload) {
        uploadToImageKit(file);
      }
    }
  };

  const handleFileInputChange = (e: any) => {
    handleFileSelect(e.target.files);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e:any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e:any) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const resetUpload = () => {
    setUploadStatus("idle");
    setUploadProgress(0);
    setUploadedFile(null);
    if (setSelectedFile) {
      setSelectedFile(null);
    }
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const copyToClipboard = (text:any) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Copied to clipboard");
    });
  };

  const getFileIcon = (fileName:any) => {
    const extension = fileName.toLowerCase().split(".").pop();

    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
      return <Image className="h-8 w-8 text-blue-500" />;
    } else if (["mp4", "avi", "mov", "mkv", "webm"].includes(extension)) {
      return <Video className="h-8 w-8 text-purple-500" />;
    } else if (["pdf"].includes(extension)) {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else if (["doc", "docx"].includes(extension)) {
      return <FileText className="h-8 w-8 text-blue-600" />;
    } else {
      return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="w-full mt-[20px]">
      {uploadStatus === "idle" && !selectedFile && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">
            Drop your resume here or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Max size: {(maxFileSize / 1024 / 1024).toFixed(1)}MB
          </p>
        </div>
      )}

      {uploadStatus === "idle" && selectedFile && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center space-x-3">
            {getFileIcon(selectedFile.name)}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={resetUpload}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {uploadStatus === "uploading" && (
        <div className="text-center py-8">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 mb-2">Uploading...</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">{uploadProgress}%</p>
        </div>
      )}

      {uploadStatus === "success" && uploadedFile && (
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-green-600">Upload successful!</p>
            </div>
          </div>
          <Button
            variant={'outline'}
            onClick={resetUpload}
            className="text-sm text-green-600 hover:text-green-700 transition-colors font-medium"
          >
            Upload Another
          </Button>
        </div>
      )}

      {uploadStatus === "error" && (
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-red-600 font-medium mb-2">Upload failed</p>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={resetUpload}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedFileTypes}
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default ImageKitUploader;

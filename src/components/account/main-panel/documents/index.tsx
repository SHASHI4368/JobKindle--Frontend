import { FileText } from "lucide-react";
import React from "react";
import ImageKitUploader from "./ImageKitUploader";

const Documents = () => {
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
      <ImageKitUploader/>
    </div>
  );
};

export default Documents;

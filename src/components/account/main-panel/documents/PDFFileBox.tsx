import React from "react";
import { FileText, Eye, Trash2, Download } from "lucide-react";
import DeleteFileDialog from "../../dialogs/DeleteFileDialog";

type PDFFileBoxProps = {
  fileName?: string;
  fileSize?: string;
  url?: string;
  setResumeId?: any;
};

const PDFFileBox = ({
  fileName = "",
  fileSize = "",
  url = "",
  setResumeId,
}: PDFFileBoxProps) => {
  const handleView = () => {
    // Open the PDF in a new tab
    window.open(url, "_blank");
  };

  return (
    <div className="w-48 h-56 bg-white border relative border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group">
      {/* PDF Preview Area */}
      <div className="h-36 bg-gray-50 rounded-t-lg flex items-center justify-center border-b border-gray-100">
        <FileText className="w-12 h-12 text-red-500" />
      </div>

      {/* File Info */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-sm font-medium text-gray-900 truncate mb-1"
            title={fileName}
          >
            {fileName}
          </h3>
          <p className="text-xs text-gray-500">{fileSize}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex absolute bottom-[0px]  w-full ml-[-12px] items-center justify-center  opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => {
              handleView();
            }}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-150"
            title="Download PDF"
          >
            <Download className="w-4 h-4 text-gray-600" />
          </button>
          <DeleteFileDialog fileID={fileName} setResumeId={setResumeId} />
        </div>
      </div>
    </div>
  );
};

export default PDFFileBox;

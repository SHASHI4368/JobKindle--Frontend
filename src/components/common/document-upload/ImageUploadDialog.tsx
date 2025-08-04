"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageKitUploader from "@/components/common/document-upload/ImageKitUploader";
import { Button } from "@/components/ui/button";

type ImageUploadDialogProps = {
  openState: any;
  closeHandler: () => void;
  upload: boolean;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  handleUploadSuccess: (response: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
};

const ImageUploadDialog = ({
  openState,
  closeHandler,
  upload,
  selectedFile,
  setSelectedFile,
  handleUploadSuccess,
  handleSubmit,
  placeholder = "Upload Your File",
}: ImageUploadDialogProps) => {

  return (
    <Dialog open={openState} onOpenChange={closeHandler}>
      <DialogContent className="z-[500]  max-h-[90vh] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{placeholder}</DialogTitle>
          <div className="w-full flex flex-col gap-4">
            <ImageKitUploader
              onUploadSuccess={handleUploadSuccess}
              upload={upload}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              placeholder={placeholder}
            />
            <div className="flex flex-row justify-between items-center ">
              <Button variant={"outline"} onClick={closeHandler}>
                Cancel
              </Button>
              <Button
                variant={"default"}
                disabled={!selectedFile}
                onClick={handleSubmit}
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;

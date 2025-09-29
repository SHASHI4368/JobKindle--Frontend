"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteResume, updatePersonalInfo } from "@/actions/profileActions";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setIsProfileEditing } from "@/redux/features/accountSlice";
import { Trash2 } from "lucide-react";
import { deleteImage } from "@/actions/imagekit";



const DeleteFileDialog = ({ fileID, setResumeId }: { fileID: string; setResumeId: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteImage(fileID);
      const message = await deleteResume(Cookies.get("jwt") || "");
      setResumeId("");
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="p-1.5 rounded-full hover:bg-red-50 transition-colors duration-150"
          title="Delete PDF"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            resume
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              e.preventDefault(); // 🚀 prevents auto-close
              await handleDelete();
            }}
          >
            {isLoading ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFileDialog;

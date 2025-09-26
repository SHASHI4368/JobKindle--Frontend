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
import { updatePersonalInfo } from "@/actions/profileActions";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setIsProfileEditing } from "@/redux/features/accountSlice";

type ProfileUpdateDialogProps = {
  location?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

const ProfileUpdateDialog = ({
  location,
  firstName,
  lastName,
  email,
  phone,
}: ProfileUpdateDialogProps) => {
 const [isLoading, setIsLoading] = useState(false);
const dispatch = useDispatch();
  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const message = await updatePersonalInfo(
        Cookies.get("jwt") || "",
        firstName,
        lastName,
        email,
        phone,
        location
      );
      toast.success(message || "Profile updated successfully");
      dispatch(setIsProfileEditing(false));
      sessionStorage.setItem("isEditing", JSON.stringify(false));
    } catch (error) {
      console.error("Error saving changes:", error);
    }finally{
      setIsLoading(false); 
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"default"}>Save Changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Please make sure all the details are correct before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSaveChanges}>
            {isLoading ? "Saving..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfileUpdateDialog;

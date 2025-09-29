"use client";

import React, { useEffect, useState } from "react";
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
import { EditIcon, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setIsProfileEditing } from "@/redux/features/accountSlice";

const IsEditDialog = () => {
  const account = useSelector((state: any) => state.account);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);
  };

  const handleIsEditingChange = () => {
    dispatch(setIsProfileEditing(!account.isProfileEditing));
    sessionStorage.setItem("isEditing", JSON.stringify(!account.isProfileEditing));
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      {account.isProfileEditing ? (
        <Button
          variant={"outline"}
          className="cursor-pointer md:w-[150px] w-full"
          onClick={handleOpenChange}
        >
          {/* You can add an icon here if needed */}
          <X className="text-red-400" />
          <span className="text-[14px] font-semibold">Cancel Edit</span>
        </Button>
      ) : (
        <Button
          variant={"outline"}
          className="cursor-pointer md:w-[150px] w-full"
          onClick={handleOpenChange}
        >
          {/* You can add an icon here if needed */}
          <EditIcon className="" />
          <span className="text-[14px] font-semibold">Edit Profile</span>
        </Button>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {account.isProfileEditing ? (
              "Do you really want to cancel your edit?"
            ) : (
              "Do you really want to edit your profile?"
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleOpenChange}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleIsEditingChange}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IsEditDialog;

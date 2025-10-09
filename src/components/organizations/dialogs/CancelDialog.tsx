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

type Props = {
  screenSize: string;
  handleCancel: () => void;
};

const CancelDialog = ({ screenSize, handleCancel }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className={`${screenSize}`} variant="outline">Cancel</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All unsaved changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              handleCancel();
              setIsLoading(false);
              toast.success("All changes discarded");
              setOpen(false);
            }}
          >
            {isLoading ? "Cleaning..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelDialog;

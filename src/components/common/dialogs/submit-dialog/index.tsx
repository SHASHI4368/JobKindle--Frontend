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
  handleSubmit: () => void;
  submitText: string;
  submitLoadingText: string;
  description: string;
  toastText: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  onTriggerClick: (e:any) => void;
};

const SubmitDialog = ({
  screenSize,
  handleSubmit,
  submitText,
  submitLoadingText,
  description,
  toastText,
  open,
  setOpen,
  disabled,
  onTriggerClick,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={onTriggerClick} disabled={disabled} className={`${screenSize}`} variant="default">
          {`${submitText}`}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              await handleSubmit();
              setIsLoading(false);
              setOpen(false);
            }}
          >
            {isLoading ? `${submitLoadingText}` : `Continue`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubmitDialog;

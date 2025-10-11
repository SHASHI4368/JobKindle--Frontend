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
import { EditIcon, Pencil, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setIsProfileEditing } from "@/redux/features/accountSlice";

type Props = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  sessionStorageKey?: string;
  editButtonClassName?: string;
};

const IsEditDialog = ({
  isEditing,
  setIsEditing,
  sessionStorageKey,
  editButtonClassName,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);
  };

  const handleIsEditingChange = () => {
    setIsEditing(!isEditing);
    if (sessionStorageKey) {
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(!isEditing));
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      {isEditing ? (
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
        <Button onClick={handleOpenChange} variant="outline">
          <Pencil size={16} className="mr-1" />
          <span className="text-gray-600">Edit</span>

        </Button>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {isEditing
              ? "Do you really want to cancel your edit?"
              : `Do you really want to edit your ${editButtonClassName}`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleOpenChange}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleIsEditingChange}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IsEditDialog;

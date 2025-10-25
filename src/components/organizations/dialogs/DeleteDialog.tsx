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
import { EditIcon, Pencil, Trash2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setIsProfileEditing } from "@/redux/features/accountSlice";
import { parseAsString, useQueryState } from "nuqs";
import Cookies from "js-cookie";
import { deleteOrganization } from "@/actions/organizationActions";
import toast from "react-hot-toast";
import { removeOrganization } from "@/redux/features/organizationSlice";

const DeleteDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useQueryState(
    "activeItem",
    parseAsString.withDefault("Create")
  );
  const [id, setId] = useQueryState("id", parseAsString.withDefault(""));
  const dispatch = useDispatch();

  const handleOpenChange = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    const jwt = Cookies.get("jwt");
    if (jwt && id) {
      try {
        setIsLoading(true);
        const response = await deleteOrganization(jwt, parseInt(id));
        if (response.success) {
          toast.success("Organization deleted successfully");
          setActiveItem("Create");
          dispatch(removeOrganization(parseInt(id)));
          setId("");
          handleOpenChange();
        } else {
          toast.error("Failed to delete organization");
        }
      } catch (error) {
        console.error("Error deleting organization:", error);
      }finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash2 size={16} className="mr-1 text-red-500" />
          <span className="text-red-500">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Do you really want to delete this organization`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleOpenChange}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={async (e) => {
              e.preventDefault(); // 🚀 prevents auto-close
              handleDelete();
            }}
          >
            {isLoading ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;

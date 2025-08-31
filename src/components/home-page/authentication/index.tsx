"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Login from "./Login";
import Signup from "./Signup";
import { useDispatch, useSelector } from "react-redux";
import { setLoginDialogOpen } from "@/redux/features/authSlice";

const Authentication = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setLoginDialogOpen(false));
  };

  
  return (
    <>
      <Dialog open={auth.dialogOpen} onOpenChange={handleClose}>
        <DialogContent className="z-[500] xl:w-[30%] md:w-[50%] w-[95%] min-h-[95vh] max-h-[95vh] p-0 overflow-hidden">
          <div className="custom-scrollbar h-full max-h-[95vh] px-6 py-4">
            <DialogHeader>
              <DialogTitle></DialogTitle>

              {/* Content Container with Transition */}
              <div className="relative overflow-hidden">
                {/* Content 1 */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    auth.isLogin === true
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-full absolute top-0 left-0 w-full"
                  }`}
                >
                  <Login />
                </div>

                {/* Content 2 */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    auth.isLogin === false
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-full absolute top-0 left-0 w-full"
                  }`}
                >
                  <Signup />
                </div>
              </div>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Authentication;

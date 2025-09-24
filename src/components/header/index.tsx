"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin, setLoginDialogOpen } from "@/redux/features/authSlice";
import Authentication from "../home-page/authentication";
import SideBar from "../home-page/main/sidebar";
import NavigationPanel from "./NavigationPanel";
import Avatar from "./Avatar";
import Cookies from "js-cookie";
import { parseAsString, useQueryState } from "nuqs";
import toast from "react-hot-toast";

const Header = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [error, setError] = useQueryState("error", parseAsString.withDefault(""));

  const openAuthenticationDialog = (isLogin: boolean) => {
    dispatch(setLogin(isLogin));
    dispatch(setLoginDialogOpen(true));
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("jwt");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    setIsTransitioning(true);
    checkLoginStatus();
    setIsTransitioning(false);
  }, []);

  useEffect(() => {
    if (error !== "") {
      setError("");
      setIsLoggedIn(false);
      Cookies.remove("jwt");
      toast.error("Unauthorized access! Please log in.");
    }
  }, [error]);

  return (
    <>
      {isTransitioning && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            {/* Loading spinner */}
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

            {/* Transition text */}
            <div className="text-primary font-semibold text-lg animate-pulse">
              Loading ...
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white font-raleway sticky top-0 z-[100]  shadow-2xs text-2xl h-[10vh] xl:px-[10vw] px-[5vw] flex flex-row justify-between items-center w-full">
        <div className="flex relative flex-row justify-between items-center w-full">
          <div className="flex cursor-pointer text-[22px] font-raleway flex-row items-center justify-start space-x-3 w-full" onClick={() => {
            toast.success("You must be logged in to access this feature.");
          }}>
            <div className="font-[700]  text-[18px] py-1 px-[8px] text-white rounded-[10px] bg-gradient-to-br from-primary to-secondary    ">
              Jo
            </div>
            <div className="font-[700] bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
              JobKindle
            </div>
          </div>
          {isLoggedIn && <NavigationPanel />}
          {isLoggedIn ? (
            <Avatar />
          ) : (
            <div className="lg:flex text-[50px] space-x-2 text-gray-700 hidden justify-end items-center w-full">
              <Button
                onClick={() => openAuthenticationDialog(true)}
                size={"home"}
                variant={"ghost"}
              >
                Login
              </Button>
              <Button
                onClick={() => openAuthenticationDialog(false)}
                className="text-white"
                size={"home"}
                variant={"default"}
              >
                Sign Up
              </Button>
              <Authentication />
            </div>
          )}

          <SideBar />
        </div>
      </div>
    </>
  );
};

export default Header;

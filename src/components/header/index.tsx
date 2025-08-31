"use client";

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLogin, setLoginDialogOpen } from '@/redux/features/authSlice';
import Authentication from '../home-page/authentication';
import SideBar from '../home-page/main/sidebar';
import NavigationPanel from './NavigationPanel';
import Avatar from './Avatar';
import Cookies from "js-cookie";

const Header = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openAuthenticationDialog = (isLogin: boolean) => {
    dispatch(setLogin(isLogin));
    dispatch(setLoginDialogOpen(true));
  }

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("jwt");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="bg-white font-raleway sticky top-0 z-[100]  shadow-2xs text-2xl h-[10vh] xl:px-[10vw] px-[5vw] flex flex-row justify-between items-center w-full">
      <div className="flex relative flex-row justify-between items-center w-full">
        <div className="flex cursor-pointer text-[22px] font-raleway flex-row items-center justify-start space-x-3 w-full">
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
  );
}

export default Header
import { Button } from "@/components/ui/button";
import React from "react";
import SideBar from "../sidebar";
import Login from "../../login";

const Header = () => {
  return (
    <div className="bg-white font-raleway sticky top-0 z-[100]  shadow-2xs text-2xl h-[10vh] xl:px-[10vw] px-[5vw] flex flex-row justify-between items-center w-full">
      <div className="flex cursor-pointer text-[22px] font-raleway flex-row items-center justify-start space-x-3 w-full">
        <div className="font-[700]  text-[18px] py-1 px-[8px] text-white rounded-[10px] bg-gradient-to-br from-primary to-secondary    ">
          Jo
        </div>
        <div className="font-[700] bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
          JobKindle
        </div>
      </div>
      <div className="md:flex text-[50px] space-x-2 text-gray-500 hidden justify-end items-center w-full">
        <Login />
        <Button className="text-white" size={"home"} variant={"default"}>
          Sign Up
        </Button>
      </div>
      <SideBar />
    </div>
  );
};

export default Header;

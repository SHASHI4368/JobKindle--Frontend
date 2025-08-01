import { Camera } from "lucide-react";
import React from "react";

const Picture = () => {
  return (
    <div className="flex h-full items-center flex-row gap-3">
      <div className="w-[110px] h-[110px] bg-blue-100 rounded-full p-[5px] relative">
        <div className="w-full  h-full bg-gradient-to-br from-primary to-primary/90 rounded-full justify-center flex items-center">
          <span className="text-white text-[25px] font-bold">JD</span>
        </div>
        <div className="absolute bottom-0 right-0 w-[30px] z-[5] h-[30px] bg-blue-400 rounded-full flex items-center justify-center hover:scale-[1.02] hover:bg-blue-500 transition-all duration-300 cursor-pointer">
          <Camera className="text-white" size={15} />
        </div>
      </div>
      <div className="flex flex-col  justify-center-safe  h-full">
        <h1 className="text-[30px]  font-bold">John Doe</h1>
        <h2 className="text-[17px] text-gray-500">Software Engineer</h2>
        <div className="flex flex-row gap-1 items-center">
          <p className="text-[14px] text-gray-500">johndoe@example.com</p>
          <span className="text-gray-400">|</span>
          <p className="text-[14px] text-gray-500">San Francisco, CA</p>
        </div>
      </div>
    </div>
  );
};

export default Picture;

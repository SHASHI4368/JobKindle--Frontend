import React from "react";
import { ProItem } from "./type";
import { CircleCheckBig } from "lucide-react";

const ProCard = ({ item }: { item: ProItem }) => {
  return (
    <div className="sm:w-[380px] w-[90vw]  font-geist-sans rounded-[10px] shadow-sm hover:shadow-2xl transition-all duration-500 h-[350px] border-[1px] border-[#DBEAFE] bg-gradient-to-br from-white to-[#EFF6FF] flex flex-col gap-[10px] p-6 ">
      <div
        className={`flex items-center justify-center rounded-[10px] min-w-[55px] max-w-[55px] min-h-[55px] opacity-95 bg-gradient-to-br from-primary to-secondary`}
      >
        {item.icon}
      </div>
      <h1 className="font-[700] text-[20px] mt-[20px]">{item.title}</h1>
      <p className="text-gray-600 text-[16px] mt-[10px]">{item.description}</p>
      <div className=" bottom-0 mt-[10px]  flex flex-row items-center h-[100px] justify-between">
        <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-[23px] font-[700] ">
          {item.summary}
        </p>
        <CircleCheckBig size={20} className="text-green-700" />
      </div>
    </div>
  );
};

export default ProCard;

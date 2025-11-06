import React from "react";
import { item } from "./type";

const OfferCard = ({ item }: { item: item }) => {
  return (
    <div className="group relative sm:w-[380px] w-[90vw] h-[400px] rounded-[10px] hover:translate-y-[-5px] transition-transform duration-500 shadow-xl grid grid-rows-[1fr_200px] font-geist-sans overflow-hidden">
      {/* Background overlay */}
      <div
        className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-5"
        style={{ backgroundColor: item.colorStart }}
      ></div>

      {/* Content here, stays fully visible */}
      <div className="flex w-full font-geist-sans  p-7 flex-col">
        <div
          className="flex items-center justify-center rounded-[12px] w-[60px] h-[60px]"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${item.colorStart}, ${item.colorEnd})`,
          }}
        >
          {item.icon}
        </div>

        <h1 className="font-bold sm:text-[22px] text-[20px] mt-[20px]">
          {item.title}
        </h1>
        <p className="text-gray-600 sm:text-[16px] text-[15px] mt-[10px]">
          {item.description}
        </p>
      </div>
      <div className="w-full absolute bottom-0 h-[120px] flex justify-start  px-7 leading-none">
        <ul className="list-none">
          {item.points.map((point, index) => (
            <li
              key={index}
              className="relative pl-4 text-gray-600 sm:text-[16px] text-[15px] font-[500] mt-[10px]"
            >
              {/* Custom gradient bullet */}
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full `}
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${item.colorStart}, ${item.colorEnd})`,
                }}
              ></span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom expanding line */}
      <div className="absolute bottom-0 left-0 w-full h-[6px] origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>
    </div>
  );
};

export default OfferCard;

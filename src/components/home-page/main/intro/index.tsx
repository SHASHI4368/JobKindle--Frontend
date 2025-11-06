import React from "react";

const Intro = () => {
  return (
    <div className="w-full relative pt-[10vh] h-[100vh] overflow-hidden bg-light-blue justify-center items-center flex flex-col">
      <div className="absolute opacity-40 w-[400px] h-[400px] right-[-200px] top-[-100px] rounded-full bg-primary animate-float-random  "></div>
      <div className="absolute opacity-40 w-[100px] h-[100px] right-[50%] top-[100px] rounded-full bg-primary animate-float-random  "></div>
      <div className="absolute opacity-40 w-[400px] h-[400px] left-[-200px] bottom-[0px] rounded-full bg-primary animate-float-x  "></div>
      <div className="w-full  flex flex-col md:text-[60px] sm:text-[50px] text-[40px] items-center justify-start leading-none  ">
        <h1 className="font-geist-sans font-[700]  bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          AI-Powered
        </h1>
        <h1 className="font-geist-sans font-[700]  text-black">Recruitment</h1>
        <h1 className="font-geist-sans font-[700]  text-primary">Revolution</h1>
        <p className="text-gray-600 font-geist-sans md:text-[23px] sm:text-[20px] text-[18px] leading-[30px] mt-[50px] md:max-w-[50vw] max-w-[90vw] text-center">
          Connect top talent with leading companies through our intelligent
          matching system. Experience the future of hiring with AI-driven
          interviews and smart candidate screening.
        </p>
        <div className="flex flex-row mt-[50px] justify-center md:gap-x-[40px] sm:gap-x-[30px] gap-x-[20px] items-center">
          <div className="flex flex-col items-center justify-center leading-[30px]">
            <h1 className="md:text-[28px] sm:text-[25px] text-[22px] font-geist-sans font-[700] text-primary">
              50K+
            </h1>
            <p className="text-gray-600 font-geist-sans md:text-[16px] sm:text-[14px] text-[12px]">
              Active Jobs
            </p>
          </div>
          <div className="flex flex-col items-center leading-[30px] justify-center">
            <h1 className="md:text-[28px] sm:text-[25px] text-[22px] font-geist-sans font-[700] text-primary">
              100K+
            </h1>
            <p className="text-gray-600 font-geist-sans md:text-[16px] sm:text-[14px] text-[12px]">
              Candidates
            </p>
          </div>
          <div className="flex flex-col items-center leading-[30px] justify-center">
            <h1 className="md:text-[28px] sm:text-[25px] text-[22px] font-geist-sans font-[700] text-primary">
              5K+
            </h1>
            <p className="text-gray-600 font-geist-sans md:text-[16px] sm:text-[14px] text-[12px]">
              Companies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;

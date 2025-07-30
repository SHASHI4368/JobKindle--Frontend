import React from "react";
import { advertisement } from "./types";
import { Clock4, DollarSign, MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const JobCard = ({ job }: { job: advertisement }) => {
  return (
    <div className="sm:w-[380px] w-[90vw] relative h-[350px] bg-white shadow-xl rounded-[10px] shadow-gray hover:scale-[1.02] transition-all duration-300 p-2 grid grid-rows-[70px_1fr_70px] font-raleway">
      <div className="flex flex-col  items-start">
        <div className="w-full flex flex-row items-start justify-between p-4 pb-0">
          <h2 className="text-black sm:text-[18px] text-[16px] font-[700] w-[80%]">
            {job.job}
          </h2>
          <div className="bg-green-100 sm:text-[11px] text-[10px] font-[500] text-green-800 p-1 px-2 rounded-l-full rounded-r-full">
            {job.onSite ? "On-site" : "Remote"}
          </div>
        </div>
        <h3 className="text-gray-600 sm:text-[16px] text-[12px] font-[600] p-4 pt-0 ">
          {job.company}
        </h3>
      </div>
      <div className="w-full p-4 flex flex-col gap-3">
        <div className="flex flex-row gap-6 items-center justify-start font-raleway font-[400] text-gray-500 sm:text-[15px] text-[13px]"> 
          <div className="flex flex-row gap-1 items-center">
            <MapPin className="size-4 text-gray-500" />
            <p>{job.location}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Clock4 className="size-4 text-gray-500" />
            <p>{`${
              new Date().getDate() - new Date(job.calledDate).getDate()
            } day(s) ago`}</p>
          </div>
        </div>
        <div className="flex flex-row gap-6 items-center justify-start font-raleway font-[400] text-gray-500 sm:text-[15px] text-[13px] ">
          <div className="flex flex-row text-green-700 gap-1 items-center">
            <DollarSign className="size-4 " />
            <p>{job.salary}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <div className="bg-gray-100 sm:text-[12px] text-[10px] font-[500] text-gray-800 p-1 px-2 rounded-l-full rounded-r-full">
              {job.fullTime ? "Full-Time" : "Part-Time"}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-6 items-center justify-between font-raleway font-[400] text-gray-500 sm:text-[15px] text-[13px] ">
          <div className="flex flex-row gap-1 items-center">
            <Users className="size-4 text-gray-500" />
            <p>{`${job.applications} applicants`}</p>
          </div>
          <div className="flex flex-row gap-1 pr-1 items-center">
            <Star fill="gold" className="size-4 text-yellow-500" />
            <p className="text-black sm:text-[15px] text-[13px] font-[600] ">{`${job.rating}`}</p>
          </div>
        </div>
        <div className="flex flex-row mt-[10px] flex-wrap gap-x-6 gap-y-2 items-center justify-start font-raleway font-[400]">
          {job.requirements.map((req, index) => (
            <div
              key={index}
              className="bg-gray-100 border-[1px] border-primary sm:text-[12px] text-[10px] font-[500] text-primary p-1 px-2 rounded-l-full rounded-r-full"
            >
              {req}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full absolute bottom-0 flex items-center flex-row justify-between p-4 pt-0">
        <Button size={"card"}>Apply Now</Button>
        <Button variant={"outline"} size={"card"} className="w-[25%]">
          Save
        </Button>
      </div>
    </div>
  );
};

export default JobCard;

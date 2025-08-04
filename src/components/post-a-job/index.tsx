import React from "react";
import PostAJobHeader from "./header";
import BasicInfo from "./basic-info";
import JobDetails from "./job-details";
import Skills from "./skills";

const PostAJob = () => {
  return (
    <div className="w-full gap-5  flex flex-col xl:px-[10vw] px-[5vw]">
      <PostAJobHeader />
      <BasicInfo />
      <JobDetails />
      <Skills/>
    </div>
  );
};

export default PostAJob;

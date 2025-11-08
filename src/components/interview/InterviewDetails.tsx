"use client";


import { getApplicationById } from "@/actions/applicationActions";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { getJobPostById } from "@/actions/jobPostActions";

type InterviewDetailsProps = {
  jobTitle: string;
  companyName: string;
  interviewMode: string;
  interviewerName?: string;
};

const InterviewDetails = () => {
  const [loading, setLoading] = React.useState(true);
  const [jobTitle, setJobTitle] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const getJobPostDetails = async () => {
    const applicationId = window.location.pathname.split("/").pop();
    // get the application info first
    const jwt = Cookies.get("jwt");
    if(!applicationId || !jwt) return;
    try{
      setLoading(true);
      const appRes = await getApplicationById(jwt || "", Number(applicationId));
      const jobPostId = appRes.data.postId;
      console.log(jobPostId)
      // now get the job post details
      if(jobPostId){
        const jobPostRes = await getJobPostById(jwt || "", jobPostId);
        const jobData = jobPostRes.data;
        setJobTitle(jobData.title);
        setCompanyName(jobData.companyName);
      }
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getJobPostDetails();
  }, []); 


  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading chat data...</p>
          </div>
        </div>
      )}
    <div>
      <h3 className="text-lg font-semibold mb-2">Interview Details</h3>
      <div className="space-y-1 text-sm text-gray-300">
        <p>
          <strong>Position:</strong> {jobTitle}
        </p>
        <p>
          <strong>Company:</strong> {companyName}
        </p>
      </div>
    </div>
    </>
  );
};

export default InterviewDetails;

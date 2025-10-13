import React, { useState } from 'react'
import BasicInfo from './basic-info';
import JobDetails from './job-details';
import Skills from './skills';
import { Button } from '@/components/ui/button';
import { ArrowUpFromLine, Briefcase, Eye, X } from 'lucide-react';
import { NewJobType } from './types';
import CancelDialog from '@/components/common/dialogs/cancel-dialog';
import Cookies from "js-cookie";
import SubmitDialog from '@/components/common/dialogs/submit-dialog';
import toast from 'react-hot-toast';
import { createJobPost, createJobPostDraft } from '@/actions/jobPostActions';



const NewJob = () => {
  const [draftDialogOpen, setDraftDialogOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [jobData, setJobData] = useState<NewJobType>({
    title: '',
    company: {
      name: '',
      orgId: 0
    },
    jobDescription : '',
    location: '',
    workType: '',
    experienceLevel: '',
    employmentType: '',
    currency: {
      name: '',
      symbol: ''
    },
    salary: 0,
    minSalary: 0,
    maxSalary: 0,

    requirements: '',
    benefits: '',
    skills: [] as string[],
    deadline: new Date(),
  });

  const handleDraftCreate = async () => {
    const jwt = Cookies.get("jwt");
    const salaryString = jobData.minSalary === jobData.maxSalary ? `${jobData.currency.symbol}${jobData.minSalary}` : `${jobData.currency.symbol}${jobData.minSalary} - ${jobData.currency.symbol}${jobData.maxSalary}`;
    const body = {
      title: jobData.title,
      companyName: jobData.company.name,
      location: jobData.location,
      workType: jobData.workType,
      experienceLevel: jobData.experienceLevel,
      employmentType: jobData.employmentType,
      salary: salaryString,
      description: jobData.jobDescription,
      requirements: jobData.requirements,
      deadline: jobData.deadline,
      benefits: jobData.benefits,
      skills: jobData.skills,
      orgId: jobData.company.orgId
    }
    try{
      if(!jwt) throw new Error("No JWT found");
      const response = await createJobPostDraft(jwt, body);
      if(response.success){
        toast.success("Job post draft created successfully");
        setDraftDialogOpen(false);
      }
    }catch(error){
      toast.error("Error creating job post draft");
      console.log("Error creating job post draft:", error);
    }
  }

  const handleJobPostCreate = async () => {
    const jwt = Cookies.get("jwt");
    const salaryString = jobData.minSalary === jobData.maxSalary ? `${jobData.currency.symbol}${jobData.minSalary}` : `${jobData.currency.symbol}${jobData.minSalary} - ${jobData.currency.symbol}${jobData.maxSalary}`;
    const body = {
      title: jobData.title,
      companyName: jobData.company.name,
      location: jobData.location,
      workType: jobData.workType,
      experienceLevel: jobData.experienceLevel,
      employmentType: jobData.employmentType,
      salary: salaryString,
      description: jobData.jobDescription,
      requirements: jobData.requirements,
      deadline: jobData.deadline,
      benefits: jobData.benefits,
      skills: jobData.skills,
      orgId: jobData.company.orgId
    }
    console.log(body)
    try{
      if(!jwt) throw new Error("No JWT found");
      const response = await createJobPost(jwt, body);
      if(response.success){
        toast.success("Job post created successfully");
        setDraftDialogOpen(false);
        handleCancel();
      }else{
        toast.error(response.message || "Error creating job post");
      }
    }catch(error){
      toast.error("Error creating job post");
      console.log("Error creating job post:", error);
    }
  }

  const validateDraftData = () => {
    // job title is compulsory, others are optional
    if(!jobData.title || jobData.title.trim() === ''){
      toast.error("Job title is required");
      return false;
    }
    return true;
  }

  const validateJobData = () => {
    if(!jobData.title || jobData.title.trim() === ''){
      toast.error("Job title is required");
      return false;
    }
    if(!jobData.company.name || jobData.company.name.trim() === ''){
      toast.error("Company name is required");
      return false;
    }
    if(!jobData.location || jobData.location.trim() === ''){
      toast.error("Location is required");
      return false;
    }
    if (!jobData.workType || jobData.workType.trim() === "") {
      toast.error("Work type is required");
      return false;
    }
    if (!jobData.experienceLevel || jobData.experienceLevel.trim() === "") {
      toast.error("Experience level is required");
      return false;
    }
    if (!jobData.employmentType || jobData.employmentType.trim() === "") {
      toast.error("Employment type is required");
      return false;
    }
    
    if(
      typeof jobData.minSalary !== 'number' ||
      typeof jobData.maxSalary !== 'number' ||
      jobData.minSalary < 0 ||
      jobData.maxSalary < 0 ||
      jobData.minSalary > jobData.maxSalary
    ){
      toast.error("Valid salary range is required");
      return false;
    }
    if (!jobData.jobDescription || jobData.jobDescription.trim() === "") {
      toast.error("Job description is required");
      return false;
    }
    if (!jobData.requirements || jobData.requirements.trim() === "") {
      toast.error("Job requirements are required");
      return false;
    }
    if (!jobData.deadline || new Date(jobData.deadline) < new Date()) {
      toast.error("Valid application deadline is required");
      return false;
    }
    

    return true;
  }

  const handleCancel = () => {
    setJobData({
      title: '',
      company: {
        name: '',
        orgId: 0
      },
      jobDescription : '',
      location: '',
      workType: '',
      experienceLevel: '',
      employmentType: '',
      currency: {
        name: '',
        symbol: ''
      },
      salary: 0,
      minSalary: 0,
      maxSalary: 0,

      requirements: '',
      benefits: '',
      skills: [] as string[],
      deadline: new Date(),
    });
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center space-x-3">
        {/* Icon */}
        <div
          className={`
          flex-shrink-0 p-2 rounded-lg transition-all duration-300
          bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary
        `}
        >
          <Briefcase />
        </div>

        {/* Text content */}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col">
            <span
              className={`
            font-semibold text-[18px] transition-colors duration-300 text-gray-800 group-hover:text-primary
            
          `}
            >
              Post a New Job
            </span>
            <span
              className={`
              text-xs mt-1 transition-colors duration-300 text-gray-500 group-hover:text-gray-600
              
            `}
            >
              Fill in the details below to create a new job listing.
            </span>
          </div>
          <Button variant={"outline"} className="cursor-pointer">
            {/* You can add an icon here if needed */}
            <Eye className="text-primary" />
            <span className="text-[14px] text-primary font-semibold">
              Preview
            </span>
          </Button>
        </div>
      </div>
      <BasicInfo jobData={jobData} setJobData={setJobData} />
      <JobDetails jobData={jobData} setJobData={setJobData} />
      <Skills jobData={jobData} setJobData={setJobData} />
      <div className="md:flex hidden flex-row items-center justify-between">
        <CancelDialog screenSize=" " handleCancel={handleCancel} />
        <div className="flex flex-row gap-4 items-center">
          <SubmitDialog
            screenSize=""
            handleSubmit={handleDraftCreate}
            submitText="Save as Draft"
            submitLoadingText="Saving..."
            description="You want to save as a draft"
            open={draftDialogOpen}
            setOpen={setDraftDialogOpen}
            disabled={false}
            onTriggerClick={(e) => {
              e.preventDefault();
              if(validateDraftData()) setDraftDialogOpen(true)
            }}
            variant="outline"
          />
          <SubmitDialog
            screenSize=""
            handleSubmit={handleJobPostCreate}
            submitText="Post Job"
            submitLoadingText="Saving..."
            description="You want to post the job"
            open={submitDialogOpen}
            setOpen={setSubmitDialogOpen}
            disabled={false}
            onTriggerClick={(e) => {
              e.preventDefault();
              if(validateJobData()) setSubmitDialogOpen(true)
            }}
            variant="default"
          />
        </div>
      </div>
      <div className="md:hidden flex flex-col gap-2">
        <CancelDialog screenSize="w-full" handleCancel={handleCancel} />
        <div className="flex w-full flex-col gap-2 items-center">
          <SubmitDialog
            screenSize="w-full"
            handleSubmit={handleDraftCreate}
            submitText="Save as Draft"
            submitLoadingText="Saving..."
            description="You want to save as a draft"
            open={draftDialogOpen}
            setOpen={setDraftDialogOpen}
            disabled={false}
            onTriggerClick={(e) => {
              e.preventDefault();
              if(validateDraftData()) setDraftDialogOpen(true)
            }}
            variant="outline"
          />
          <SubmitDialog
            screenSize="w-full"
            handleSubmit={handleJobPostCreate}
            submitText="Post Job"
            submitLoadingText="Saving..."
            description="You want to post the job"
            open={submitDialogOpen}
            setOpen={setSubmitDialogOpen}
            disabled={false}
            onTriggerClick={(e) => {
              e.preventDefault();
              if(validateJobData()) setSubmitDialogOpen(true)
            }}
            variant="default"
          />
        </div>
      </div>
    </div>
  );
}

export default NewJob
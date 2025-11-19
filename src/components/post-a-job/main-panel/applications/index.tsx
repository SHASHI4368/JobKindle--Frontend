"use client";

import React, { useEffect, useState } from "react";
import { ViewPostData, ViewPostsProps } from "@/types/jobPosts";
import JobDetailsCard from "./JobDetailsCard";
import ApplicationsTable from "./ApplicationsTable";
import ActionsBar from "./ActionsBar";
import Cookies from "js-cookie";
import { getJobPostById, getMyJobPosts } from "@/actions/jobPostActions";
import { Application } from "@/types/application";
import { getApplicationsByJobPostId } from "@/actions/applicationActions";
import SendEmailDialog from "./send-email-dialog";
import ScreeningResultsDialog from "./screening-result-dialog";


const ViewApplication = () => {
  const [jobData, setJobData] = useState<ViewPostData>({
    jobData: {
      basicInformation: {
        id: 0,
        jobTitle: "",
        companyName: "",
        companyLogo: "",
        location: "",
        workType: "",
        experienceLevel: "",
        employmentType: "",
        currency: "",
        salary: { min: 0, max: 0 },
      },
      jobDetails: {
        jobDescription: "",
        requirements: [""],
        benefits: "",
      },
      skills: [""],
      deadline: "",
    },
  });
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [triggerPipelineDialogOpen, setTriggerPipelineDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const toggleCandidate = (id: number) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const getCreatedPosts = async () => {
    console.log("Hi");
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try {
      const postId = Number(window.location.pathname.split("/").pop());
      const response = await getJobPostById(jwt, postId);
      if (response.success) {
        console.log("job post: ", response.data);
        const jobPost = response.data;
        const structuredPost = {
          jobData: {
            basicInformation: {
              id: jobPost.postId,
              jobTitle: jobPost.title,
              companyName: jobPost.companyName,
              companyLogo: jobPost.companyLogo,
              location: jobPost.location,
              workType: jobPost.workType,
              experienceLevel: jobPost.experienceLevel,
              employmentType: jobPost.employmentType,
              currency: jobPost.currency,
              salary: { min: jobPost.minSalary, max: jobPost.maxSalary },
            },
            jobDetails: {
              jobDescription: jobPost.description,
              requirements: jobPost.requirements,
              benefits: jobPost.benefits,
            },
            skills: jobPost.skills
              ? jobPost.skills.flat().map((skill: any) => skill.name)
              : [],
            deadline: jobPost.deadline,
          },
        };

        setJobData(structuredPost);
        // dispatch(setCreateJobPostsData(response.jobPosts || []));
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
    } finally {
    }
  };

  const fetchApplications = async () => {
    const jwt = Cookies.get("jwt") || "";
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }
    try {
      const postId = Number(window.location.pathname.split("/").pop());
      const response = await getApplicationsByJobPostId(jwt, postId);
      if (response.success) {
        console.log("applications: ", response.data);
        const applications = response.data;
        const formattedApplications: Application[] = applications.map(
          (app: any) => ({
            applicationId: app.applicationId,
            postId: app.postId,
            userEmail: app.userEmail,
            firstName: app.firstName,
            lastName: app.lastName,
            githubUrl: app.githubUrl,
            telephone: app.telephone,
            address: app.address,
            appliedAt: app.appliedAt,
            documentList: app.documentList,
            resumeScore: app.screeningScore,
            interviewScore: app.interviewScore,
            status: app.applicationStatus,
          })
        );
        setApplications(formattedApplications);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
    }
  };

  const getRequiredData = async () => {
    setLoading(true);
    await getCreatedPosts();
    await fetchApplications();
    setLoading(false);
  };

  useEffect(() => {
    getRequiredData();
  }, []);

  const toggleAll = () => {
    if (selectedCandidates.length === applications?.length) {
      setSelectedCandidates([]);
    } else {
      if(applications)
      setSelectedCandidates(applications.map((app) => app.applicationId));
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            {/* Loading spinner */}
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

            {/* Transition text */}
            <div className="text-primary font-semibold text-lg animate-pulse">
              Loading ...
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
      <div className="font-geist-sans  w-full px-[10vw] pt-[20px] flex flex-col ">
        <JobDetailsCard jobData={jobData} />

        <ActionsBar
          applicants={applications || []}
          selectedCount={selectedCandidates.length}
          totalCount={applications?.length || 0}
          onSendEmail={() => setEmailDialogOpen(true)}
          fetchApplications={fetchApplications}
        />

        <ApplicationsTable
          applications={applications || []}
          selectedCandidates={selectedCandidates}
          onToggleCandidate={toggleCandidate}
          onToggleAll={toggleAll}
        />
      </div>

      <SendEmailDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        selectedCount={selectedCandidates.length}
        selectedCandidates={selectedCandidates}
        allApplications={applications || []}
        fetchApplications={fetchApplications}
      />
    </>
  );
};

export default ViewApplication;

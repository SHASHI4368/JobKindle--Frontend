"use server";

import axios from "axios";
const Base_URL_jobPosts = process.env.Base_URL_jobPosts;

type NewJobType = {
  title?: string;
  companyName?: string;
  location?: string;
  workType?: string;
  experienceLevel?: string;
  employmentType?: string;
  salary?: string;
  description?: string;
  requirements?: string;
  deadline?: Date | undefined;
  benefits?: string;
  skills?: string[];
  orgId?: number;
};

export const createJobPostDraft = async (
  jwt: string,
  {
    title,
    companyName,
    location,
    workType,
    experienceLevel,
    employmentType,
    salary,
    description,
    requirements,
    deadline,
    benefits,
    skills,
    orgId,
  }: NewJobType,
) => {
  "use server";
  const url = `${Base_URL_jobPosts}/job-posts/draft`;
  console.log(url);
  try {
    const body: any = {};
    if (title) body.title = title;
    if (companyName) body.companyName = companyName;
    if (location) body.location = location;
    if (workType) body.workType = workType;
    if (experienceLevel) body.experienceLevel = experienceLevel;
    if (employmentType) body.employmentType = employmentType;
    if (salary) body.salary = salary;
    if (description) body.description = description;
    if (requirements) body.requirements = requirements;
    if (deadline) body.deadline = deadline;
    if (benefits) body.benefits = benefits;
    if (skills) body.skills = skills;
    if (orgId) body.orgId = orgId;

    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.log("error", error.response.data);
      return error.response.data;
    } else {
      console.log("error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

export const createJobPost = async (
  jwt: string,
  {
    title,
    companyName,
    location,
    workType,
    experienceLevel,
    employmentType,
    salary,
    description,
    requirements,
    deadline,
    benefits,
    skills,
    orgId,
  }: NewJobType,
) => {
  "use server";
  const url = `${Base_URL_jobPosts}/job-posts/create`;
  console.log(url);
  try {
    const body: any = {};
    if (title) body.title = title;
    if (companyName) body.companyName = companyName;
    if (location) body.location = location;
    if (workType) body.workType = workType;
    if (experienceLevel) body.experienceLevel = experienceLevel;
    if (employmentType) body.employmentType = employmentType;
    if (salary) body.salary = salary;
    if (description) body.description = description;
    if (requirements) body.requirements = requirements;
    if (deadline) body.deadline = deadline;
    if (benefits) body.benefits = benefits;
    if (skills) body.skills = skills;
    if (orgId) body.orgId = orgId;

    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.log("error1", error.response.data);
      return error.response.data;
    } else {
      console.log("error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

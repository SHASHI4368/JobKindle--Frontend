"use server";

import { ApplicationDocument } from "@/types/jobPosts";
import axios from "axios";
const Base_URL_jobPosts = process.env.Base_URL_jobPosts;

type NewJobType = {
  title?: string;
  companyName?: string;
  location?: string;
  workType?: string;
  experienceLevel?: string;
  employmentType?: string;
  minSalary?: number;
  maxSalary?: number;
  currency?: string;
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
    minSalary,
    maxSalary,
    currency,
    description,
    requirements,
    deadline,
    benefits,
    skills,
    orgId,
  }: NewJobType
) => {
  "use server";
  const url = `${Base_URL_jobPosts}/job-posts/drafts`;
  try {
    const body: any = {};
    if (title) body.title = title;
    if (companyName) body.companyName = companyName;
    if (location) body.location = location;
    if (workType) body.workType = workType;
    if (experienceLevel) body.experienceLevel = experienceLevel;
    if (employmentType) body.employmentType = employmentType;
    if (minSalary) body.minSalary = minSalary;
    if (maxSalary) body.maxSalary = maxSalary;
    if (currency) body.currency = currency;
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

export const updateJobPostDraft = async (
  jwt: string,
  draftId: number,
  {
    title,
    companyName,
    location,
    workType,
    experienceLevel,
    employmentType,
    minSalary,
    maxSalary,
    currency,
    description,
    requirements,
    deadline,
    benefits,
    skills,
    orgId,
  }: NewJobType
) => {
  "use server";
  const url = `${Base_URL_jobPosts}/job-posts/drafts/${draftId}`;
  try {
    const body: any = {};
    if (title) body.title = title;
    if (companyName) body.companyName = companyName;
    if (location) body.location = location;
    if (workType) body.workType = workType;
    if (experienceLevel) body.experienceLevel = experienceLevel;
    if (employmentType) body.employmentType = employmentType;
    if (minSalary) body.minSalary = minSalary;
    if (maxSalary) body.maxSalary = maxSalary;
    if (currency) body.currency = currency;
    if (description) body.description = description;
    if (requirements) body.requirements = requirements;
    if (deadline) body.deadline = deadline.toISOString().split("Z")[0];
    if (benefits) body.benefits = benefits;
    if (skills) body.skills = skills;
    if (orgId) body.orgId = orgId;
    console.log(body);
    const response = await axios.patch(url, body, {
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

export const getMyJobDrafts = async (jwt: string) => {
  "use server";
  const url = `${Base_URL_jobPosts}/job-posts/drafts`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
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
    minSalary,
    maxSalary,
    currency,
    description,
    requirements,
    deadline,
    benefits,
    skills,
    orgId,
  }: NewJobType
) => {
  "use server";
  const url = `${Base_URL_jobPosts}/job-posts/create`;
  try {
    const body: any = {};
    if (title) body.title = title;
    if (companyName) body.companyName = companyName;
    if (location) body.location = location;
    if (workType) body.workType = workType;
    if (experienceLevel) body.experienceLevel = experienceLevel;
    if (employmentType) body.employmentType = employmentType;
    if (minSalary) body.minSalary = minSalary;
    if (maxSalary) body.maxSalary = maxSalary;
    if (currency) body.currency = currency;
    if (description) body.description = description;
    if (requirements) body.requirements = requirements;
    if (deadline) body.deadline = deadline;
    if (benefits) body.benefits = benefits;
    if (skills) body.skills = skills;
    if (orgId) body.orgId = orgId;
    console.log(body);
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

export const getMyJobPosts = async (jwt: string) => {
  "use server";
  const url = `${Base_URL_jobPosts}/job-posts/me`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
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

export const getJobPostById = async (jwt: string, postId: number) => {
  "use server";
  const url = `${Base_URL_jobPosts}/job-posts/get/${postId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
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

export const updateJobPost = async (
  jwt: string,
  postId: number,
  {
    title,
    companyName,
    location,
    workType,
    experienceLevel,
    employmentType,
    minSalary,
    maxSalary,
    currency,
    description,
    requirements,
    deadline,
    benefits,
    skills,
    orgId,
  }: NewJobType
) => {
  "use server";
  const url = `${Base_URL_jobPosts}/job-posts/update/${postId}`;
  try {
    const body: any = {};
    if (title) body.title = title;
    if (companyName) body.companyName = companyName;
    if (location) body.location = location;
    if (workType) body.workType = workType;
    if (experienceLevel) body.experienceLevel = experienceLevel;
    if (employmentType) body.employmentType = employmentType;
    if (minSalary) body.minSalary = minSalary;
    if (maxSalary) body.maxSalary = maxSalary;
    if (currency) body.currency = currency;
    if (description) body.description = description;
    if (requirements) body.requirements = requirements;
    if (deadline) body.deadline = deadline.toISOString().split("Z")[0];
    if (benefits) body.benefits = benefits;
    if (skills) body.skills = skills;
    const response = await axios.patch(url, body, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.log("error2", error.response.data);
      return error.response.data;
    } else {
      console.log("error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

export const deleteJobPost = async (jwt: string, postId: number) => {
  "use server";
  const url = `${Base_URL_jobPosts}/job-posts/delete/${postId}`;
  console.log(url);
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
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

export const getAllActiveJobPosts = async (jwt: string) => {
  "use server";
  const url = `${Base_URL_jobPosts}/job-posts/get/filter`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
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

export const applyToJobPost = async (
  jwt: string,
  postId: number,
  documentList: ApplicationDocument[]
) => {
  "use server";
  const url = `${Base_URL_jobPosts}/applications/save`;
  try {
    const body = {
      postId,
      documentList
    };
    console.log(body);
    // const response = await axios.post(url, body, {
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //     "Content-Type": "application/json",
    //   },
    // });
    // return response.data;
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



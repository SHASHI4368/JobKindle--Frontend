"use server";

import { ApplicationDocument } from "@/types/jobPosts";
import axios from "axios";
const Base_URL_jobPosts = process.env.Base_URL_jobPosts;

export const getApplicationsByJobPostId = async (jwt: string, postId: number) => {
  "use server";
  const url = `${Base_URL_jobPosts}/applications/post/${postId}`;
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

export const getApplicationById = async (jwt: string, applicationId: number) => {
  "use server";
  const url = `${Base_URL_jobPosts}/applications/${applicationId}`;
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

export const triggerCVPipeline = async (id: number, jwt: string) => {
  "use server";
  const url = `${Base_URL_jobPosts}/screening/run/${id}`;
  try {
    const body: any = {};
    const response = await axios.post(url, body, {
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

export const getScreeningResult = async (email: string, jobPostId: number, jwt: string) => {
  "use server";
  const url = `${Base_URL_jobPosts}/screening/application/${jobPostId}/${email}`;
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



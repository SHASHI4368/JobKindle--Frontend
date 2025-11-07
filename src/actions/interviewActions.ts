"use server";

import { ApplicationDocument } from "@/types/jobPosts";
import axios from "axios";
const NextAPIURL = process.env.NextAPIURL;

export const getInterviewDetails = async (jwt: string, id: number) => {
  "use server";
  const url = `${NextAPIURL}/interviews/${id}`;
  try {
    const response = await axios.get(url);
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

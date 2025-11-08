"use server";

import { Conversation, Interview } from "@/types/interview";
import { ApplicationDocument } from "@/types/jobPosts";
import axios from "axios";
const NextAPIURL = process.env.NextAPIURL;
const agentURL = process.env.Agent_URL;

export const getInterviewDetails = async (id: number) => {
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

export const createInterview = async (
  {
    id,
    applicationID,
    startedAt,
    endedAt,
    status,
    conversation,
    violations,
  }: Interview
) => {
  "use server";
  const url = `${NextAPIURL}/interviews`;
  try {
    const body: any = {};
    if (applicationID) body.applicationID = applicationID;
    if (startedAt) body.startedAt = startedAt;
    if (endedAt) body.endedAt = endedAt;
    if (status) body.status = status;
    if (conversation) body.conversation = conversation;
    if (violations) body.violations = violations;

    const response = await axios.post(url, body);
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

export const updateConversation = async (
  applicationId: string,
  {
    text,
    isAI,
    timestamp,
  }: Conversation
) => {
  "use server";
  const url = `${NextAPIURL}/interviews/${applicationId}`;
  try {
    const body: any = {};
    if (text && isAI !== undefined && timestamp) {
      body.conversation = { text, isAI, timestamp };
    }

    const response = await axios.patch(url, body);
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

export const startGeneralInterview = async (email: string) => {
  const url = `${agentURL}/start_general_interview`;
  try {
    const response = await axios.post(url, { email });
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

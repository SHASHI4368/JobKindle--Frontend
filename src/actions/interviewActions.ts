"use server";

import { Conversation, Evaluation, Interview } from "@/types/interview";
import { ApplicationDocument } from "@/types/jobPosts";
import axios from "axios";
const NextAPIURL = process.env.NextAPIURL;
const agentURL = process.env.Agent_URL;
const Base_URL_jobPosts = process.env.Base_URL_jobPosts;

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

export const getMyInterviews = async (jwt: string) => {
  "use server";
  const url = `${Base_URL_jobPosts}/applications/interviews`;
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

export const createInterview = async ({
  id,
  applicationID,
  startedAt,
  endedAt,
  status,
  conversation,
  violations,
}: Interview) => {
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
  { text, isAI, isTechnical, timestamp }: Conversation
) => {
  "use server";
  const url = `${NextAPIURL}/interviews/${applicationId}`;
  try {
    const body: any = {};
    if (text && isAI !== undefined && timestamp) {
      body.conversation = { text, isAI, isTechnical, timestamp };
    }

    const response = await axios.patch(url, body);
    return response.data.data;
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

export const updateEvaluation = async (
  applicationId: string,
  evaluation: Evaluation
) => {
  "use server";
  const url = `${NextAPIURL}/interviews/${applicationId}`;
  try {
    const body: any = {};
    if (evaluation) {
      body.evaluation = evaluation;
    }
    body.status = "completed";
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

export const startTechnicalInterview = async (
  email: string,
  job_description: string
) => {
  const url = `${agentURL}/start_interview`;
  try {
    const response = await axios.post(url, { email, job_description });
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

type QAHistory = {
  question: string;
  answer: string;
}[];


export const answerGeneralInterview = async (
  email: string,
  question: string,
  answer: string,
  qa_history: QAHistory
) => {
  console.log("hi");
  const url = `${agentURL}/answer_general`;
  try {
    const response = await axios.post(url, { email, question, answer, qa_history });
    console.log(response.data);
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


export const answerTechnicalInterview = async (
  email: string,
  qa_history: QAHistory
) => {
  const url = `${agentURL}/next_question`;
  try {
    const response = await axios.post(url, { email, qa_history });
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

import { createSlice } from "@reduxjs/toolkit";
import { InterviewDetails } from "@/types/interview";

const initialState: InterviewDetails = {
  jobPost: {
    postId: -1,
    title: "",
    companyName: "",
    companyLogo: undefined,
    location: "",
    workType: "",
    experienceLevel: "",
    employmentType: "",
    description: "",
  },
};

export const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setInterviewJobPost: (state, action) => {
      state.jobPost = { ...state.jobPost, ...action.payload };
    },
  },
});

export const { setInterviewJobPost } = interviewSlice.actions;
export default interviewSlice.reducer;

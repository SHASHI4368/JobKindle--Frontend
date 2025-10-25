import { createSlice } from "@reduxjs/toolkit";
import { CreateJobPosts } from "@/types/createJobPosts";

const initialState: CreateJobPosts = {
  jobPosts: [],
};

export const createJobPostsSlice = createSlice({
  name: "createJobPosts",
  initialState,
  reducers: {

    setCreateJobPostsData: (state, action) => {
      state.jobPosts = action.payload;
    },
  },
});

export const { setCreateJobPostsData } = createJobPostsSlice.actions;
export default createJobPostsSlice.reducer;

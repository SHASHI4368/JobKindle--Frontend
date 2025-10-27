import { FindJobs } from "@/types/jobPosts";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FindJobs = {
  jobSearchDialogOpen: false,
  jobPosts: [],
};

export const findJobsSlice = createSlice({
  name: "findJobs",
  initialState,
  reducers: {

    setJobSearchDialogOpen: (state, action) => {
      state.jobSearchDialogOpen = action.payload;
    },
    setFindJobsPostsData: (state, action) => {
      state.jobPosts = action.payload;
    }
  },
});

export const { setJobSearchDialogOpen, setFindJobsPostsData } = findJobsSlice.actions;
export default findJobsSlice.reducer;

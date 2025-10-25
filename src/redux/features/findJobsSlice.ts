import { createSlice } from "@reduxjs/toolkit";
import { FindJobs } from "@/types/findJobs";

const initialState: FindJobs = {
  jobSearchDialogOpen: false,
};

export const findJobsSlice = createSlice({
  name: "findJobs",
  initialState,
  reducers: {

    setJobSearchDialogOpen: (state, action) => {
      state.jobSearchDialogOpen = action.payload;
    },
  },
});

export const { setJobSearchDialogOpen } = findJobsSlice.actions;
export default findJobsSlice.reducer;

"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import accountReducer from "./features/accountSlice";
import organizationReducer from "./features/organizationSlice";
import findJobsReducer from "./features/findJobsSlice";
import createJobPostsReducer from "./features/createJobPostsSlice";
import profileReducer from "./features/profileSlice";
import interviewReducer from "./features/interviewSlice";



const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  profile: profileReducer,
  findJobs: findJobsReducer,
  createJobPosts: createJobPostsReducer,
  organization: organizationReducer,
  interview: interviewReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

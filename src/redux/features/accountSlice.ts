import { createSlice } from "@reduxjs/toolkit";
import { Account } from "@/types/account";

const initialState: Account = {
  imageUploadDialogOpen: false,
  isProfileEditing: false,
  profile: {
    email: null,
    firstname: null,
    lastname: null,
    location: null,
    phone: null,
    profilePic: null,
    jobTitle: null,
    bio: null,
    linkedin: null,
    experience: null,
    education: null,
    website: null,
    resume: null,
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountImageUploadDialogOpen: (state, action) => {
      state.imageUploadDialogOpen = action.payload;
    },
    setIsProfileEditing: (state, action) => {
      state.isProfileEditing = action.payload;
    },
    setProfileDetails: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const {
  setAccountImageUploadDialogOpen,
  setIsProfileEditing,
  setProfileDetails,
} = accountSlice.actions;
export default accountSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { Account } from "@/types/account";
import { Organization } from "@/types/organization";

const initialState: Organization = {
  imageUploadDialogOpen: false,
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganizationImageUploadDialogOpen: (state, action) => {
      state.imageUploadDialogOpen = action.payload;
    },
  },
});

export const { setOrganizationImageUploadDialogOpen } = organizationSlice.actions;
export default organizationSlice.reducer;

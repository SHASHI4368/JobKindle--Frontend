import { createSlice } from "@reduxjs/toolkit";
import { Account } from "@/types/account";
import { Organization } from "@/types/organization";

const initialState: Organization = {
  imageUploadDialogOpen: false,
  myOrganizations: [],
  selectedOrganization: null,
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganizationImageUploadDialogOpen: (state, action) => {
      state.imageUploadDialogOpen = action.payload;
    },
    setOrganizationMyOrganizations: (state, action) => {
      state.myOrganizations = action.payload;
    },
    addOrganization: (state, action) => {
      state.myOrganizations.push(action.payload);
    },
    removeOrganization: (state, action) => {
      state.myOrganizations = state.myOrganizations.filter(
        (org) => org.orgId !== action.payload
      );
    },
    setSelectedOrganization: (state, action) => {
      state.selectedOrganization = { ...state.selectedOrganization, ...action.payload};
    },
  },
});

export const {
  setOrganizationImageUploadDialogOpen,
  setOrganizationMyOrganizations,
  addOrganization,
  removeOrganization,
  setSelectedOrganization,
} = organizationSlice.actions;
export default organizationSlice.reducer;

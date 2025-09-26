import { createSlice } from "@reduxjs/toolkit";
import { Account } from "@/types/account";

const initialState: Account = {
  imageUploadDialogOpen: false,
  isProfileEditing: false,
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
    }
  },
});

export const { setAccountImageUploadDialogOpen, setIsProfileEditing } = accountSlice.actions;
export default accountSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { Account } from "@/types/account";

const initialState: Account = {
  imageUploadDialogOpen: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {

    setAccountImageUploadDialogOpen: (state, action) => {
      state.imageUploadDialogOpen = action.payload;
    },
  },
});

export const { setAccountImageUploadDialogOpen } = accountSlice.actions;
export default accountSlice.reducer;

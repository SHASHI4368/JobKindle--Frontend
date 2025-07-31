import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "@/types/auth";

const initialState: Auth = {
  isLogin: true,
  dialogOpen: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setLoginDialogOpen: (state, action) => {
      state.dialogOpen = action.payload;
    },
  },
});

export const { setLogin, setLoginDialogOpen } = authSlice.actions;
export default authSlice.reducer;

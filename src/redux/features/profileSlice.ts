import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "@/types/auth";
import { Profile } from "@/types/profile";

const initialState: Profile = {
  email: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setProfileEmail } = profileSlice.actions;
export default profileSlice.reducer;

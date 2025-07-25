import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
  },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;

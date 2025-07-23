import { createSlice } from "@reduxjs/toolkit";

const storedLanguage = localStorage.getItem("userLang");

const initialState = {
  userLang: storedLanguage || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLang: (state, action) => {
      state.userLang = action.payload;
      localStorage.setItem("userLang", action.payload);
    },
  },
});

export const { setUserLang } = userSlice.actions;

export default userSlice.reducer;

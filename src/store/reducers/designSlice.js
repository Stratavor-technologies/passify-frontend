import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formValues: {
    picked_stamps_image: "",
    strip_bg_image: "",
    un_stamps_image: "",
    icon_image: "",
    logo_image: "",
  },
  btnLoading: false,
  selectedValue: null,
  stampCount: "",
  id: null,
  cardID: null,
};

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    resetForm: () => initialState,
    saveFormValues: (state, action) => {
      state.formValues = action.payload;
    },
    saveId: (state, action) => {
      state.id = action.payload;
    },
    userCardID: (state, action) => {
      state.cardID = action.payload;
    },
  },
});

export const { saveFormValues, saveId, resetForm, userCardID } =
  designSlice.actions;

export default designSlice.reducer;

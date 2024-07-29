import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSheetOpen: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    openSheet: (state) => {
      state.isSheetOpen = true;
    },
    closeSheet: (state) => {
      state.isSheetOpen = false;
    },
  },
});

export const { openSheet, closeSheet } = toggleSlice.actions;
export default toggleSlice.reducer;

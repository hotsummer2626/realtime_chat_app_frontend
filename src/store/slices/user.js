import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    selectedDialogUser: null,
  },
  reducers: {
    setSelectedDialogUser(state, action) {
      state.selectedDialogUser = action.payload;
    },
  },
});

export const { setSelectedDialogUser } = userSlice.actions;

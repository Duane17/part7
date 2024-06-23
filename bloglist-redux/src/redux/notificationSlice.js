import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: () => {
      return { message: null, type: null };
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;

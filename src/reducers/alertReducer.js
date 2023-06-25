import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alerts: [],
  },
  reducers: {
    createSuccess: (state, action) => {
      state.alerts.push({
        message: action.payload,
        type: "success",
      });
    },
    createError: (state, action) => {
      state.alerts.push({
        message: action.payload,
        type: "error",
      });
    },
    createProcessing: (state, action) => {
      state.alerts.push({
        message: action.payload,
        type: "processing",
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { createSuccess, createError, createProcessing } =
  alertSlice.actions;

export default alertSlice.reducer;

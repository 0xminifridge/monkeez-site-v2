import { createSlice } from "@reduxjs/toolkit";

export const cratezSlice = createSlice({
  name: "cratez",
  initialState: {
    ids: [],
    hasFetched: false,
    address: null,
  },
  reducers: {
    replaceAll: (state, action) => {
      state.ids = action.payload.ids;
      state.hasFetched = action.payload.hasFetched;
      state.address = action.payload.address;
    },
  },
});

// Action creators are generated for each case reducer function
export const { replaceAll } = cratezSlice.actions;

export default cratezSlice.reducer;

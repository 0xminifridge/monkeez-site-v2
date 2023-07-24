import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filters",
  initialState: {
    zoogz: {},
  },
  reducers: {
    setZoogzFilters: (state, action) => {
      state.zoogz.direction = action.payload.direction;
      state.zoogz.filter = action.payload.filter;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setZoogzFilters } = filterSlice.actions;

export default filterSlice.reducer;

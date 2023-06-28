import { createSlice } from "@reduxjs/toolkit";

export const zscoreLeaderboard = createSlice({
  name: "zscoreLeaderboard",
  initialState: {
    items: [],
    lastVisibleId: null,
    hasFetched: false,
  },
  reducers: {
    addItems: (state, action) => {
      state.items.push(...action.payload);
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setLastId: (state, action) => {
      state.lastVisibleId = action.payload;
    },
    setHasFetched: (state, action) => {
      state.hasFetched = action.payload;
    },
    replaceAll: (state, action) => {
      state.items = action.payload.items;
      state.lastVisibleId = action.payload.lastVisibleId;
      state.hasFetched = action.payload.hasFetched;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItems, setItems, setLastId, setHasFetched, replaceAll } =
  zscoreLeaderboard.actions;

export default zscoreLeaderboard.reducer;

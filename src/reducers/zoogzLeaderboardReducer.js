import { createSlice } from "@reduxjs/toolkit";

export const zoogzLeaderboardSlice = createSlice({
  name: "zoogzLeaderboard",
  initialState: {
    items: [],
    direction: "down",
    filterStat: "wins",
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
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
    setFilterStat: (state, action) => {
      state.filterStat = action.payload;
    },
    setLastId: (state, action) => {
      state.lastVisibleId = action.payload;
    },
    clearLastId: (state, action) => {
      state.lastVisibleId = null;
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
export const {
  addItems,
  setItems,
  setHasFetched,
  replaceAll,
  setDirection,
  setFilterStat,
  setLastId,
  clearLastId,
} = zoogzLeaderboardSlice.actions;

export default zoogzLeaderboardSlice.reducer;

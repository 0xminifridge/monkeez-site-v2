import { createSlice } from "@reduxjs/toolkit";

// reducer to handle any weird UI interactions and other misc things in the site
export const zungleSlice = createSlice({
  name: "zungle",
  initialState: {
    zungleActiveTab: "Monkeez",
    profilePfps: {},
  },
  reducers: {
    setZungleActiveTab: (state, action) => {
      state.zungleActiveTab = action.payload;
    },
    setProfilePfp: (state, action) => {
      state.profilePfps[action.payload.address] = action.payload.url;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setZungleActiveTab, setProfilePfp } = zungleSlice.actions;

export default zungleSlice.reducer;

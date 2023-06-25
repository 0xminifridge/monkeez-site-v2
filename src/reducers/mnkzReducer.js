import { createSlice } from "@reduxjs/toolkit";

export const mnkzSlice = createSlice({
  name: "mnkz",
  initialState: {
    claimableBalance: 0,
    hasFetched: false,
    address: null,
  },
  reducers: {
    replaceAll: (state, action) => {
      state.claimableBalance = action.payload.claimableBalance;
      state.hasFetched = action.payload.hasFetched;
      state.address = action.payload.address;
    },
    setClaimableBalance: (state, action) => {
      state.claimableBalance = action.payload;
    },
    setHasFetched: (state, action) => {
      state.hasFetched = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload.address;
    },
  },
});

// Action creators are generated for each case reducer function
export const { replaceAll, setClaimableBalance, setHasFetched, setAddress } =
  mnkzSlice.actions;

export default mnkzSlice.reducer;

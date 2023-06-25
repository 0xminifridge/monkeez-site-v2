import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    address: null,
    chainId: null,
    avaxBalance: 0,
    mnkzBalance: 0,
    linkBalance: 0,
    vanityDomain: null,
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setChain: (state, action) => {
      state.chainId = action.payload;
    },
    setAvaxBalance: (state, action) => {
      state.avaxBalance = action.payload;
    },
    setMnkzBalance: (state, action) => {
      state.mnkzBalance = action.payload;
    },
    setLinkBalance: (state, action) => {
      state.linkBalance = action.payload;
    },
    setVanityDomain: (state, action) => {
      state.vanityDomain = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAddress,
  setChain,
  setAvaxBalance,
  setMnkzBalance,
  setLinkBalance,
  setVanityDomain,
} = accountSlice.actions;

export default accountSlice.reducer;

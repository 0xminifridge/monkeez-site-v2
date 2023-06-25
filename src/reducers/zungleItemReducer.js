import { createSlice } from "@reduxjs/toolkit";

export const zungleItemReducer = createSlice({
  name: "zungleItems",
  initialState: {
    items: [],
    hasFetched: false,
    address: null,
  },
  reducers: {
    replaceAll: (state, action) => {
      state.items = action.payload.items;
      state.hasFetched = action.payload.hasFetched;
      state.address = action.payload.address;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setHasFetched: (state, action) => {
      state.hasFetched = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { replaceAll, setItems, setHasFetched, setAddress } =
  zungleItemReducer.actions;

export default zungleItemReducer.reducer;

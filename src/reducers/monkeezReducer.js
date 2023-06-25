import { createSlice } from "@reduxjs/toolkit";

export const monkeezSlice = createSlice({
  name: "monkeez",
  initialState: {
    items: [], // array of ids of monkeez owned
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
    updateStakeInfo: (state, action) => {
      const { itemId, stakeTs, claimable } = action.payload;
      const updatedItems = state.items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            ...stakeTs,
            ...claimable,
          };
        }
        return item;
      });
      state.items = updatedItems;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  replaceAll,
  setItems,
  setHasFetched,
  setAddress,
  updateStakeInfo,
} = monkeezSlice.actions;

export default monkeezSlice.reducer;

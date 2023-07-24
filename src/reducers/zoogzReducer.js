import { createSlice } from "@reduxjs/toolkit";

export const zoogzSlice = createSlice({
  name: "zoogz",
  initialState: {},
  reducers: {
    replaceAll: (state, action) => {
      const { address, items, hasFetched, isLoading } = action.payload;
      state[address] = { items, hasFetched, isLoading };
    },
    setZoogz: (state, action) => {
      const { address, items } = action.payload;
      if (state[address]) {
        state[address].items = items;
      } else {
        state[address] = { items: items };
      }
    },
    setHasFetched: (state, action) => {
      const { address, hasFetched } = action.payload;
      if (state[address]) {
        state[address].hasFetched = hasFetched;
      } else {
        state[address] = { hasFetched: hasFetched };
      }
    },
    setIsLoading: (state, action) => {
      const { address, isLoading } = action.payload;
      if (state[address]) {
        state[address].isLoading = isLoading;
      } else {
        state[address] = { isLoading: isLoading };
      }
    },
    updateItem: (state, action) => {
      const { address, item: updatedItem } = action.payload;
      const updatedItems = state[address].items?.map((item) =>
        item?.id === updatedItem?.id ? updatedItem : item
      );
      return {
        ...state,
        [address]: {
          ...state[address],
          items: updatedItems,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { replaceAll, setZoogz, setHasFetched, setIsLoading, updateItem } =
  zoogzSlice.actions;

export default zoogzSlice.reducer;

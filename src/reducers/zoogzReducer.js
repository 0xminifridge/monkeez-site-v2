import { createSlice } from "@reduxjs/toolkit";

export const zoogzSlice = createSlice({
  name: "zoogz",
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
    updateItem: (state, action) => {
      let updatedItem = action.payload;
      state.items.map((item) =>
        item?.id === updatedItem?.id ? updatedItem : item
      );
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
export const { replaceAll, setItems, setHasFetched, setAddress, updateItem } =
  zoogzSlice.actions;

export default zoogzSlice.reducer;

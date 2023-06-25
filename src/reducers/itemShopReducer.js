import { createSlice } from "@reduxjs/toolkit";

export const itemShopSlice = createSlice({
  name: "itemShop",
  initialState: {
    items: [],
    cartItems: [],
    isLoading: false,
    hasFetched: false,
  },
  reducers: {
    replaceAll: (state, action) => {
      state.items = action.payload.items;
      state.isLoading = action.payload.isLoading;
      state.hasFetched = action.payload.hasFetched;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const index = action.payload;
      state.cartItems.splice(index, 1);
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setHasFetched: (state, action) => {
      state.hasFetched = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  replaceAll,
  setItems,
  setIsLoading,
  setHasFetched,
  addToCart,
  setCartItems,
  clearCart,
  removeFromCart,
} = itemShopSlice.actions;

export default itemShopSlice.reducer;

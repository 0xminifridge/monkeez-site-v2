import { createSlice } from "@reduxjs/toolkit";

export const popupSlice = createSlice({
  name: "popup",
  initialState: {
    currentState: 1,
    nextState: null,
    prevState: null,
  },
  reducers: {
    replaceAll: (state, action) => {
      state.currentState = action.payload.currentState;
      state.nextState = action.payload.nextState;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setNextState: (state, action) => {
      state.nextState = action.payload;
    },
    setPrevState: (state, action) => {
      state.prevState = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { replaceAll, setCurrentState, setNextState, setPrevState } =
  popupSlice.actions;

export default popupSlice.reducer;

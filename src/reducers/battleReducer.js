import { createSlice } from "@reduxjs/toolkit";

export const battleSlice = createSlice({
  name: "filters",
  initialState: {
    activeBattles: [],
    lastId: null,
  },
  reducers: {
    setLastId: (state, action) => {
      return {
        ...state,
        lastId: action.payload,
      };
    },
    setActiveBattles: (state, action) => {
      const { battles } = action.payload;
      return {
        ...state,
        activeBattles: battles,
      };
    },
    addActiveBattles: (state, action) => {
      const { battles } = action.payload;
      return {
        ...state,
        activeBattles: [...state.activeBattles, ...battles],
      };
    },
    removeActiveBattle: (state, action) => {
      const { battleId } = action.payload;
      const updatedBattles = state.activeBattles?.filter(
        (item) => item?.id !== battleId
      );
      return {
        ...state,
        activeBattles: updatedBattles,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLastId,
  setActiveBattles,
  addActiveBattles,
  removeActiveBattle,
} = battleSlice.actions;

export default battleSlice.reducer;

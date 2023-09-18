import { createSlice } from "@reduxjs/toolkit";

export const amm = createSlice({
  name: "amm",
  initialState: {
    contract: null,
    shares: 0,
    swaps: [],
  },
  reducers: {
    setContracts: (state, action) => {
      state.contract = action.payload;
    },
  },
});

export const { setContract } = amm.actions;

export default tokens.reducer;

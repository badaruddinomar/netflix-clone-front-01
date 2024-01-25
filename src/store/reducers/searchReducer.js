import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedValue: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchValueAction: (state, action) => {
      state.searchedValue = action.payload;
    },
  },
});

export const { searchValueAction } = searchSlice.actions;
export default searchSlice.reducer;

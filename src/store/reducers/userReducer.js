import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

const userReducer = createSlice({
  initialState,
  name: "userReducer",
  reducers: {
    userLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    userSignoutAction: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
  },
});
export const { userLoginAction, userSignoutAction } = userReducer.actions;
export default userReducer.reducer;

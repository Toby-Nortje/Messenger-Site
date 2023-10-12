import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
}; // Set's default state

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      //Used to change mode between light and dark
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      //Used to add the user and token to state aka login
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      //Used to remove the user and token from state aka logout
      state.user = null;
      state.token = null;
    },
  },
});

export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;

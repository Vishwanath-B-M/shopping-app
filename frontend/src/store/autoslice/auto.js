
import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("token");

const initialState = {
  // ignore the old fake value "logged-in"
  token: saved && saved !== "logged-in" ? saved : null,
};

const autoSlice = createSlice({
  name: "auto",
  initialState,
  reducers: {
    loginSuceess: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", String(action.payload));
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuceess, logout } = autoSlice.actions;
export default autoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
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

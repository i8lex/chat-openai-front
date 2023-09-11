import { createSlice } from "@reduxjs/toolkit";
type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  userId: string;
};

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  userId: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userId = "";
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;

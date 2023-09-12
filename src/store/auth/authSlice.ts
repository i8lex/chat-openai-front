import { createSlice } from "@reduxjs/toolkit";
type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  id: number | null;
};

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  id: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.id = action.payload.id;
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.id = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;

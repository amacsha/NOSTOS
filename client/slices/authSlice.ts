import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Auth } from "../client-types/Auth"

export const initialState: Auth = {
  isAuthenticated: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean; token: string | null }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;

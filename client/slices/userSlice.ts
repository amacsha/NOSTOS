import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../client-types/User";

export const initialState: UserState = {
  id: null,
  email: null,
  username: null,
  filter_preference: null,
  isAuthenticated: false,
  firstLogin: true,
  entryIds: [],
  ratingIds: [],
  commentIds: [],
  lastVisitedIds: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.filter_preference = action.payload.filter_preference;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.email = null;
      state.username = null;
      state.filter_preference = null;
      state.isAuthenticated = false;
    },
    updateUserDetails: (state, action: PayloadAction<Partial<UserState>>) => {
      state.id = action.payload.id || null
      state.email = action.payload.email ?? state.email;
      state.username = action.payload.username ?? state.username;
      state.filter_preference =
        action.payload.filter_preference ?? state.filter_preference;
    },
    updateFilterPreference: (state, action: PayloadAction<string>) => {
      state.filter_preference = action.payload;
    },
    updateLastVisitedIds: (state, action: PayloadAction<number[]>) => {
      state.lastVisitedIds = action.payload;
    },
    updateFirstLogin: (state) => {
      state.firstLogin = false;
    }
  },
});

export const { login, logout, updateUserDetails, updateFilterPreference, updateFirstLogin } =
  userSlice.actions;

export default userSlice.reducer;

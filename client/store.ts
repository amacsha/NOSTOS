import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import locationSlice from "./slices/locationSlice";
import entriesSlice from "./slices/entriesSlice";
import placesSlice from "./slices/placesSlice";
import commentsSlice from "./slices/commentsSlice";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    location: locationSlice,
    entries: entriesSlice,
    places: placesSlice,
    comments: commentsSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

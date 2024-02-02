import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import locationSlice from "./slices/locationSlice";
import entriesSlice from "./slices/entriesSlice";
import placesSlice from "./slices/placesSlice";


// ...

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    location: locationSlice,
    entries: entriesSlice,
    places: placesSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

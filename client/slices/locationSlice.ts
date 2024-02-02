import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coords } from "../client-types/Coords";

type PositionState = {
  value: Coords & {cityName: String} | null;
};

const initialState: PositionState = {
  value: null,
};

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Coords  & {cityName: String} | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;

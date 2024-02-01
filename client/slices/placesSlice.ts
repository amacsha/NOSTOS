import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Place } from "../client-types/Place";

type PlacesState = {
  places: Record<number, Place>;
  selectedPlaceId: number | null;
};

const initialState: PlacesState = {
  places: {},
  selectedPlaceId: null,
};

export const PlacesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces: (state, action: PayloadAction<Place[]>) => {
      const placesObject = action.payload.reduce<Record<number, Place>>(
        (obj, place) => {
          obj[place.id] = place;
          return obj;
        },
        {}
      );
      state.places = placesObject;
    },
    selectPlace: (state, action: PayloadAction<number>) => {
      state.selectedPlaceId = action.payload;
    },
    clearSelectedPlace: (state) => {
      state.selectedPlaceId = null;
    },
  },
});

export const { setPlaces, selectPlace, clearSelectedPlace } =
  PlacesSlice.actions;

export default PlacesSlice.reducer;

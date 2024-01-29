import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Place } from "../client-types/Place"

type PlacesState = {
  places: { [id: number]: Place };
  selectedPlaceId: number | null;
};

const initialState : PlacesState = {
  places: {},
  selectedPlaceId: null,
};

export const PlacesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setPlaces: (state, action: PayloadAction<Place[]>) => {
      action.payload.forEach((place) => {
        state.places[place.id] = place;
      });
    },
    selectPlace: (state, action: PayloadAction<number>) => {
      state.selectedPlaceId = action.payload;
    },
    clearSelectedPlace: (state) => {
      state.selectedPlaceId = null;
    },
  },
}); 

export const { setPlaces, selectPlace, clearSelectedPlace } = PlacesSlice.actions;

export default PlacesSlice.reducer;
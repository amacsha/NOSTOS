import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Place } from "../client-types/Place";

type PlacesState = {
  places: Place[];
  selectedPlaceId: string | null;
  selectedPlaceName: string | null;
};

const initialState: PlacesState = {
  places: [],
  selectedPlaceId: null,
  selectedPlaceName: null,
};

export const PlacesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces: (state, action: PayloadAction<Place[]>) => {
      state.places = action.payload;
    },
    selectPlace: (state, action: PayloadAction<string | null>) => {
      state.selectedPlaceId = action.payload;
    },
    setPlaceName: (state, action: PayloadAction<string | null>) => {
      state.selectedPlaceName = action.payload;
    },
    clearSelectedPlace: (state) => {
      state.selectedPlaceId = null;
    },
  },
});

export const { setPlaces, selectPlace, setPlaceName, clearSelectedPlace } =
  PlacesSlice.actions;

export default PlacesSlice.reducer;

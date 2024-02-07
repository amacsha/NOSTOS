import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../client-types/Entry";
import { Comment } from "../client-types/Comment";
import { Rating } from "../client-types/Rating";
import { Place } from "../client-types/Place";

type EntriesState = {
  selectedEntryID: undefined | number;
  activeMission: Place[]
};
const initialState: EntriesState = {
  selectedEntryID: undefined,
  activeMission: []
};

export const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    selectEntry: (state, action: PayloadAction<number>) => {
      state.selectedEntryID = action.payload;
    },
    setActiveMission: (state, action: PayloadAction<Place[]>) => {
      state.activeMission = action.payload
    }
    // addRatingToEntry: (state, action: PayloadAction<{ entryId: number; rating: Rating }>) => {
    //   const entry = state.entries[action.payload.entryId];
    //   if (entry) {
    //     entry.ratingIds = [...entry.ratingIds, action.payload.rating.raterId];
    //   }
    // },
    // addCommentToEntry: (state, action: PayloadAction<{ entryId: number; comment: Comment }>) => {
    //   const entry = state.entries[action.payload.entryId];
    //   if (entry) {
    //     entry.commentIds = [...entry.commentIds, action.payload.comment.commenterId];
    //   }
    // },

  },
});

export const { selectEntry, setActiveMission } = entriesSlice.actions

export default entriesSlice.reducer;
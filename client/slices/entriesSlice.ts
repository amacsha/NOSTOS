import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../client-types/Entry";
import { Comment } from "../client-types/Comment";
import { Rating } from "../client-types/Rating";

type EntriesState = {
  entries: { [id: number]: Entry };
};


const initialState: EntriesState = {
  entries: {},
};

export const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<Entry>) => {
      // state.entries[action.payload.id] = action.payload;
    },
    addRatingToEntry: (state, action: PayloadAction<{ entryId: number; rating: Rating }>) => {
      const entry = state.entries[action.payload.entryId];
      if (entry) {
        // entry.ratingIds = [...entry.ratingIds, action.payload.rating.raterId];
      }
    },
    addCommentToEntry: (state, action: PayloadAction<{ entryId: number; comment: Comment }>) => {
      const entry = state.entries[action.payload.entryId];
      if (entry) {
        // entry.commentIds = [...entry.commentIds, action.payload.comment.commenterId];
      }
    },

  },
});

export default entriesSlice.reducer;

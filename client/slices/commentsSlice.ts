import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../client-types/Comment";

type CommentsState = Comment[]

const initialState: CommentsState = [];

export const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return action.payload
    },
  }
})

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;

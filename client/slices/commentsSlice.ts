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
    addOneComment: (state, action: PayloadAction<Comment>) => {
      return [...state, action.payload]
    }
  }
})

export const { setComments, addOneComment } = commentsSlice.actions;
export default commentsSlice.reducer;

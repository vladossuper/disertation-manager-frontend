import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Comment = {
  comment_id: string;
  description: string,
  author: string,
  creation_date: Date,
  comment_to_file: string,
  reply_to_comment?: string,
  user_id: string,
  task_id: string,
}

type InitialState = {
  comments: Array<Comment> | null,
}

const initialState: InitialState = {
  comments: null,
};

export const scopeSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, { payload }: PayloadAction<Array<Comment> | null>) => {
      state.comments = payload;
    }
  }
});

export const { actions, reducer: commentsReducer } = scopeSlice;
export const { setComments } = actions;
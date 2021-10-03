import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type File = {
  file_id: string;
  original_name: string,
  file_name: string,
  file_path: string;
  task_id: string;
  user_id: string;
  comment?: string;
}

type InitialState = {
  files: Array<File> | null,
}

const initialState: InitialState = {
  files: null,
};

export const scopeSlice = createSlice({
  name: 'scope',
  initialState,
  reducers: {
    setFiles: (state, { payload }: PayloadAction<Array<File> | null>) => {
      state.files = payload;
    }
  }
});

export const { actions, reducer: filesReducer } = scopeSlice;
export const { setFiles } = actions;
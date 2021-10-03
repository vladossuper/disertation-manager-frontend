import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Scope = {
  scope_id: string;
  name: string;
  date_start: Date;
  date_end: Date;
  created_by_user: string
}

type InitialState = {
  scopes: Array<Scope> | null,
  creationStatus: number | null,
}

const initialState: InitialState = {
  scopes: null,
  creationStatus: null,
};

export const scopeSlice = createSlice({
  name: 'scope',
  initialState,
  reducers: {
    setCreationStatus: (state, { payload }: PayloadAction<number | null>) => {
      state.creationStatus = payload;
    },
    setScopes: (state, { payload }: PayloadAction<Array<Scope> | null>) => {
      state.scopes = payload;
    }
  }
});

export const { actions, reducer: scopeReducer } = scopeSlice;
export const { setCreationStatus, setScopes } = actions;
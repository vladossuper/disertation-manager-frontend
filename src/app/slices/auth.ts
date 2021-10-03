import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './user';

type InitialState = {
  token: string | null;
  user_id: string | null;
};

const initialState: InitialState = {
  token: localStorage.getItem('token') || null,
  user_id: null || localStorage.getItem('user_id'),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, { payload }: PayloadAction<{ user_id: string }>) => {
      const { user_id } = payload;
      state.user_id = user_id;
    },
    setToken: (state, { payload }: PayloadAction<{ token: string | null }>) => {
      state.token = payload.token;
    }
  }
});

export const { actions, reducer: authReducer } = authSlice;
export const { setUserId, setToken } = actions;
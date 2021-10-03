import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../thunk/auth';

export type User = {
  name: string;
  surname: string;
  email: string;
  role: Role;
  user_id: string;
};

type InitialState = {
  user: User | null;
  users: Array<User> | null;
};

const initialState: InitialState = {
  user: null,
  users: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload;
    },
    setUsersList: (state, { payload }: PayloadAction<Array<User> | null>) => {
      state.users = payload;
    }
  }
});

export const { actions, reducer: userReducer } = userSlice;
export const { setUserInfo, setUsersList } = actions;
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { api } from "../api";
import { setUserInfo, setUsersList } from "../slices/user";
import { Role } from "./auth";

export const user = createAsyncThunk('user', async ({ user_id }: { user_id: string }, thunkAPI) => {
  try {
    const response = await api.get({ path: '/user', params: { user_id } });

    const { user } = response.data;

    thunkAPI.dispatch(setUserInfo(user));
  } catch (err) {
    toast.error('Something went wrong', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
});

export const users = createAsyncThunk('users', async ({ role }: { role: Role }, thunkAPI) => {
  try {
    const response = await api.get({ path: '/users', params: { role } });

    const { users } = response.data;

    thunkAPI.dispatch(setUsersList(users));
  } catch (err) {
    toast.error('Something went wrong', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
})
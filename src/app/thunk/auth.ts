import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { api } from "../api";
import { setToken, setUserId } from '../slices/auth';

export type Role = 'student' | 'leader';

export type LoginProps = {
  email: string;
  password: string;
};

export type RegisterProps = {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: Role;
}

export const login = createAsyncThunk('auth/login', async ({ email, password }: LoginProps, thunkAPI) => {
  try {
    const response = await api.post({ path : '/auth/login', params: { email, password }});

    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user.user_id);

    toast.success('Login is successful', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    thunkAPI.dispatch(setToken({ token }));
    thunkAPI.dispatch(setUserId({ user_id: user.user_id }));
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

export const register = createAsyncThunk('auth/register', async ({ name, surname, email, password, role }: RegisterProps) => {
  try {
    await api.post({ path: '/auth/register', params: { name, surname, email, password, role } });

    toast.success('Register is success', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
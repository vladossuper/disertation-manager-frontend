import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "../api";
import { setCreationStatus, setScopes } from "../slices/scope";

type CreateScopeProps = {
  name: string;
  date_start: Date;
  date_end: Date;
  created_by_user: string;
}

export type UpdateScopeData  = {
  name?: string;
  date_start?: Date;
  date_end?: Date;
}

type UpdateScope = {
  scope_id: string;
  update: UpdateScopeData;
}

export const createScope = createAsyncThunk(
  'scope/create', 
  async ({ name, date_start, date_end, created_by_user }: CreateScopeProps, thunkAPI) => {
    try {
      const response = await api.post({ path: '/scope/create', params: { name, date_start, date_end, created_by_user } });

      toast.success('Scope is created', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      thunkAPI.dispatch(setCreationStatus(response.status));
      thunkAPI.dispatch(getScopes());
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

export const getScopes = createAsyncThunk(
  'scope/list',
  async (_, thunkAPI) => {
    try {
      const response = await api.get({ path: '/scopes', params: {} });

      const { scopes } = response.data;

      thunkAPI.dispatch(setScopes(scopes));
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
  }
);

export const deleteScope = createAsyncThunk(
  'scope/delete',
  async ({ scope_id }: { scope_id: string }, thunkAPI) => {
    try {
      await api.post({ path: '/scope/delete', params: { scope_id } });

      toast.success('Scope is deleted', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      thunkAPI.dispatch(getScopes());
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
  }
);

export const updateScope = createAsyncThunk(
  'scope/update',
  async ({ scope_id, update }: UpdateScope, thunkAPI) => {
    try {
      await api.post({ path: '/scope/update', params: { scope_id, update } });

      toast.success('Scope is updated', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      thunkAPI.dispatch(getScopes());
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
  }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../api";
import { setFiles } from "../slices/file";

export const uploadFile = createAsyncThunk(
  'upload',
  async ({ data }: { data: FormData }, thunkAPI) => {
    try {
      await api.postFile({ path: '/upload', params: data });

      thunkAPI.dispatch(getFilesForTask({ task_id: String(data.get('task_id')) }));

      toast.success('File is successfully added', {
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
  }
);

export const getFilesForTask = createAsyncThunk(
  'files/getForTask',
  async ({ task_id }: { task_id: string }, thunkAPI) => {
    try {
      const response = await api.get({ path: '/files/getForTask', params: { task_id } });

      const { files } = response.data;

      thunkAPI.dispatch(setFiles(files));
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

export const downloadFile = createAsyncThunk(
  'file/download',
  async ({ path, name }: { path: string; name: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/file/download',
        {
          headers: {
            'Content-type': 'application/json',
          },
          responseType: 'blob',
          params: {
            path
          }
        },
      )

      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
      }

      toast.success('Download is successful', {
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
  }
);

export const deleteFile = createAsyncThunk(
  'file/delete',
  async ({ path, task_id, file_id }: { path: string; task_id: string; file_id: string }, thunkAPI) => {
    try { 
      await api.post({ path: '/file/delete', params: { path, file_id } });

      thunkAPI.dispatch(getFilesForTask({ task_id }));

      toast.success('File is successfully deleted', {
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
  }
)
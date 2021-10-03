import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "../api";
import { setComments } from "../slices/comment";

type CreateCommentProps = {
  description: string,
  author: string,
  comment_to_file: string,
  reply_to_comment?: string,
  user_id: string,
  task_id: string
}

export const createComment = createAsyncThunk(
  'comment/create',
  async ({ description, author, comment_to_file, reply_to_comment, user_id, task_id }: CreateCommentProps, thunkAPI) => {
    try {
      await api.post({ path: '/comment/create', params: { description, author, comment_to_file, reply_to_comment, user_id, task_id  } });

      toast.success('Comment is successfully created', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      thunkAPI.dispatch(getCommentByTask({ task_id }));
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

export const getCommentByTask = createAsyncThunk(
  'comment/getByTask',
  async ({ task_id }: { task_id: string }, thunkAPI) => {
    try {
      const response = await api.get({ path: '/comment/getByTask', params: { task_id } });

      const { comments } = response.data;

      thunkAPI.dispatch(setComments(comments));
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

export const deleteComment = createAsyncThunk(
  'comment/delete',
  async ({ comment_id, task_id }: { comment_id: string, task_id: string; }, thunkAPI) => {
    try {
      await api.post({ path: '/comment/delete', params: { comment_id } });

      toast.success('Comment is successfully deleted', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      thunkAPI.dispatch(getCommentByTask({ task_id }));
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
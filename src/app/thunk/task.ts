import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "../api";
import { setCreationStatus, setTasks } from "../slices/task";

export enum Status {
  TO_DO = 'to_do',
  IN_PROGRESS = 'in_progress',
  IN_TEST = 'in_test',
  DONE = 'done',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export type StatusType = Status.TO_DO | Status.IN_PROGRESS | Status.IN_TEST | Status.DONE;
export type PriorityType = Priority.LOW | Priority.MEDIUM | Priority.HIGH;

type Task = {
  student_id: string;
  title: string;
  description: string;
  priority: PriorityType;
  estimation: number;
  leader_id: string;
  status: StatusType;
  scope_id?: string;
}

export type Update = {
  title?: string;
  description?: string;
  student_id?: string;
  priority?: Priority;
  status?: Status;
  estimation?: number;
  scope_id?: string;
}

type UpdateTask = {
  task_id: string;
  update: Update;
}

export const createTask = createAsyncThunk(
  'task/create', 
  async ({ 
    student_id, 
    title, 
    description, 
    priority, 
    estimation, 
    leader_id, 
    status,
    scope_id
   }: Task, thunkAPI) => {
    try {
      const response = await api.post({ 
        path: '/task/create', 
        params: { student_id, title, description, priority, estimation, leader_id, status, scope_id } 
      });

      toast.success('Task is created', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      thunkAPI.dispatch(setCreationStatus(response.status));
      thunkAPI.dispatch(tasksCreatedByLeader({ user_id: leader_id }));
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

export const tasksCreatedByLeader = createAsyncThunk(
  'tasks/createdByLeader', 
  async ({ user_id }: { user_id: string }, thunkAPI) => {
    try {
      const response = await api.get({ path: '/tasks/createdByLeader', params: { user_id } });

      const { tasks } = response.data;

      thunkAPI.dispatch(setTasks(tasks));
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

export const tasksCreatedForStudent = createAsyncThunk(
  'tasks/createdFoeStudent',
  async ({ user_id }: { user_id: string }, thunkAPI) => {
    try { 
      const response = await api.get({ path: '/tasks/createdForStudent', params: { user_id } });

      const { tasks } = response.data;

      thunkAPI.dispatch(setTasks(tasks));
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

export const deleteTask = createAsyncThunk('task/delete', async ({ task_id, leader_id }: { task_id: string; leader_id: string; }, thunkAPI) => {
  try {
    await api.post({ path: '/task/delete', params: { task_id } });

    toast.success('Task is deleted', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    thunkAPI.dispatch(tasksCreatedByLeader({ user_id: leader_id }));
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

export const updateTask = createAsyncThunk('task/update', async ({ task_id, update }: UpdateTask, thunkAPI) => {
  try {
    await api.post({ path: '/task/update', params: { task_id, update } });
    toast.success('Task is updated', {
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
});
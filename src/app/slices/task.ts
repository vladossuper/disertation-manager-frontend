import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../thunk/auth';
import { PriorityType, StatusType } from '../thunk/task';

export type Task = {
  student_id: string;
  title: string;
  description: string;
  priority: PriorityType;
  estimation: number;
  leader_id: string;
  status: StatusType;
  task_id: string;
  creation_date: Date;
  scope_id?: string;
};

type InitialState = {
  creationStatus: null | number;
  tasks: Array<Task> | null;
};

const initialState: InitialState = {
  tasks: null,
  creationStatus: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCreationStatus: (state, { payload }: PayloadAction<number | null>) => {
      state.creationStatus = payload;
    },
    setTasks: (state, { payload }: PayloadAction<Array<Task> | null>) => {
      state.tasks = payload;
    }
  }
});

export const { actions, reducer: taskReducer } = taskSlice;
export const { setCreationStatus, setTasks } = actions;
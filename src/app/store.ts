import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { commentsReducer } from './slices/comment';
import { filesReducer } from './slices/file';
import { scopeReducer } from './slices/scope';
import { taskReducer } from './slices/task';
import { userReducer } from './slices/user';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
    scope: scopeReducer,
    files: filesReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/app/store";
import { getScopes } from "src/app/thunk/scope";
import { tasksCreatedForStudent } from "src/app/thunk/task";
import { TaskCard } from "src/components/TaskCard";

export const StudentLayout = () => {
  const dispatch = useDispatch();

  const { user_id } = useSelector((state: RootState) => state.auth);
  const { tasks } = useSelector((state: RootState) => state.task);
  const { user } = useSelector((state: RootState) => state.user);
  const { scopes } = useSelector((state: RootState) => state.scope);

  useEffect(() => {
    dispatch(tasksCreatedForStudent({ user_id }));
    dispatch(getScopes());
  }, []);

  if (!tasks || !scopes) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >
        <CircularProgress disableShrink />
      </Grid>
    )
  }

  if (!tasks.length) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >
        <Typography variant="h5" align="center">No tasks</Typography>
      </Grid>
    )
  }

  return (
    <Grid lg={12}>
      {tasks.map((task) => (
        <TaskCard key={task.task_id} task={task} user={user} scopes={scopes} />
      ))}
    </Grid>
  )
}
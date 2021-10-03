import { useCallback, useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, CircularProgress } from '@mui/material';
import { CreateModal } from 'src/components/CreateModal';
import { MainLayout } from 'src/components/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { tasksCreatedByLeader } from 'src/app/thunk/task';
import { TaskCard } from 'src/components/TaskCard';
import { users } from 'src/app/thunk/user';
import { CreateScopeModal } from 'src/components/CreateScopeModal';
import { getScopes } from 'src/app/thunk/scope';

export const LeaderLayout = () => {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);

  const dispatch = useDispatch();

  const { user_id } = useSelector((state: RootState) => state.auth);
  const { tasks } = useSelector((state: RootState) => state.task);
  const { users: usersList } = useSelector((state: RootState) => state.user);
  const { user } = useSelector((state: RootState) => state.user);
  const { scopes } = useSelector((state: RootState) => state.scope);

  useEffect(() => {
    dispatch(users({ role: 'student' }));
    dispatch(tasksCreatedByLeader({ user_id }));
    dispatch(getScopes());
  }, []);

  const scopesFilteredByUser = useMemo(() => !!scopes ? scopes.filter((scope) => scope.created_by_user === user_id) : [], [user_id, scopes]);

  const toggleCreateTaskModal = useCallback(() => {
    setOpenCreateTaskModal(!openCreateTaskModal);
  }, [openCreateTaskModal, setOpenCreateTaskModal]);


  if (!tasks || !usersList || !scopes) {
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

  return (
    <>
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Button variant="contained" onClick={toggleCreateTaskModal}>Create task</Button>
        </Box>

        <CreateModal open={openCreateTaskModal} toggleCreateModal={toggleCreateTaskModal} usersList={usersList} scopes={scopesFilteredByUser} />
      </Grid>

      <Grid lg={12}>
        {tasks.map((task) => (
          <TaskCard key={task.task_id} task={task} usersList={usersList} user={user} scopes={scopesFilteredByUser} />
        ))}
      </Grid>
    </>
  );
}

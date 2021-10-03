import { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Task } from 'src/app/slices/task';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { priorities, statuses } from 'src/constants';
import { useValidationForm } from 'src/app/hooks/useValidationForm';
import { User } from 'src/app/slices/user';
import { DeleteTaskModal } from './DeleteTaskModal';
import { Priority, Status, updateTask } from 'src/app/thunk/task';
import { useDispatch } from 'react-redux';
import { UpdateTaskModal } from './UpdateTaskModal';
import { Role } from 'src/pages/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import { Scope } from 'src/app/slices/scope';
import { MoreInfoModal } from './MoreInfoModal';

type Update = {
  title?: string;
  description?: string;
  student?: string;
  priority?: Priority;
  status?: Status;
  estimation?: number;
  scope?: string;
}

export const TaskCard = ({ task, usersList, user, scopes }: { task: Task; usersList?: Array<User>; user: User; scopes: Array<Scope> }) => {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [moreInfoModal, setMoreInfoModal] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm();
  const { statusError, priorityError, titleError, descriptionError, studentError } = useValidationForm({ errors });

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, [setDeleteModal]);

  const handleOpenDeleteModal = useCallback(() => {
    setDeleteModal(true);
  }, [setDeleteModal]);

  const handleCloseUpdateModal = useCallback(() => {
    setUpdateModal(false);
  }, [setUpdateModal]);

  const handleOpenUpdateModal = useCallback(() => {
    setUpdateModal(true);
  }, [setUpdateModal]);

  const handleCloseMoreInfoModal = useCallback(() => {
    setMoreInfoModal(false);
  }, [setMoreInfoModal]);

  const handleOpenMoreInfoModal = useCallback(() => {
    setMoreInfoModal(true);
  }, [setMoreInfoModal]);

  const onSubmit = useCallback((data: Update) => {
    dispatch(updateTask({ task_id: task.task_id, update: { ...data, student_id: data.student, scope_id: data.scope } }))
  }, [task, updateTask]);

  const handleUpdateTask = useCallback(() => {
    handleSubmit(onSubmit)();

    handleCloseUpdateModal();
  }, [])

  return (
    <Card sx={{ minWidth: 275, mt: 2 }}>
      <CardContent>
        <Controller
          id="title"
          as={TextField}
          name='title'
          control={control}
          fullWidth
          onChange={args => args[0].nativeEvent.text}
          label='Task title'
          defaultValue={task.title}
          error={!!titleError}
          rules={{ required: true }}
          helperText={titleError}
          margin="normal"
          variant="standard"
          disabled={user.role === Role.STUDENT}
        />
        <Box sx={{ display: 'flex', mt: 2, }}>
          <FormControl variant="standard" sx={{ minWidth: 150 }} error={!!statusError}>
            <InputLabel id="status" >Status</InputLabel>
            <Controller
              control={control}
              as={Select}
              name='status'
              onChange={args => args[0].nativeEvent.text}
              id="status"
              rules={{ required: true }}
              defaultValue={task.status}
            >
              {statuses.map((status) => (
                <MenuItem key={status.key} value={status.key}>{status.value}</MenuItem>
              ))}
            </Controller>
            {!!statusError && <FormHelperText>{statusError}</FormHelperText>}
          </FormControl>

          <FormControl variant="standard" sx={{ ml: 2, minWidth: 150 }} error={!!priorityError}>
            <InputLabel id="priority" >Priority</InputLabel>
            <Controller
              control={control}
              as={Select}
              name='priority'
              onChange={args => args[0].nativeEvent.text}
              id="priority"
              rules={{ required: true }}
              defaultValue={task.priority}
              disabled={user.role === Role.STUDENT}
            >
              {priorities.map((priority) => (
                <MenuItem key={priority.key} value={priority.key}>{priority.value}</MenuItem>
              ))}
            </Controller>
            {!!priorityError && <FormHelperText>{priorityError}</FormHelperText>}
          </FormControl>
          {user.role === Role.LEADER && (
            <FormControl variant="standard" sx={{ ml: 2, minWidth: 150 }} error={!!studentError}>
              <InputLabel id="student" >Student</InputLabel>
              <Controller
                control={control}
                as={Select}
                name='student'
                onChange={args => args[0].nativeEvent.text}
                id="student"
                rules={{ required: true }}
                defaultValue={task.student_id}
              >
                {usersList.map((user) => (
                  <MenuItem key={user.user_id} value={user.user_id}>{user.name} {user.surname}</MenuItem>
                ))}
              </Controller>
              {!!studentError && <FormHelperText>{studentError}</FormHelperText>}
            </FormControl>
          )}
          <FormControl variant="standard" sx={{ ml: 2, minWidth: 150 }}>
            <InputLabel id="scope" >Scope</InputLabel>
            <Controller
              control={control}
              as={Select}
              name='scope'
              onChange={args => args[0].nativeEvent.text}
              id="scope"
              rules={{ required: true }}
              defaultValue={task.scope_id ?? ''}
              disabled={user.role === Role.STUDENT}
            >
              {scopes.map((scope) => (
                <MenuItem key={scope.scope_id} value={scope.scope_id}>{scope.name}</MenuItem>
              ))}
            </Controller>
          </FormControl>
        </Box>
        <Controller
          id="description"
          as={TextField}
          name='description'
          control={control}
          onChange={args => args[0].nativeEvent.text}
          label='Task description'
          defaultValue={task.description}
          fullWidth
          multiline
          rows={3}
          error={!!descriptionError}
          rules={{ required: true }}
          helperText={descriptionError}
          margin="normal"
          variant="standard"
          disabled={user.role === Role.STUDENT}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={handleOpenMoreInfoModal}>More Info</Button>
        <Button variant="contained" startIcon={<CachedOutlinedIcon />} size="small" onClick={handleOpenUpdateModal}>Update Task</Button>
        {user.role === Role.LEADER && <Button variant="contained" startIcon={<DeleteIcon />} size="small" onClick={handleOpenDeleteModal}>Delete Task</Button>}
      </CardActions>

      <DeleteTaskModal open={deleteModal} handleClose={handleCloseDeleteModal} task_id={task.task_id} leader_id={task.leader_id} />
      <UpdateTaskModal open={updateModal} handleClose={handleCloseUpdateModal} handleUpdateTask={handleUpdateTask} />
      <MoreInfoModal open={moreInfoModal} handleClose={handleCloseMoreInfoModal} user={user} task={task} scopes={scopes} />
    </Card>
  );
}

import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { users } from 'src/app/thunk/user';
import { RootState } from 'src/app/store';
import { useValidationForm } from 'src/app/hooks/useValidationForm';
import { createTask, PriorityType, StatusType } from 'src/app/thunk/task';
import { setCreationStatus } from 'src/app/slices/task';
import { priorities, statuses } from 'src/constants';
import { User } from 'src/app/slices/user';
import { Scope } from 'src/app/slices/scope';

type CreateModalProps = {
  open: boolean;
  toggleCreateModal: () => void;
  usersList: Array<User>;
  scopes: Array<Scope>;
};

type CreateTaskProps = {
  student: string;
  title: string;
  description: string;
  priority: PriorityType;
  estimation: string;
  status: StatusType;
  scope?: string;
}

export const CreateModal = ({ open, toggleCreateModal, usersList, scopes }: CreateModalProps) => {
  const [creating, setCreating] = useState(false);

  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { titleError, descriptionError, studentError, statusError, estimationError, priorityError } = useValidationForm({ errors });

  const { user_id } = useSelector((state: RootState) => state.auth);
  const { creationStatus } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    if (creationStatus === 200 && creating) {
      setCreating(false);
      toggleCreateModal();
      dispatch(setCreationStatus(null));
    }
  }, [creationStatus, creating]);

  const onSubmit = (data: CreateTaskProps) => {
    const { description, estimation, priority, status, student, title, scope } = data;

    setCreating(true);

    dispatch(createTask({
      leader_id: user_id,
      student_id: student,
      estimation: Number(estimation),
      priority,
      status,
      title,
      description,
      scope_id: scope
    }));
  };

  return (
    <Dialog open={open} onClose={toggleCreateModal}>
      <DialogTitle>Task creation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can create tasks with descriptions and priority. Also, you can set deadlines for it.
        </DialogContentText>
        {
          !usersList ?
            <CircularProgress disableShrink /> :
            <>
              <Controller
                id="title"
                as={TextField}
                name='title'
                autoFocus
                control={control}
                onChange={args => args[0].nativeEvent.text}
                label='Task title'
                defaultValue=""
                fullWidth
                error={!!titleError}
                rules={{ required: true }}
                helperText={titleError}
                margin="normal"
                variant="standard"
              />
              <Controller
                id="description"
                as={TextField}
                name='description'
                control={control}
                onChange={args => args[0].nativeEvent.text}
                label='Task description'
                defaultValue=""
                fullWidth
                multiline
                rows={5}
                error={!!descriptionError}
                rules={{ required: true }}
                helperText={descriptionError}
                margin="normal"
                variant="standard"
              />
              <FormControl variant="standard" sx={{ mt: 2 }} fullWidth error={!!studentError}>
                <InputLabel id="student" >Student</InputLabel>
                <Controller
                  control={control}
                  as={Select}
                  name='student'
                  onChange={args => args[0].nativeEvent.text}
                  id="student"
                  rules={{ required: true }}
                >
                  {usersList.map((user) => (
                    <MenuItem key={user.user_id} value={user.user_id}>{user.name} {user.surname}</MenuItem>
                  ))}
                </Controller>
                {!!studentError && <FormHelperText>{studentError}</FormHelperText>}
              </FormControl>

              <FormControl variant="standard" sx={{ mt: 2 }} fullWidth error={!!statusError}>
                <InputLabel id="status" >Status</InputLabel>
                <Controller
                  control={control}
                  as={Select}
                  name='status'
                  onChange={args => args[0].nativeEvent.text}
                  id="status"
                  rules={{ required: true }}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status.key} value={status.key}>{status.value}</MenuItem>
                  ))}
                </Controller>
                {!!statusError && <FormHelperText>{statusError}</FormHelperText>}
              </FormControl>

              <FormControl variant="standard" sx={{ mt: 2 }} fullWidth error={!!priorityError}>
                <InputLabel id="priority" >Priority</InputLabel>
                <Controller
                  control={control}
                  as={Select}
                  name='priority'
                  onChange={args => args[0].nativeEvent.text}
                  id="priority"
                  rules={{ required: true }}
                >
                  {priorities.map((priority) => (
                    <MenuItem key={priority.key} value={priority.key}>{priority.value}</MenuItem>
                  ))}
                </Controller>
                {!!priorityError && <FormHelperText>{priorityError}</FormHelperText>}
              </FormControl>


              <FormControl variant="standard" sx={{ mt: 2 }} fullWidth>
                <InputLabel id="priority" >Scope</InputLabel>
                <Controller
                  control={control}
                  as={Select}
                  name='scope'
                  onChange={args => args[0].nativeEvent.text}
                  id="scope"
                >
                  {scopes.map((scope) => (
                    <MenuItem key={scope.scope_id} value={scope.scope_id}>{scope.name}</MenuItem>
                  ))}
                </Controller>
              </FormControl>

              <Controller
                id="estimation"
                as={TextField}
                name='estimation'
                control={control}
                onChange={args => args[0].nativeEvent.text}
                label='Estimation (in hours)'
                defaultValue=""
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                error={!!estimationError}
                rules={{ required: true }}
                helperText={estimationError}
                margin="normal"
                variant="standard"
              />
            </>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleCreateModal}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>{!creating ? 'Add task' : <CircularProgress />}</Button>
      </DialogActions>
    </Dialog>
  );
}

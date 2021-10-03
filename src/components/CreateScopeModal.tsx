import { MobileDatePicker } from "@mui/lab";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { MouseEventHandler, useEffect, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useValidationForm } from "src/app/hooks/useValidationForm";
import { setCreationStatus } from "src/app/slices/scope";
import { User } from "src/app/slices/user"
import { RootState } from "src/app/store";
import { createScope } from '../app/thunk/scope';

type CreateScopeModalProps = {
  open: boolean;
  toggleCreateScopeModal: () => void;
  user: User;
};

type CreateScopeFormData = {
  scopeName: string;
  startDate: Date;
  endDate: Date;
};

export const CreateScopeModal = ({ open, toggleCreateScopeModal, user }: CreateScopeModalProps) => {
  const [creating, setCreating] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(),
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(),
  );
  const dispatch = useDispatch();

  const { creationStatus } = useSelector((state: RootState) => state.scope);

  useEffect(() => {
    if (creationStatus === 200 && creating) {
      setCreating(false);
      toggleCreateScopeModal();
      dispatch(setCreationStatus(null));
    }
  }, [creationStatus, creating]);


  const { control, handleSubmit, formState: { errors } } = useForm();
  const { scopeNameError } = useValidationForm({ errors });

  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
  };

  const onSubmit = (data: CreateScopeFormData) => {
    const scope = {
      name: data.scopeName,
      date_start: data.startDate,
      date_end: data.endDate,
      created_by_user: user.user_id,
    };

    setCreating(true);

    dispatch(createScope(scope));
  }

  return (
    <Dialog open={open} onClose={toggleCreateScopeModal}>
      <DialogTitle>Scope creation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can create a scope of tasks. After that assign this scope for your created tasks.
        </DialogContentText>
        <Controller
          id="scopeName"
          as={TextField}
          name='scopeName'
          control={control}
          onChange={args => args[0].nativeEvent.text}
          label='Scope name'
          defaultValue=""
          fullWidth
          error={!!scopeNameError}
          rules={{ required: true }}
          helperText={scopeNameError}
          margin="normal"
          variant="standard"
        />
        <Controller
          id="startDate"
          name='startDate'
          control={control}
          label='Start date'
          rules={{ required: true }}
          value={startDate}
          defaultValue={startDate}
          as={
            <MobileDatePicker
              label="Date mobile"
              inputFormat="yyyy/MM/dd"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} fullWidth variant="standard" sx={{ mt: 2 }} />}
            />
          }
        />
        <Controller
          id="endDate"
          name='endDate'
          control={control}
          label='End start'
          rules={{ required: true }}
          value={endDate}
          defaultValue={endDate}
          as={
            <MobileDatePicker
              label="Date mobile"
              inputFormat="yyyy/MM/dd"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} fullWidth variant="standard" sx={{ mt: 2 }} />}
            />
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleCreateScopeModal}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>{!creating ? 'Create  scope' : <CircularProgress />}</Button>
      </DialogActions>
    </Dialog>
  )
}
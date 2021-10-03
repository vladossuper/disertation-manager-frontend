import { MobileDatePicker } from "@mui/lab";
import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useValidationForm } from "src/app/hooks/useValidationForm";
import { Scope } from "src/app/slices/scope";
import DeleteIcon from '@mui/icons-material/Delete';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import { DeleteScopeModal } from "./DeleteScopeModal";
import { UpdateScopeModal } from "./UpdateScopeModal";
import { updateTask } from "src/app/thunk/task";
import { updateScope, UpdateScopeData } from "src/app/thunk/scope";
import { useDispatch } from "react-redux";

type ScopeCardProps = {
  scope: Scope;
}

type Update = {
  scopeName?: string;
  startDate?: Date;
  endDate?: Date;
}

export const ScopeCard = ({ scope }: ScopeCardProps) => {
  const dispatch = useDispatch();

  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    scope.date_start
  );
  const [endDate, setEndDate] = useState<Date | null>(
    scope.date_end
  );

  const { control, handleSubmit, formState: { errors } } = useForm();
  const { scopeNameError } = useValidationForm({ errors });

  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
  };

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

  const onSubmit = useCallback((data: Update) => {
    dispatch(updateScope({ scope_id: scope.scope_id, update: { name: data.scopeName, date_start: data.startDate, date_end: data.endDate } }))
  }, [scope, updateScope]);

  const handleUpdateTask = useCallback(() => {
    handleSubmit(onSubmit)();

    handleCloseUpdateModal();
  }, []);

  return (
    <Card sx={{ minWidth: 275, mt: 2 }}>
      <CardContent>
        <Controller
          id="scopeName"
          as={TextField}
          name='scopeName'
          control={control}
          onChange={args => args[0].nativeEvent.text}
          label='Scope name'
          defaultValue={scope.name}
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
      </CardContent>
      <CardActions>
        <Button variant="contained" startIcon={<CachedOutlinedIcon />} size="small" onClick={handleOpenUpdateModal}>Update Scope</Button>
        <Button variant="contained" startIcon={<DeleteIcon />} size="small" onClick={handleOpenDeleteModal}>Delete Scope</Button>
      </CardActions>

      <DeleteScopeModal open={deleteModal} handleClose={handleCloseDeleteModal} scope_id={scope.scope_id} />
      <UpdateScopeModal open={updateModal} handleClose={handleCloseUpdateModal} handleUpdateScope={handleUpdateTask} />
    </Card>
  )
}
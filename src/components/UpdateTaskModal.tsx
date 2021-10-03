import { useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { deleteTask, Update, updateTask } from 'src/app/thunk/task';

type DeleteTaskModalProps = {
  open: boolean;
  handleClose: () => void;
  handleUpdateTask: () => void;
}

export const UpdateTaskModal = ({ open, handleClose, handleUpdateTask }: DeleteTaskModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Update task
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to update task?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdateTask} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { deleteTask } from 'src/app/thunk/task';

type DeleteTaskModalProps = {
  open: boolean;
  handleClose: () => void;
  task_id: string;
  leader_id: string;
}

export const DeleteTaskModal = ({ open, handleClose, task_id, leader_id }: DeleteTaskModalProps) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch(deleteTask({ task_id, leader_id }));

    handleClose();
  }, [task_id, leader_id]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Delete task
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete task?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

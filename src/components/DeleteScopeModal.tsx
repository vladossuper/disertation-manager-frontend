import { useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { deleteScope } from 'src/app/thunk/scope';

type DeleteScopeModalProps = {
  open: boolean;
  handleClose: () => void;
  scope_id: string;
}

export const DeleteScopeModal = ({ open, handleClose, scope_id }: DeleteScopeModalProps) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch(deleteScope({ scope_id }));

    handleClose();
  }, [scope_id]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Delete scope
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete scope?
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

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type DeleteScopeModalProps = {
  open: boolean;
  handleClose: () => void;
  handleUpdateScope: () => void;
}

export const UpdateScopeModal = ({ open, handleClose, handleUpdateScope }: DeleteScopeModalProps) => {
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
        <Button onClick={handleUpdateScope} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

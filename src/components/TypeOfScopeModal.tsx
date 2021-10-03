import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"

export const TypeOfScopeModal = ({ open, toggleTypeOfScopeModal }: { open: boolean; toggleTypeOfScopeModal: () => void; }) => {
  return (
    <Dialog open={open} onClose={toggleTypeOfScopeModal}>
      <DialogTitle>Types of dissertations</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can choose one of the types of dissertation work
        </DialogContentText>
        <FormControl component="fieldset">
          <FormLabel component="legend">Types of dissertations</FormLabel>
          <RadioGroup
            aria-label="gender"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="bachelor" control={<Radio />} label="Bachelor" />
            <FormControlLabel value="master" control={<Radio />} label="Master" />
            {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleTypeOfScopeModal}>Cancel</Button>
        <Button >Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
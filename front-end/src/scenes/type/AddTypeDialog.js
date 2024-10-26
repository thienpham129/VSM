import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const AddTypeDialog = ({
  open,
  handleClose,
  newType,
  handleChange,
  handleSubmit,
  errors,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Type</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Number of Seats"
          type="number"
          fullWidth
          variant="outlined"
          name="numSeat"
          value={newType.numSeat}
          onChange={handleChange}
          error={errors.numSeat}
          helperText={
            errors.numSeat ? "Please enter a valid number of seats." : ""
          }
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          name="price"
          value={newType.price}
          onChange={handleChange}
          error={errors.price}
          helperText={errors.price ? "Please enter a valid price." : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "gray",
            color: "white",
            "&:hover": { backgroundColor: "darkgray" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          sx={{
            backgroundColor: "green",
            color: "white",
            "&:hover": { backgroundColor: "darkgreen" },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTypeDialog;

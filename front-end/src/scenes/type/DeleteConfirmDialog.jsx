import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const DeleteConfirmDialog = ({ open, handleClose, confirmDeleteAction }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>Are you sure you want to delete this type?</DialogContent>
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
          onClick={confirmDeleteAction}
          sx={{
            backgroundColor: "red",
            color: "white",
            "&:hover": { backgroundColor: "darkred" },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
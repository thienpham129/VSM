// src/components/AddDriverModal.jsx
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const AddDriverModal = ({
  open,
  handleClose,
  newDriver,
  setNewDriver,
  errors,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Thêm Mới Tài Xế</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          name="email"
          value={newDriver.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="dense"
          label="Mật Khẩu"
          type="password"
          fullWidth
          variant="outlined"
          name="password"
          value={newDriver.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
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
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: "green",
            color: "white",
            "&:hover": { backgroundColor: "darkgreen" },
          }}
        >
          Thêm mới
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDriverModal;
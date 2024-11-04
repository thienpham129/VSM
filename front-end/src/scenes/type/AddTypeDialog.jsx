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
      <DialogTitle>Thêm Mới Loại Xe</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Số Chỗ Ngồi"
          type="number"
          fullWidth
          variant="outlined"
          name="numSeat"
          value={newType.numSeat}
          onChange={handleChange}
          error={errors.numSeat}
          helperText={errors.numSeat ? "Vui lòng không được để trống." : ""}
        />
        <TextField
          margin="dense"
          label="Giá Tiền"
          type="number"
          fullWidth
          variant="outlined"
          name="price"
          value={newType.price}
          onChange={handleChange}
          error={errors.price}
          helperText={errors.price ? "Vui lòng không được để trống." : ""}
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
          color="primary"
          sx={{
            backgroundColor: "green",
            color: "white",
            "&:hover": { backgroundColor: "darkgreen" },
          }}
        >
          Thêm Mới
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTypeDialog;
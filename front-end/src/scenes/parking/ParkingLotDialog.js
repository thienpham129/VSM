import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";

const ParkingLotDialog = ({
  open,
  onClose,
  parkingLot,
  setParkingLot,
  onConfirm,
  errors,
}) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
    <DialogTitle>
      {parkingLot.id ? "Cập Nhập Bãi Đỗ Xe" : "Tạo Mới Bãi Đỗ Xe"}
    </DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Tên Bãi Đỗ"
        fullWidth
        value={parkingLot.name}
        onChange={(e) => setParkingLot({ ...parkingLot, name: e.target.value })}
        error={!!errors.name}
      />
      {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}

      <TextField
        margin="dense"
        label="Địa Điểm"
        fullWidth
        value={parkingLot.location}
        onChange={(e) =>
          setParkingLot({ ...parkingLot, location: e.target.value })
        }
        error={!!errors.location}
      />
      {errors.location && (
        <FormHelperText error>{errors.location}</FormHelperText>
      )}

      <TextField
        margin="dense"
        label="Sức Chứa"
        type="number"
        fullWidth
        value={parkingLot.capacity}
        onChange={(e) =>
          setParkingLot({ ...parkingLot, capacity: Number(e.target.value) })
        }
        error={!!errors.capacity}
      />
      {errors.capacity && (
        <FormHelperText error>{errors.capacity}</FormHelperText>
      )}
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        sx={{
          backgroundColor: "gray",
          color: "white",
          "&:hover": {
            backgroundColor: "darkgray",
          },
        }}
      >
        Hủy
      </Button>
      <Button
        onClick={onConfirm}
        sx={{
          backgroundColor: "green",
          color: "white",
          "&:hover": {
            backgroundColor: "darkgreen",
          },
        }}
      >
        {parkingLot.id ? "Cập nhập" : "Tạo mới"}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ParkingLotDialog;

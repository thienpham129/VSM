import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const UserFormDialog = ({
  open,
  onClose,
  newUser,
  setNewUser,
  handleSubmit,
  errors,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm Mới Người Dùng</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={newUser.email}
          error={!!errors.email}
          helperText={errors.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={newUser.password}
          error={!!errors.password}
          helperText={errors.password}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;

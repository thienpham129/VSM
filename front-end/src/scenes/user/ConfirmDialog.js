import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmDialog = ({ open, onClose, userToBan, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác Nhận</DialogTitle>
      <DialogContent>
        <p>
          Bạn có muốn {userToBan?.account?.enabled ? "ban" : "bỏ ban"} người
          dùng này không?
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={onConfirm} color="primary">
          {userToBan?.account?.enabled ? "Ban" : "Bỏ Ban"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

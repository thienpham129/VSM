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
          Bạn có muốn {userToBan?.enabled ? "chặn" : "bỏ chặn"} người dùng này
          không?
        </p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          sx={{
            backgroundColor: "gray",
            color: "white",
            "&:hover": { backgroundColor: "darkgray" },
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          sx={{
            backgroundColor: "green",
            color: "white",
            "&:hover": { backgroundColor: "darkgreen" },
          }}
        >
          {userToBan?.enabled ? "Chặn" : "Bỏ Chặn"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

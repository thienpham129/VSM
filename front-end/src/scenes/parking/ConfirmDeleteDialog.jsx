import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@mui/material";
  
  const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác Nhận Xóa</DialogTitle>
      <DialogContent>
        <p>Bạn có chắc muốn xóa bãi đỗ xe này không?</p>
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
            backgroundColor: "red",
            color: "white",
            "&:hover": {
              backgroundColor: "darkred",
            },
          }}
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  export default ConfirmDeleteDialog;
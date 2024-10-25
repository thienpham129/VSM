import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataVoucher } from "../../admin/data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const VoucherAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false); // Trạng thái mở modal
  const [voucher, setVoucher] = useState({ number: "", discount: "" }); // Trạng thái cho voucher
  const [errors, setErrors] = useState({ number: "", discount: "" }); // Trạng thái lỗi

  const columns = [
    { field: "id", headerName: "Voucher ID", flex: 0.5 },
    { field: "code", headerName: "Code", flex: 1 },
    {
      field: "discount",
      headerName: "Discount",
      type: "number",
      headerAlign: "left",
      align: "left",
      valueFormatter: (params) => `${params.value * 100}%`,
    },
    {
      field: "valid",
      headerName: "Valid",
      type: "boolean",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => <strong>{params.value ? "Yes" : "No"}</strong>,
    },
  ];

  // Hàm mở modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Hàm đóng modal
  const handleClose = () => {
    setOpen(false);
    setVoucher({ number: "", discount: "" }); // Reset giá trị khi đóng
    setErrors({ number: "", discount: "" }); // Reset lỗi khi đóng
  };

  // Hàm xử lý khi nhấn nút Confirm
  const handleConfirm = () => {
    const newErrors = { number: "", discount: "" };
    let valid = true;

    // Kiểm tra trường Quantity không được để trống và phải lớn hơn 0
    if (!voucher.number || voucher.number <= 0) {
      newErrors.number = "Quantity is required and must be greater than 0";
      valid = false;
    }

    // Kiểm tra trường Discount không được để trống và phải từ 0 đến 1
    if (!voucher.discount || voucher.discount < 0 || voucher.discount > 1) {
      newErrors.discount = "Discount is required and must be between 0 and 1";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Xử lý logic thêm voucher ở đây (ví dụ: gọi API)
      console.log("Thêm voucher:", voucher);
      handleClose(); // Đóng modal sau khi thêm thành công
    }
  };

  return (
    <Box m="20px">
      <Header title="Voucher" subtitle="Manage Voucher" />

      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickOpen} // Mở modal
        >
          Thêm Voucher
        </Button>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataVoucher}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Voucher</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={voucher.number}
            onChange={(e) => setVoucher({ ...voucher, number: e.target.value })}
            error={!!errors.number} // Hiển thị lỗi nếu có
            helperText={errors.number} // Hiển thị thông báo lỗi
          />
          <TextField
            margin="dense"
            label="Discount (%)"
            type="number"
            fullWidth
            variant="outlined"
            value={voucher.discount}
            onChange={(e) =>
              setVoucher({ ...voucher, discount: e.target.value })
            }
            error={!!errors.discount} // Hiển thị lỗi nếu có
            helperText={errors.discount} // Hiển thị thông báo lỗi
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "gray",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgray",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
            sx={{
              backgroundColor: "green",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VoucherAdmin;

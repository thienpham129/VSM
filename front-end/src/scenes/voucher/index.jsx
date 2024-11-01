import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar, // Import Snackbar
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataVoucher } from "../../admin/data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const VoucherAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false); // Trạng thái mở modal
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Trạng thái mở snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Thông điệp snackbar

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "code", headerName: "Mã Code", flex: 0.7 },
    {
      field: "discount",
      headerName: "Giảm Giá",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
      valueFormatter: (params) => `${params.value * 100}%`,
    },
    {
      field: "valid",
      headerName: "Trạng Thái",
      type: "boolean",
      headerAlign: "left",
      align: "left",
      flex: 1,
      renderCell: (params) => (
        <strong>{params.value ? "Có thể sử dụng" : "Hết hạn"}</strong>
      ),
    },
  ];

  // Hàm mở modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Hàm đóng modal
  const handleClose = () => {
    setOpen(false);
  };

  // Schema xác thực với Yup
  const validationSchema = Yup.object({
    number: Yup.number()
      .required("Số lượng là bắt buộc")
      .positive("Số lượng phải lớn hơn 0")
      .integer("Số lượng phải là số nguyên"),
    discount: Yup.number()
      .required("Giảm giá là bắt buộc")
      .min(1, "Giảm giá phải từ 1 đến 100")
      .max(100, "Giảm giá phải từ 1 đến 100"),
  });

  return (
    <Box m="20px">
      <Header
        title="Quản Lý Mã Giảm Giá"
        subtitle="Danh Sách Thông Tin Mã Giảm Giá"
      />

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
          <Formik
            initialValues={{ number: "", discount: "" }} // Giá trị ban đầu
            validationSchema={validationSchema} // Sử dụng schema xác thực
            onSubmit={(values) => {
              console.log("Thêm voucher:", values);
              setSnackbarMessage("Thêm voucher thành công!"); // Thiết lập thông điệp snackbar
              setSnackbarOpen(true); // Mở snackbar
              handleClose(); // Đóng modal sau khi thêm thành công
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field name="number">
                  {({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      margin="dense"
                      label="Số Lượng"
                      type="number"
                      fullWidth
                      variant="outlined"
                      error={touched.number && !!errors.number} // Hiển thị lỗi nếu có
                      helperText={touched.number && errors.number} // Hiển thị thông báo lỗi
                    />
                  )}
                </Field>
                <Field name="discount">
                  {({ field }) => (
                    <TextField
                      {...field}
                      margin="dense"
                      label="Giảm Giá"
                      type="number"
                      fullWidth
                      variant="outlined"
                      error={touched.discount && !!errors.discount} // Hiển thị lỗi nếu có
                      helperText={touched.discount && errors.discount} // Hiển thị thông báo lỗi
                    />
                  )}
                </Field>
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
                    Hủy
                  </Button>

                  <Button
                    type="submit" // Thêm thuộc tính type="submit" để gửi form
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "darkgreen",
                      },
                    }}
                  >
                    Tạo Mới
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Snackbar để hiển thị thông báo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ContentProps={{
          style: {
            backgroundColor: "green",
            color: "white",
          },
        }}
      />
    </Box>
  );
};

export default VoucherAdmin;

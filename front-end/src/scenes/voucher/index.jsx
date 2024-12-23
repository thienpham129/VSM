import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { request } from "../../admin/helpers/axios_helper";

const VoucherAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [openSend, setOpenSend] = useState(false); // Modal gửi mã giảm giá
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      valueFormatter: (params) => `${params.value * 100}%`, // Định dạng hiển thị
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

  // Định nghĩa hàm fetchVouchers để gọi API lấy danh sách voucher
  const fetchVouchers = async () => {
    try {
      const response = await request("GET", "/admin/vouchers");
      const formattedData = response.data.map((voucher) => ({
        id: voucher.voucherID,
        code: voucher.code,
        discount: voucher.discount / 100, // Chia cho 100 nếu cần
        valid: voucher.valid,
      }));

      setVouchers(formattedData);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchVouchers(); // Gọi hàm fetchVouchers khi component được mount
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenSend = () => {
    setOpenSend(true);
  };

  const handleCloseSend = () => {
    setOpenSend(false);
  };

  const validationSchema = Yup.object({
    number: Yup.number()
      .required("Vui lòng nhập Số lượng")
      .positive("Số lượng phải lớn hơn 0")
      .integer("Số lượng phải là số nguyên"),
    discount: Yup.number()
      .required("Vui lòng nhập Giảm giá")
      .min(1, "Giảm giá phải từ 1 đến 100")
      .max(100, "Giảm giá phải từ 1 đến 100"),
  });

  const validationSendSchema = Yup.object({
    content: Yup.string()
      .required("Vui lòng nhập nội dung.")
      .max(500, "Nội dung không được vượt quá 500 ký tự."),
    discount: Yup.number()
      .required("Vui lòng nhập Giảm giá")
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
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Thêm Mã Giảm Giá
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpenSend}
          sx={{ marginLeft: "10px" }}
        >
          Gửi Mã Giảm Giá
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
          rows={vouchers}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Modal Thêm Voucher */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Voucher</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ number: "", discount: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const response = await request("POST", "/admin/voucher", {
                  discount: values.discount,
                  quantity: values.number,
                });

                console.log("Thêm voucher thành công:", response.data);
                setSnackbarMessage("Thêm voucher thành công!");
                setSnackbarOpen(true);
                handleClose();
                await fetchVouchers();
              } catch (error) {
                console.error("Lỗi khi thêm voucher:", error);
                setSnackbarMessage("Có lỗi xảy ra khi thêm voucher.");
                setSnackbarOpen(true);
              }
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
                      error={touched.number && !!errors.number}
                      helperText={touched.number && errors.number}
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
                      error={touched.discount && !!errors.discount}
                      helperText={touched.discount && errors.discount}
                    />
                  )}
                </Field>
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
                    type="submit"
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": { backgroundColor: "darkgreen" },
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

      {/* Modal Gửi Mã Giảm Giá */}
      <Dialog open={openSend} onClose={handleCloseSend}>
        <DialogTitle>Gửi Mã Giảm Giá</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ content: "", discount: "" }}
            validationSchema={validationSendSchema}
            onSubmit={async (values) => {
              setIsLoading(true); // Bắt đầu xử lý
              try {
                const response = await request("POST", "/admin/send-voucher", {
                  content: values.content,
                  discount: values.discount,
                });

                console.log("Gửi mã giảm giá thành công:", response.data);
                setSnackbarMessage("Gửi mã giảm giá thành công!");
                setSnackbarOpen(true);
                handleCloseSend();
              } catch (error) {
                console.error("Lỗi khi gửi mã giảm giá:", error);
                setSnackbarMessage("Có lỗi xảy ra khi gửi mã giảm giá.");
                setSnackbarOpen(true);
              } finally {
                setIsLoading(false); // Kết thúc xử lý
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field name="content">
                  {({ field }) => (
                    <TextField
                      {...field}
                      margin="dense"
                      label="Nội Dung"
                      multiline
                      rows={4}
                      fullWidth
                      variant="outlined"
                      error={touched.content && !!errors.content}
                      helperText={touched.content && errors.content}
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
                      error={touched.discount && !!errors.discount}
                      helperText={touched.discount && errors.discount}
                    />
                  )}
                </Field>
                <DialogActions>
                  <Button
                    onClick={handleCloseSend}
                    disabled={isLoading} // Disable khi đang xử lý
                    sx={{
                      backgroundColor: "gray",
                      color: "white",
                      "&:hover": { backgroundColor: "darkgray" },
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading} // Disable khi đang xử lý
                    sx={{
                      backgroundColor: isLoading ? "gray" : "green",
                      color: "white",
                      "&:hover": {
                        backgroundColor: isLoading ? "gray" : "darkgreen",
                      },
                    }}
                  >
                    {isLoading ? "Đang gửi..." : "Gửi Mã Giảm Giá"}{" "}
                    {/* Trạng thái nút */}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ContentProps={{
          style: {
            backgroundColor: snackbarMessage.includes("thành công")
              ? "green"
              : "red", // Màu sắc theo trạng thái
            color: "white",
          },
        }}
      />
    </Box>
  );
};

export default VoucherAdmin;

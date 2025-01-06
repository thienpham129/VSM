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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);

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
      field: "expiredDate",
      headerName: "Hạn Sử Dụng",
      flex: 1,
      type: "date",
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }, // Định dạng hiển thị theo ngày/tháng/năm
      headerAlign: "left",
      align: "left",
    },
    {
      field: "valid",
      headerName: "Trạng Thái",
      type: "boolean",
      headerAlign: "left",
      align: "left",
      flex: 1,
      renderCell: (params) => {
        const currentDate = new Date();
        const expiredDate = new Date(params.row.expiredDate); // Lấy ngày hết hạn từ dòng hiện tại
        const isExpired = expiredDate <= currentDate || !params.row.valid; // Kiểm tra nếu expiredDate nhỏ hơn ngày hiện tại hoặc valid là false

        return <strong>{isExpired ? "Hết hạn" : "Có thể sử dụng"}</strong>;
      },
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
        expiredDate: voucher.expiredDate,
      }));

      setVouchers(formattedData);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchVouchers(); // Gọi hàm fetchVouchers khi component được mount
  }, []);

  const handleClickOpen = (dialogType) => {
    setOpenDialog(dialogType); // Mở modal tương ứng
  };

  const handleClose = () => {
    setOpenDialog(null); // Đóng tất cả các modal
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
    expiredDate: Yup.date()
      .required("Vui lòng chọn Hạn sử dụng")
      .min(new Date(), "Hạn sử dụng phải lớn hơn ngày hiện tại"),
  });

  const validationSendSchema = Yup.object({
    content: Yup.string().required("Vui lòng nhập nội dung"),
    discount: Yup.number()
      .required("Vui lòng nhập giảm giá")
      .positive("Giảm giá phải lớn hơn 0"),
    expirationDate: Yup.date()
      .required("Vui lòng chọn ngày hết hạn")
      .min(new Date(), "Ngày hết hạn phải lớn hơn ngày hiện tại"),
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
          onClick={() => handleClickOpen("add")}
        >
          Thêm Mã Giảm Giá
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickOpen("send")}
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
      <Dialog open={openDialog === "send"} onClose={handleClose}>
        <DialogTitle>Gửi Mã Giảm Giá</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ content: "", discount: "", expirationDate: "" }}
            validationSchema={validationSendSchema}
            onSubmit={async (values) => {
              setIsLoading(true);
              try {
                const response = await request("POST", "/admin/send-voucher", {
                  content: values.content,
                  discount: values.discount,
                  expiredDate: values.expirationDate,
                });
                fetchVouchers();
                console.log("Gửi mã giảm giá thành công:", response.data);
                setSnackbarMessage("Gửi mã giảm giá thành công!");
                setSnackbarOpen(true);
                handleClose();
              } catch (error) {
                console.error("Lỗi khi gửi mã giảm giá:", error);
                setSnackbarMessage("Có lỗi xảy ra khi gửi mã giảm giá.");
                setSnackbarOpen(true);
              } finally {
                setIsLoading(false);
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
                <Field name="expirationDate">
                  {({ field }) => (
                    <TextField
                      {...field}
                      margin="dense"
                      label="Ngày Hết Hạn"
                      type="date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      error={touched.expirationDate && !!errors.expirationDate}
                      helperText={
                        touched.expirationDate && errors.expirationDate
                      }
                    />
                  )}
                </Field>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    disabled={isLoading}
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
                    disabled={isLoading}
                    sx={{
                      backgroundColor: isLoading ? "gray" : "green",
                      color: "white",
                      "&:hover": {
                        backgroundColor: isLoading ? "gray" : "darkgreen",
                      },
                    }}
                  >
                    {isLoading ? "Đang gửi..." : "Gửi Mã Giảm Giá"}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Modal Thêm Voucher */}
      <Dialog open={openDialog === "add"} onClose={handleClose}>
        <DialogTitle>Thêm Mã Giảm Giá</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ number: "", discount: "", expiredDate: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setIsLoading(true);
              try {
                const response = await request("POST", "/admin/voucher", {
                  quantity: values.number,
                  discount: values.discount,
                  expiredDate: values.expiredDate,
                });
                fetchVouchers();
                console.log("Thêm mã giảm giá thành công:", response.data);
                setSnackbarMessage("Thêm mã giảm giá thành công!");
                setSnackbarOpen(true);
                handleClose();
              } catch (error) {
                console.error("Lỗi khi thêm mã giảm giá:", error);
                setSnackbarMessage("Có lỗi xảy ra khi thêm mã giảm giá.");
                setSnackbarOpen(true);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field name="number">
                  {({ field }) => (
                    <TextField
                      {...field}
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
                <Field name="expiredDate">
                  {({ field }) => (
                    <TextField
                      {...field}
                      margin="dense"
                      label="Ngày Hết Hạn"
                      type="date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      error={touched.expiredDate && !!errors.expiredDate}
                      helperText={touched.expiredDate && errors.expiredDate}
                    />
                  )}
                </Field>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    disabled={isLoading}
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
                    disabled={isLoading}
                    sx={{
                      backgroundColor: isLoading ? "gray" : "green",
                      color: "white",
                      "&:hover": {
                        backgroundColor: isLoading ? "gray" : "darkgreen",
                      },
                    }}
                  >
                    {isLoading ? "Đang thêm..." : "Thêm Mã Giảm Giá"}
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

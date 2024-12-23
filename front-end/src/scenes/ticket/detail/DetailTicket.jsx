import {
  Box,
  Button,
  MenuItem,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "admin/helpers/axios_helper";

const DetailTicket = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const [ticket, setTicket] = useState(null); // Default value is null
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true); // To track loading state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Fetch ticket data
  const fetchTicket = async () => {
    try {
      const response = await request("GET", `/driver/ticket/${id}`);
      setTicket(response.data); // Set the ticket data
      setLoading(false); // Data has been loaded, set loading to false
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Even if there's an error, stop loading
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  // Fetch route data
  const fetchRoutes = async () => {
    try {
      const response = await request("GET", `/admin/routes`);
      setRoutes(response.data); // Set the routes data
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // Form submit handler
  const handleFormSubmit = async (values) => {
    const paid = values.paid === "Chưa thanh toán" ? false : true;
    const payload = { ...values, paid };
    try {
      await request("put", "/admin/update-ticket", payload);
      setTicket(payload);

      // Set success snackbar
      setSnackbarMessage("Cập nhật vé xe thành công!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Lỗi khi cập nhật vé xe:", error);

      // Set error snackbar
      const errorMessage =
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Default ticket values
  const initialValues = ticket
    ? {
        ticketId: ticket.ticketId,
        price: ticket.price,
        paymentMethod: ticket.paymentMethod,
        status: ticket.status || "Đang chờ xử lý", // Default to status if null
        selectedSeat: ticket.selectedSeat,
        note: ticket.note,
        email: ticket.email,
        fullName: ticket.fullName,
        phoneNumber: ticket.phoneNumber,
        detailAddressPickUp: ticket.detailAddressPickUp,
        detailAddressDropOff: ticket.detailAddressDropOff,
        route: `${ticket.route.startLocation} > ${ticket.route.stopLocation}`,
        paid: ticket.paid ? "Đã thanh toán" : "Chưa thanh toán", // Update paid field to be a string
      }
    : {};

  // Status options
  const statusOptions = [
    "Đang chờ xử lý",
    "Đã xác nhận",
    "Đang di chuyển",
    "Đã thanh toán",
    "Hủy đặt vé",
    "Đã Lên Xe",
    "Chưa Lên Xe",
    "Đã Xuống Xe",
    "Hủy",
  ];

  // Paid options
  const paidOptions = ["Chưa thanh toán", "Đã thanh toán"];

  // Phone number regex
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  // Schema validation for form
  const checkoutSchema = yup.object().shape({
    price: yup.number().required("Vui lòng nhập giá"),
    paymentMethod: yup
      .string()
      .required("Vui lòng nhập phương thức thanh toán"),
    status: yup.string().required("Vui lòng nhập trạng thái"),
    selectedSeat: yup.string().required("Vui lòng nhập vị trí ghế"),
    note: yup.string(),
    email: yup
      .string()
      .email("Email không hợp lệ!")
      .required("Vui lòng nhập email"),
    fullName: yup.string().required("Vui lòng nhập họ tên"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Số điện thoại không hợp lệ")
      .required("Vui lòng nhập số điện thoại"),
    detailAddressPickUp: yup.string().required("Vui lòng nhập địa chỉ đón"),
    detailAddressDropOff: yup.string().required("Vui lòng nhập địa chỉ trả"),
    route: yup.string().required("Vui lòng nhập tuyến đường"),
    paid: yup
      .string()
      .oneOf(paidOptions, "Trạng thái thanh toán không hợp lệ")
      .required("Vui lòng nhập trạng thái thanh toán"), // Update validation for paid
  });

  if (loading) {
    return <CircularProgress />; // Show loading spinner while data is being fetched
  }

  return (
    <Box m="20px">
      <Header
        title="Chi Tiết Vé Xe"
        subtitle={
          <span>
            <Link
              to="/admin/ticket"
              style={{ textDecoration: "none", color: "white" }}
            >
              Danh sách vé xe
            </Link>
            <span style={{ textDecoration: "none", color: "inherit" }}>
              {" > Chi tiết"}
            </span>
          </span>
        }
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                label="id"
                value={values.ticketId}
                name="ticketId"
                disabled
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Giá vé"
                value={values.price}
                name="price"
                disabled
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Họ Tên"
                value={values.fullName}
                name="fullName"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Ghế Đã Chọn"
                value={values.selectedSeat}
                name="selectedSeat"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.selectedSeat && !!errors.selectedSeat}
                helperText={touched.selectedSeat && errors.selectedSeat}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Số Điện Thoại"
                value={values.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Điểm Đón"
                value={values.detailAddressPickUp}
                name="detailAddressPickUp"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.detailAddressPickUp && !!errors.detailAddressPickUp
                }
                helperText={
                  touched.detailAddressPickUp && errors.detailAddressPickUp
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Điểm Trả"
                value={values.detailAddressDropOff}
                name="detailAddressDropOff"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.detailAddressDropOff && !!errors.detailAddressDropOff
                }
                helperText={
                  touched.detailAddressDropOff && errors.detailAddressDropOff
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Ghi Chú"
                value={values.note}
                name="note"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.note && !!errors.note}
                helperText={touched.note && errors.note}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Tuyến Đường"
                value={values.route}
                name="route"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.route && !!errors.route}
                helperText={touched.route && errors.route}
                sx={{ gridColumn: "span 2" }}
                disabled
              >
                {routes.map((route) => (
                  <MenuItem
                    key={route.id}
                    value={`${route.startLocation} > ${route.stopLocation}`}
                  >
                    {`${route.startLocation} > ${route.stopLocation}`}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                label="Phương Thức Thanh Toán"
                value={values.paymentMethod}
                name="paymentMethod"
                disabled
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Trạng Thái Thanh Toán"
                value={values.paid}
                name="paid"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.paid && !!errors.paid}
                helperText={touched.paid && errors.paid}
                sx={{ gridColumn: "span 2" }}
              >
                {paidOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                select
                label="Trạng Thái"
                value={values.status}
                name="status"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 2" }}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Lưu Thay Đổi
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DetailTicket;

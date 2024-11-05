import { Box, Button, TextField, Snackbar, Input } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import { mockDataDetailDriver } from "admin/data/mockData"; // Import mockDataDetailDriver
import { useState } from "react";

const checkoutSchema = yup.object().shape({
  address: yup.string().required("required"),
  day_of_birth: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  phone_number: yup.string().required("required"),
  img_driver_license1: yup.mixed().required("required"), // Thêm xác thực cho hình ảnh
  img_driver_license2: yup.mixed().required("required"), // Thêm xác thực cho hình ảnh
});

const DetailDriver = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const driver = mockDataDetailDriver[0]; // Sử dụng đối tượng đầu tiên trong mockDataDetailDriver

  // State quản lý Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleFormSubmit = (values) => {
    console.log(values);
    // Xử lý upload hình ảnh tại đây nếu cần
    setSnackbarMessage("Lưu thông tin tài xế thành công!");
    setSnackbarOpen(true);
  };

  return (
    <Box m="20px">
      <Header
        title="Chi Tiết Thông Tin Tài Xế"
        subtitle={
          <>
            <span
              onClick={() => navigate("/admin/driver")}
              style={{
                cursor: "pointer",
                color: "white",
              }}
            >
              Quản lý tài xế
            </span>
            <span style={{ color: "blue" }}>{"  >  Chi tiết tài xế"}</span>
          </>
        }
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          id: driver.id,
          address: driver.address,
          day_of_birth: driver.day_of_birth,
          email: driver.email,
          first_name: driver.first_name,
          last_name: driver.last_name,
          phone_number: driver.phone_number,
          img_driver_license1: null, // Giá trị khởi tạo cho hình ảnh
          img_driver_license2: null, // Giá trị khởi tạo cho hình ảnh
        }}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue, // Sử dụng để cập nhật giá trị trường hình ảnh
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
                type="text"
                label="ID"
                value={values.id}
                name="id"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Họ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                name="first_name"
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Số Điện Thoại"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone_number}
                name="phone_number"
                error={!!touched.phone_number && !!errors.phone_number}
                helperText={touched.phone_number && errors.phone_number}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa Chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ngày Sinh"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.day_of_birth}
                name="day_of_birth"
                error={!!touched.day_of_birth && !!errors.day_of_birth}
                helperText={touched.day_of_birth && errors.day_of_birth}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            {/* Input upload hình ảnh */}
            <Box
              display="grid"
              gap="30px"
              mt="20px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            >
              <Input
                type="file"
                accept="image/*" // Chỉ chấp nhận hình ảnh
                onChange={(event) => {
                  setFieldValue(
                    "img_driver_license1",
                    event.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
              />
              <Input
                type="file"
                accept="image/*" // Chỉ chấp nhận hình ảnh
                onChange={(event) => {
                  setFieldValue(
                    "img_driver_license2",
                    event.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            {/* Hiển thị hình ảnh từ img_driver_license1 và img_driver_license2 */}
            <Box display="flex" justifyContent="space-between" mt="20px">
              {values.img_driver_license1 || driver.img_driver_license1 ? (
                <img
                  src={
                    values.img_driver_license1
                      ? URL.createObjectURL(values.img_driver_license1)
                      : driver.img_driver_license1
                  } // Tạo URL từ tệp hình ảnh hoặc lấy từ driver
                  alt="Giấy phép lái xe 1"
                  style={{
                    width: "48%",
                    height: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              ) : null}
              {values.img_driver_license2 || driver.img_driver_license2 ? (
                <img
                  src={
                    values.img_driver_license2
                      ? URL.createObjectURL(values.img_driver_license2)
                      : driver.img_driver_license2
                  } // Tạo URL từ tệp hình ảnh hoặc lấy từ driver
                  alt="Giấy phép lái xe 2"
                  style={{
                    width: "48%",
                    height: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              ) : null}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Lưu Thay Đổi
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {/* Snackbar thông báo khi lưu thành công */}
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

export default DetailDriver;

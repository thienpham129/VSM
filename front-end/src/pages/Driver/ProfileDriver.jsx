import { Box, Button, TextField, Snackbar, Input } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import { useNavigate, useParams } from "react-router-dom"; // useParams để lấy id từ URL
import { useState, useEffect } from "react";
import { request } from "admin/helpers/axios_helper"; // Import helper request
import axios from "axios";
import { parseISO, format } from "date-fns";
import { getTokenFromLocalStorage } from "utils/tokenUtils";
import { root } from "helper/axiosClient";
import { jwtDecode } from "jwt-decode";

// const checkoutSchema = yup.object().shape({
//   address: yup.string().required("Vui lòng nhập địa chỉ của tài xế"),
//   dob: yup.string().required("Vui lòng nhập ngày sinh của tài xê"),
//   email: yup
//     .string()
//     .email("Vui lòng nhập email hợp lệ")
//     .required("Vui lòng nhập email tài xế"),
//   firstName: yup.string().required("Vui lòng nhập tên tài xế"),
//   lastName: yup.string().required("Vui lòng nhập họ tài xế"),
//   phoneNumber: yup.string().required("Vui lòng nhập số điện thoại của tài xế"),
//   imgDriverLisence1: yup.mixed(),
//   imgDriverLisence2: yup.mixed(),
// });

const ProfileDriver = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [id, setUserId] = useState("");
  const [imgDriverLisence1, setImgDriverLisence1] = useState("");
  const [imgDriverLisence2, setImgDriverLisence2] = useState("");
  const [address, setAddress] = useState("");

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");


  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.sub;
        if (id) {
          setUserId(id);
          fetchUser(id);
        } else {
          console.error("id not found in token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const fetchUser = async (id) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await root.get(`/driver/get-driver/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log("««««« data »»»»»", data);
      if (data) {
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");
        setDob(data.dob || "");
        setAddress(data.address || "");
        setImgDriverLisence1(data.imgDriverLisence1 || null);
        setImgDriverLisence2(data.imgDriverLisence2 || null);
      }
    } catch (error) {
      console.error("Failed to retrieve user data:", error);
    }
  };

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    const dobParsed = parseISO(values.dob); // Chuyển chuỗi ngày thành đối tượng Date
    const dobFormatted = format(dobParsed, "dd/MM/yyyy"); // Định dạng thành dd/MM/yyyy
    // Thêm các trường thông tin vào formData
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("dob", dobFormatted);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("address", values.address);

    // Chỉ thêm hình ảnh nếu có hình ảnh mới được tải lên
    const images = [];
    if (values.imgDriverLisence1) images.push(values.imgDriverLisence1);
    if (values.imgDriverLisence2) images.push(values.imgDriverLisence2);

    images.forEach((image, index) => {
      formData.append(`images`, image); // `images` là danh sách MultipartFile như yêu cầu của backend
    });

    try {
      const token = getTokenFromLocalStorage(); // Giả sử bạn có hàm lấy token xác thực
      await root.put(
        `/driver/updateDriver/${id}`, // URL cho API
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchUser(id);
      setSnackbarMessage("Lưu thông tin tài xế thành công!");
      setFirstName(values.firstName);
      setLastName(values.lastName);
      // setDob(dobFormatted);
      setPhoneNumber(values.phoneNumber);
      setAddress(values.address);
      if (values.imgDriverLisence1)
        setImgDriverLisence1(URL.createObjectURL(values.imgDriverLisence1));
      if (values.imgDriverLisence2)
        setImgDriverLisence2(URL.createObjectURL(values.imgDriverLisence2));
    } catch (error) {
      console.error(
        "Error updating driver:",
        error.response ? error.response.data : error.message
      );
      setSnackbarMessage("Có lỗi xảy ra khi lưu thông tin tài xế.");
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Thông Tin Cá Nhân Tài Xế"
        subtitle={
          <>
            <span
              onClick={() => navigate("/admin/driver")}
              style={{ cursor: "pointer", color: "white" }}
            >
              Quản lý tài xế
            </span>
          </>
        }
      />

      <Formik
        enableReinitialize
        onSubmit={handleFormSubmit}
        initialValues={{
          // id: id,
          address,
          dob,
          email,
          firstName,
          lastName,
          phoneNumber,
          imgDriverLisence1: null,
          imgDriverLisence2: null,
        }}
        // validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
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
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID"
                value={id}
                name="id"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ gridColumn: "span 4" }}
              /> */}

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Họ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                disabled
                value={email}
                name="email"
                InputProps={{ readOnly: true }}
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
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
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
                type="date"
                label="Ngày Sinh"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dob}
                name="dob"
                error={!!touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>

            <Box
              display="grid"
              gap="30px"
              mt="20px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            >
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue(
                    "imgDriverLisence1",
                    event.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue(
                    "imgDriverLisence2",
                    event.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" mt="20px">
              {values.imgDriverLisence1 || imgDriverLisence1 ? (
                <img
                  src={
                    values.imgDriverLisence1
                      ? URL.createObjectURL(values.imgDriverLisence1)
                      : imgDriverLisence1
                  }
                  alt="Giấy phép lái xe 1"
                  style={{
                    width: "48%",
                    height: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              ) : null}
              {values.imgDriverLisence2 || imgDriverLisence2 ? (
                <img
                  src={
                    values.imgDriverLisence2
                      ? URL.createObjectURL(values.imgDriverLisence2)
                      : imgDriverLisence2
                  }
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ContentProps={{
          style: { backgroundColor: "green", color: "white" },
        }}
      />
    </Box>
  );
};

export default ProfileDriver;

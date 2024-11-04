import {
    Box,
    Button,
    TextField,
    Snackbar,
    Alert,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Typography,
  } from "@mui/material";
  import { Formik } from "formik";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import Header from "components/Header";
  import { Link, useNavigate } from "react-router-dom"; // Nhập useNavigate
  import { useEffect, useState } from "react";
  import { request } from "admin/helpers/axios_helper";
  import axios from "axios";
  
  const CreateCar = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [typeCars, setTypeCars] = useState([]);
    const [images, setImages] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("success");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  
    const navigate = useNavigate(); // Khởi tạo useNavigate
  
    const fetchData = async () => {
      try {
        const response = await request("GET", "/admin/types");
        const formattedData = response.data.map((item) => ({
          id: item.typeId,
          numSeat: item.numSeat,
          price: item.price,
        }));
        setTypeCars(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackbarMessage("Có lỗi xảy ra khi tải dữ liệu.");
        setSnackbarColor("error");
        setSnackbarOpen(true);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const getAuthToken = () => {
      return window.localStorage.getItem("TOKEN");
    };
  
    const handleFormSubmit = async (values, { resetForm }) => {
      const formData = new FormData();
  
      // Append other fields
      formData.append("name", values.carName);
      formData.append("plateNumber", values.plateNumber);
      formData.append("color", values.color);
      formData.append("yearOfManufacture", values.yearOfManufacture);
      formData.append("manufactory", values.manufactory);
      formData.append("typeID", values.typeID);
  
      // Append images
      images.forEach((image) => {
        formData.append("images", image);
      });
  
      try {
        const token = getAuthToken();
  
        // Gọi API để tạo xe mới
        const response = await axios.post(
          "http://localhost:8080/admin/car",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Lấy ID của chiếc xe vừa tạo từ phản hồi
        const newCarId = response.data.carId; // Cập nhật để lấy carId từ response
  
        // Chuyển hướng tới trang chi tiết của chiếc xe vừa tạo
        navigate(`/admin/car/${newCarId}`); // Chuyển hướng đến trang chi tiết
  
        resetForm(); // Đặt lại form sau khi tạo thành công
        setSnackbarMessage("Xe đã được thêm thành công!");
        setSnackbarColor("success");
      } catch (error) {
        console.error(
          "Error creating car:",
          error.response ? error.response.data : error.message
        );
        setSnackbarMessage("Có lỗi xảy ra khi thêm xe.");
        setSnackbarColor("error");
      } finally {
        setSnackbarOpen(true);
      }
    };
  
    // Định nghĩa quy tắc kiểm tra dữ liệu đầu vào
    const checkoutSchema = yup.object().shape({
      carName: yup.string().required("Vui lòng nhập Tên xe"),
      plateNumber: yup.string().required("Vui lòng nhập Biển số xe"),
      color: yup.string().required("Vui lòng nhập Màu xe"),
      yearOfManufacture: yup
        .number()
        .required("Vui lòng nhập Năm sản xuất")
        .min(1886, "Năm sản xuất không hợp lệ"),
      typeID: yup.number().required("Vui lòng chọn loại xe"),
      manufactory: yup.string().required("Vui lòng nhập Nhà sản xuất"),
    });
  
    const initialValues = {
      carName: "",
      plateNumber: "",
      color: "",
      yearOfManufacture: "",
      typeID: "",
      manufactory: "",
    };
  
    return (
      <Box m="20px">
        <Header
          title="Thêm Mới Xe"
          subtitle={
            <span>
              <Link
                to="/admin/car"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "25px",
                }}
              >
                Danh sách xe
              </Link>
              <span style={{ textDecoration: "none", color: "inherit" }}>
                {" > Thêm mới xe"}
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
            resetForm,
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
                  label="Tên Xe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.carName}
                  name="carName"
                  error={!!touched.carName && !!errors.carName}
                  helperText={touched.carName && errors.carName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Biển Số Xe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.plateNumber}
                  name="plateNumber"
                  error={!!touched.plateNumber && !!errors.plateNumber}
                  helperText={touched.plateNumber && errors.plateNumber}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                >
                  <InputLabel id="type-select-label">Loại Xe</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    name="typeID"
                    value={values.typeID}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.typeID && !!errors.typeID}
                  >
                    {typeCars.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {`Số chỗ: ${type.numSeat}, Giá: ${type.price} VNĐ`}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.typeID && errors.typeID && (
                    <div style={{ color: "red", marginTop: "4px" }}>
                      {errors.typeID}
                    </div>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Màu Xe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.color}
                  name="color"
                  error={!!touched.color && !!errors.color}
                  helperText={touched.color && errors.color}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Năm Sản Xuất"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.yearOfManufacture}
                  name="yearOfManufacture"
                  error={
                    !!touched.yearOfManufacture && !!errors.yearOfManufacture
                  }
                  helperText={
                    touched.yearOfManufacture && errors.yearOfManufacture
                  }
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Nhà Sản Xuất"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.manufactory}
                  name="manufactory"
                  error={!!touched.manufactory && !!errors.manufactory}
                  helperText={touched.manufactory && errors.manufactory}
                  sx={{ gridColumn: "span 2" }}
                />
                {/* Input để tải lên hình ảnh */}
                <Box sx={{ gridColumn: "span 4" }}>
                  <Typography variant="h6" gutterBottom>
                    Tải lên hình ảnh (Tối đa 2 ảnh)
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const files = Array.from(event.target.files);
                      if (files.length > 2) {
                        setSnackbarMessage("Chỉ được chọn tối đa 2 hình ảnh.");
                        setSnackbarColor("error");
                        setSnackbarOpen(true);
                        return;
                      }
                      setImages(files);
                    }}
                    multiple
                  />
                  <Box display="flex" gap="10px" mt="10px">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`preview-${index}`}
                        style={{
                          width: "500px",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Thêm Mới Xe
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarColor}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    );
  };
  
  export default CreateCar;
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
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "admin/helpers/axios_helper";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailCar = () => {
  const [typeCars, setTypeCars] = useState([]);
  const [parking, setParking] = useState([]);
  const [carData, setCarData] = useState(null);
  const [images, setImages] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { id } = useParams();

  const fetchCarData = async () => {
    try {
      const response = await request("GET", `/public/car/${id}`);
      setCarData(response.data);
      setImages(response.data.images || []);
    } catch (err) {
      console.error("Error fetching car data:", err);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [id]);

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

  const fetchDataParking = async () => {
    try {
      const response = await request("GET", "/admin/parkings");
      const formattedData = response.data.map((item) => ({
        id: item.id,
        name: item.name,
        location: item.location,
        capacity: item.capacity,
        numCar: item.numCar,
        empty: item.empty,
      }));
      setParking(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSnackbarMessage("Có lỗi xảy ra khi tải dữ liệu.");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchDataParking();
  }, []);

  const initialValues = {
    carName: carData?.name || "",
    plateNumber: carData?.plateNumber || "",
    color: carData?.color || "",
    yearOfManufacture: carData?.yearOfManufacture || "",
    dayMaintenance: carData?.dayMaintenance || "",
    manufactory: carData?.manufactory || "",
    typeID: carData?.type?.typeId || "",
    parkingID: carData?.parking?.id || "",
  };

  const getAuthToken = () => {
    return window.localStorage.getItem("TOKEN");
  };

  const handleFormSubmit = async (values) => {
    const formData = new FormData();

    formData.append("name", values.carName);
    formData.append("plateNumber", values.plateNumber);
    formData.append("color", values.color);
    formData.append("yearOfManufacture", values.yearOfManufacture);
    formData.append("dayMaintenance", values.dayMaintenance);
    formData.append("manufactory", values.manufactory);
    formData.append("typeID", values.typeID);
    formData.append("parkingID", values.parkingID);

    images.forEach((image) => {
      if (image instanceof File) formData.append("images", image);
    });

    try {
      const token = getAuthToken();
      await axios.put(
        `http://localhost:8080/admin/car/${id}`, // Cập nhật xe với ID cụ thể
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Gọi lại hàm fetchCarData để tải lại dữ liệu xe
      await fetchCarData();
      setSnackbarMessage("Xe đã được cập nhật thành công!");
      setSnackbarColor("success");
    } catch (error) {
      console.error(
        "Error updating car:",
        error.response ? error.response.data : error.message
      );
      setSnackbarMessage("Có lỗi xảy ra khi cập nhật xe.");
      setSnackbarColor("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const checkoutSchema = yup.object().shape({
    carName: yup.string().required("Vui lòng nhập Tên xe"),
    plateNumber: yup.string().required("Vui lòng nhập Biển số xe"),
    color: yup.string().required("Vui lòng nhập Màu xe"),
    yearOfManufacture: yup
      .number()
      .required("Vui lòng nhập Năm sản xuất")
      .min(1886, "Năm sản xuất không hợp lệ"),
    dayMaintenance: yup
      .date()
      .required("Vui lòng nhập Ngày Bảo Trì")
      .typeError("Ngày Bảo Trì không hợp lệ")
      .nullable(), // Cho phép giá trị null
    typeID: yup.number().required("Vui lòng chọn loại xe"),
    parkingID: yup.number().required("Vui lòng chọn bãi đỗ"),
    manufactory: yup.string().required("Vui lòng nhập Nhà sản xuất"),
  });

  // Hàm xử lý khi người dùng tải lên hình ảnh
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <Box m="20px">
      <Header
        title="Chi Tiết Xe"
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
              {" > Chi Tiết Xe"}
            </span>
          </span>
        }
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        enableReinitialize={true}
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
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, 1fr)">
              <TextField
                fullWidth
                variant="filled"
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
                label="Biển Số Xe"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.plateNumber}
                name="plateNumber"
                error={!!touched.plateNumber && !!errors.plateNumber}
                helperText={touched.plateNumber && errors.plateNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
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
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel>Loại Xe</InputLabel>
                <Select
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
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                label="Ngày Bảo Trì"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dayMaintenance}
                name="dayMaintenance"
                error={!!touched.dayMaintenance && !!errors.dayMaintenance}
                helperText={touched.dayMaintenance && errors.dayMaintenance}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Nhà Sản Xuất"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.manufactory}
                name="manufactory"
                error={!!touched.manufactory && !!errors.manufactory}
                helperText={touched.manufactory && errors.manufactory}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Trường Parking */}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel>Bãi Đỗ</InputLabel>
                <Select
                  name="parkingID"
                  value={values.parkingID}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.parkingID && !!errors.parkingID}
                >
                  {parking.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {`${item.name} - ${
                        item.empty ? "Còn trống" : "Hết chỗ trống"
                      }`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Trường Input Hình Ảnh */}
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                accept="image/*"
                style={{ gridColumn: "span 4", marginTop: "20px" }}
              />
            </Box>

            {/* Hiển Thị Các Hình Ảnh Đã Tải Lên */}
            <Box display="flex" flexWrap="wrap" gap="10px" marginTop="20px">
              {images.length > 0
                ? images.map((image, index) => {
                    if (image instanceof File) {
                      // Kiểm tra nếu là đối tượng File
                      return (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)} // Tạo URL tạm thời cho file
                          alt={`car-image-${index}`}
                          style={{
                            width: "100px",
                            height: "auto",
                            borderRadius: "5px",
                          }}
                        />
                      );
                    }
                    return null; // Nếu không phải là File, không render hình ảnh
                  })
                : carData?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image} // Lấy trực tiếp URL hình ảnh từ dữ liệu xe
                      alt={`car-image-${index}`}
                      style={{
                        width: "100px",
                        height: "auto",
                        borderRadius: "5px",
                      }}
                    />
                  ))}
            </Box>

            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ marginTop: "20px" }}
            >
              Cập Nhật Xe
            </Button>
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

export default DetailCar;

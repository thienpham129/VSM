import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import { request } from "admin/helpers/axios_helper";
import { Link, useParams } from "react-router-dom";

const DetailCarRoute = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const [cars, setCars] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [carRoute, setCarRoute] = useState(null);

  // Fetch car route data
  useEffect(() => {
    const fetchCarRoute = async () => {
      try {
        const response = await request("get", `/public/car-route/${id}`);
        setCarRoute(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Lỗi fetch car route: " + err);
      }
    };
    fetchCarRoute();
  }, [id]);

  // Fetch cars data
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await request("get", "/public/cars");
        setCars(response.data);
      } catch (err) {
        console.log("Lỗi fetch cars: " + err);
      }
    };
    fetchCars();
  }, []);

  // Fetch routes data
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await request("get", "/admin/routes");
        setRoutes(response.data);
      } catch (err) {
        console.log("Lỗi fetch routes: " + err);
      }
    };
    fetchRoute();
  }, []);

  const handleFormSubmit = async (values) => {
    const price = values.price.replace(/\./g, ""); // Xóa dấu chấm
    const formattedPrice = parseInt(price, 10); // Chuyển về số nguyên

    const payload = {
      idCar: values.carId,
      idRoute: values.routeId,
      price: formattedPrice,
    };

    try {
      await request("put", `/admin/car-route/${id}`, payload); // Gửi request
      setSnackbarMessage("Cập nhập giá xe thành công");
      setSnackbarSeverity("success");
      setOpenSnackbar(true); // Mở snackbar thông báo thành công
    } catch (err) {
      setSnackbarMessage(
        err.response.data || "Có lỗi xảy ra, vui lòng thử lại"
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true); // Mở snackbar thông báo lỗi
      console.log("Lỗi khi gửi dữ liệu: ", err);
    }
  };

  // Hàm format giá tiền theo định dạng Việt Nam
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      currency: "VND",
    }).format(price); // Dùng decimal thay vì currency để không có ký hiệu tiền
  };

  // Hàm đóng snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Nếu chưa có carRoute, không render form
  if (!carRoute) return null;

  return (
    <Box m="20px">
      <Header
        title={"Chi Tiết Giá Xe"}
        subtitle={
          <span>
            <Link
              to="/admin/car-route"
              style={{ textDecoration: "none", color: "white" }}
            >
              Danh sách giá xe
            </Link>
            <span style={{ textDecoration: "none", color: "inherit" }}>
              {" > Thêm mới giá xe"}
            </span>
          </span>
        }
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          carId: carRoute.car.carId || "",
          routeId: carRoute.route.id || "",
          price: carRoute.price ? formatPrice(carRoute.price) : "",
        }}
        validationSchema={yup.object().shape({
          carId: yup.string().required("Vui lòng chọn xe!"),
          routeId: yup.string().required("Vui lòng chọn tuyến đường"),
          price: yup
            .number()
            .positive("Giá tiền phải lớn hơn 0!")
            .required("Vui lòng nhập giá tiền!"),
        })}
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
              {/* Car Dropdown */}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Chọn Xe</InputLabel>
                <Select
                  value={values.carId}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Car"
                  name="carId"
                  error={!!touched.carId && !!errors.carId}
                >
                  {cars.map((car) => (
                    <MenuItem key={car.carId} value={car.carId}>
                      {`${car.name} - ${car.plateNumber} - ${car.type.typeName} - ${car.type.numSeats} seats`}
                    </MenuItem>
                  ))}
                </Select>
                {touched.carId && errors.carId && (
                  <Box color="red">{errors.carId}</Box>
                )}
              </FormControl>

              {/* Route Dropdown */}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Chọn tuyến đường</InputLabel>
                <Select
                  value={values.routeId}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Route"
                  name="routeId"
                  error={!!touched.routeId && !!errors.routeId}
                >
                  {routes.map((route) => (
                    <MenuItem key={route.id} value={route.id}>
                      {`${route.startLocation} -> ${route.stopLocation}`}
                    </MenuItem>
                  ))}
                </Select>
                {touched.routeId && errors.routeId && (
                  <Box color="red">{errors.routeId}</Box>
                )}
              </FormControl>

              {/* Price Input */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Giá tiền"
                onBlur={handleBlur}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, "");
                  handleChange({ target: { name: "price", value: value } });
                }}
                value={values.price || ""}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* Submit Button */}
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Cập nhập giá xe
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {/* Snackbar for error or success */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DetailCarRoute;

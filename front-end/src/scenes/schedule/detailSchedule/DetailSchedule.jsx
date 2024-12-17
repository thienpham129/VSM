import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { request } from "admin/helpers/axios_helper";
import Header from "components/Header";

// Schema xác thực Formik
const scheduleSchema = yup.object().shape({
  driver: yup.string().required("Tài xế là bắt buộc"),
  car: yup.string().required("Tên xe là bắt buộc"),
  route: yup.string().required("Tuyến đường là bắt buộc"),
  date: yup.date().required("Ngày là bắt buộc"),
  hour: yup.number().required("Giờ là bắt buộc"),
  minute: yup.number().required("Phút là bắt buộc"),
  status: yup.string().required("Trạng thái là bắt buộc"),
  endTime: yup.date().nullable(), // Thêm xác thực cho trường giờ kết thúc
});

const DetailSchedule = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams(); // Lấy id từ URL params
  const [loading, setLoading] = useState(true);
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingRoutes, setLoadingRoutes] = useState(true);

  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [initialValues, setInitialValues] = useState({
    driver: "",
    car: "",
    route: "",
    date: new Date().toISOString().split("T")[0],
    hour: "",
    minute: "",
    status: "", // Thêm trạng thái vào initialValues
    endTime: "", // Thêm giờ kết thúc vào initialValues
  });

  // Gọi API để lấy thông tin lịch trình
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await request("get", `/public/schedule/${id}`);
        const data = response.data;

        const startDate = new Date(data.startTime);
        const endDate = new Date(data.endTime); // Giả sử bạn có trường endTime trong response

        setInitialValues({
          driver: data.account?.id || "",
          car: data.car?.carId || "",
          route: data.route?.id || "",
          date: startDate.toISOString().split("T")[0],
          hour: startDate.getHours(),
          minute: startDate.getMinutes(),
          status: data.status || "", // Lấy trạng thái từ dữ liệu
          endTime: endDate
            ? endDate.toISOString().substring(0, 16) // Format datetime-local (YYYY-MM-DDTHH:mm)
            : "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch trình:", error);
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  // Gọi API để lấy danh sách tài xế
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await request("get", "/driver/get-all");
        setDrivers(response.data);
        setLoadingDrivers(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tài xế:", error);
        setLoadingDrivers(false);
      }
    };
    fetchDrivers();
  }, []);

  // Gọi API để lấy danh sách xe
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await request("get", "/public/cars");
        setCars(response.data);
        setLoadingCars(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách xe:", error);
        setLoadingCars(false);
      }
    };
    fetchCars();
  }, []);

  // Gọi API để lấy danh sách tuyến đường
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await request("get", "/admin/routes");
        setRoutes(response.data);
        setLoadingRoutes(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tuyến đường:", error);
        setLoadingRoutes(false);
      }
    };
    fetchRoutes();
  }, []);

  const handleFormSubmit = async (values) => {
    const endtimeInput =
      values.endTime === "1970-01-01" ? null : values.endTime;
    try {
      const payload = {
        schduleId: id,
        accountId: values.driver,
        carId: values.car,
        routeId: values.route,
        startTime: `${values.date}T${values.hour
          .toString()
          .padStart(2, "0")}:${values.minute.toString().padStart(2, "0")}:00`,
        status: values.status,
        endTime: endtimeInput,
      };
      await request("put", `/admin/schedule`, payload);
      alert("thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật lịch trình:", error);
      // alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  if (loading || loadingDrivers || loadingCars || loadingRoutes) {
    return (
      <Box mt="20px" display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Header
        title={"Chi Tiết Lịch Trình"}
        subtitle={
          <span>
            <Link
              to="/admin/schedule"
              style={{ textDecoration: "none", color: "white" }}
            >
              Danh sách lịch trình
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
        enableReinitialize={true}
        validationSchema={scheduleSchema}
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
              {/* Dropdown Tài Xế */}
              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.driver && !!errors.driver}
              >
                <InputLabel>Tài Xế</InputLabel>
                <Select
                  name="driver"
                  value={values.driver}
                  onChange={handleChange}
                >
                  {drivers.map((driver) => (
                    <MenuItem key={driver.id} value={driver.id}>
                      {driver.firstName} {driver.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Dropdown Tên Xe */}
              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.car && !!errors.car}
              >
                <InputLabel>Tên Xe</InputLabel>
                <Select name="car" value={values.car} onChange={handleChange}>
                  {cars.map((car) => (
                    <MenuItem key={car.carId} value={car.carId}>
                      Xe {car.plateNumber} - {car.type.numSeat} chỗ
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Dropdown Tuyến Đường */}
              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 4" }}
                error={!!touched.route && !!errors.route}
              >
                <InputLabel>Tuyến Đường</InputLabel>
                <Select
                  name="route"
                  value={values.route}
                  onChange={handleChange}
                >
                  {routes.map((route) => (
                    <MenuItem key={route.id} value={route.id}>
                      {route.startLocation} {" > "}
                      {route.stopLocation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Các trường Ngày, Giờ, Phút */}
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Ngày"
                name="date"
                value={values.date}
                onChange={handleChange}
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ shrink: true }}
              />

              <FormControl variant="filled" sx={{ gridColumn: "span 1" }}>
                <InputLabel>Giờ</InputLabel>
                <Select name="hour" value={values.hour} onChange={handleChange}>
                  {[...Array(24).keys()].map((hour) => (
                    <MenuItem key={hour} value={hour}>
                      {hour}h
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="filled" sx={{ gridColumn: "span 1" }}>
                <InputLabel>Phút</InputLabel>
                <Select
                  name="minute"
                  value={values.minute}
                  onChange={handleChange}
                >
                  {[0, 10, 20, 30, 40, 50].map((minute) => (
                    <MenuItem key={minute} value={minute}>
                      {minute} phút
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.status && !!errors.status}
              >
                <InputLabel>Trạng Thái</InputLabel>
                <Select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                >
                  <MenuItem value="Đã lên lịch">Đã lên lịch</MenuItem>
                  <MenuItem value="Đang chạy">Đang chạy</MenuItem>
                  <MenuItem value="Đã hoàn thành">Đã hoàn thành</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label="Giờ Kết Thúc"
                name="endTime"
                value={values.endTime}
                onChange={handleChange}
                error={!!touched.endTime && !!errors.endTime}
                helperText={touched.endTime && errors.endTime}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Lưu Thay Đổi
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DetailSchedule;

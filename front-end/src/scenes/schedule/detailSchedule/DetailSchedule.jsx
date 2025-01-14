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
import { Snackbar, Alert } from "@mui/material";

const scheduleSchema = yup.object().shape({
  idSchedule: yup.number().required("ID Lịch trình là bắt buộc"),
  startTime: yup.date().required("Thời gian bắt đầu là bắt buộc"),
  status: yup.string().required("Trạng thái là bắt buộc"),
  price: yup.number().required("Giá vé là bắt buộc"),
  driver: yup.number().required("Tài xế là bắt buộc"),
  car: yup.string().required("Xe là bắt buộc"),
  route: yup.string().required("Tuyến đường là bắt buộc"),
  emptySeat: yup.number().required("Số ghế trống là bắt buộc"),
});

const DetailSchedule = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [scheduleData, setScheduleData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await request("get", `/public/schedule/${id}`);
        setScheduleData(response.data);
        setLoading(false);
        if (response.data.idRoute) {
          const carResponse = await request(
            "get",
            `/public/find-car-by-route?idRoute=${response.data.idRoute}`
          );
          setCarData(carResponse.data);
          console.log(carResponse.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch trình:", error);
        setLoading(false);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await request("get", "/driver/get-all");
        setDrivers(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tài xế:", error);
      }
    };

    fetchSchedule();
    fetchDrivers();
  }, [id]);

  const handleFormSubmit = async (values) => {
    try {
      const payload = {
        id: values.idSchedule,
        status: values.status,
        accountId: values.driver,
        carId: values.car,
        routeId: scheduleData.idRoute,
      };
      console.log(payload);

      await request("put", `/admin/schedule/${values.idSchedule}`, payload);
      setSnackbarMessage("Cập nhật lịch trình thành công!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Lỗi khi cập nhật lịch trình:", error);
      setSnackbarMessage("Có lỗi xảy ra, vui lòng thử lại!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  if (loading || !scheduleData) {
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
        initialValues={{
          idSchedule: scheduleData.id,
          startTime: scheduleData.startTime,
          status: scheduleData.status,
          price: scheduleData.price,
          driver: scheduleData.idDriver,
          car: scheduleData.idCar,
          route: `${scheduleData.startLocation} > ${scheduleData.stopLocation}`,
          emptySeat: scheduleData.emptySeat,
        }}
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
              <TextField
                fullWidth
                variant="filled"
                label="ID Lịch Trình"
                name="idSchedule"
                value={values.idSchedule}
                disabled
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label="Thời Gian Bắt Đầu"
                name="startTime"
                value={values.startTime}
                onChange={handleChange}
                error={!!touched.startTime && !!errors.startTime}
                helperText={touched.startTime && errors.startTime}
                sx={{ gridColumn: "span 2" }}
                disabled
                InputLabelProps={{ shrink: true }}
              />
              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.car && !!errors.car}
              >
                <InputLabel>Xe</InputLabel>
                <Select
                  name="car"
                  value={values.car || scheduleData.idCar}
                  onChange={handleChange}
                >
                  {carData && carData.length > 0 ? (
                    carData.map((car) => (
                      <MenuItem key={car.carId} value={car.carId}>
                        {`${car.name} - ${car.type.numSeats} chỗ`}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">
                      <em>Không có xe nào</em>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                label="Tuyến Đường"
                name="route"
                value={values.route}
                disabled
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Giá Vé"
                name="price"
                disabled
                value={values.price}
                onChange={handleChange}
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Số Ghế Trống"
                name="emptySeat"
                value={values.emptySeat}
                disabled
                sx={{ gridColumn: "span 2" }}
              />
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
        autoHideDuration={3000}
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

export default DetailSchedule;

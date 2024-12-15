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
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import { useEffect, useState } from "react";
import { request } from "admin/helpers/axios_helper";

// Khai báo initialValues
const initialValues = {
  driver: "",
  car: "",
  route: "",
  date: new Date().toISOString().split("T")[0], // Lấy ngày hiện tại theo định dạng yyyy-mm-dd
  hour: "",
  minute: "",
};

// Khai báo scheduleSchema với yup để kiểm tra form validation
const scheduleSchema = yup.object().shape({
  driver: yup.string().required("Tài xế là bắt buộc"),
  car: yup.string().required("Tên xe là bắt buộc"),
  route: yup.string().required("Tuyến đường là bắt buộc"),
  date: yup.date().required("Ngày là bắt buộc"),
  hour: yup.number().required("Giờ là bắt buộc"),
  minute: yup.number().required("Phút là bắt buộc"),
});

const AddSchedule = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [currentDate] = useState(new Date().toISOString().split("T")[0]);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [routes, setRoutes] = useState([]); // State lưu danh sách tuyến đường
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingRoutes, setLoadingRoutes] = useState(true); // State loading cho tuyến đường
  const [scheduleData, setScheduleData] = useState(null); // State lưu kết quả từ API
  const [newSchedule, setNewSchedule] = useState(initialValues);

  useEffect(() => {
    // Gọi API để lấy danh sách tài xế
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

  useEffect(() => {
    // Gọi API để lấy danh sách xe
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

  useEffect(() => {
    // Gọi API để lấy danh sách tuyến đường
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
  useEffect(() => {
    if (newSchedule.date && newSchedule.driver && newSchedule.car) {
      const requestData = {
        startDate: newSchedule.date,
        accountId: newSchedule.driver,
        carId: newSchedule.car,
      };

      const fetchDataSchedule = async () => {
        try {
          const response = await request(
            "post",
            "/public/find-schedule",
            requestData
          );
          setScheduleData(response.data); // Cập nhật dữ liệu lịch trình
        } catch (error) {
          setScheduleData([]);
          console.error("Lỗi khi lấy danh sách lịch trình:", error);
        }
      };

      fetchDataSchedule();
    }
  }, [newSchedule]);

  const handleFormSubmit = async (values) => {
    // Tạo startTime theo định dạng ISO từ date, hour và minute
    const startTime = `${values.date}T${String(values.hour).padStart(
      2,
      "0"
    )}:${String(values.minute).padStart(2, "0")}:00`;

    // Tạo body cho request
    const requestData = {
      startTime: startTime,
      accountId: values.driver,
      carId: values.car,
      routeId: values.route,
    };
    try {
      // Gửi request với phương thức POST đến /admin/schedule
      const response = await request("post", "/admin/schedule", requestData);

      // Xử lý thành công
      console.log("Lịch trình được tạo thành công:", response.data);
      alert("Lịch trình được tạo thành công!");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi tạo lịch trình:", error);
      alert("Đã có lỗi xảy ra khi tạo lịch trình. Vui lòng thử lại.");
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Thêm Mới Lịch Trình"
        subtitle="Tạo Mới Thông Tin Lịch Trình"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={scheduleSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          const handleInputChange = (e) => {
            const { name, value } = e.target;
            handleChange(e); // Cập nhật giá trị Formik
            setNewSchedule((prev) => ({
              ...prev,
              [name]: value, // Cập nhật newSchedule khi giá trị input thay đổi
            }));
          };

          return (
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
                    value={newSchedule.driver} // Lấy giá trị từ newSchedule
                    onChange={handleInputChange} // Cập nhật newSchedule khi thay đổi
                  >
                    {loadingDrivers ? (
                      <MenuItem disabled>
                        <CircularProgress size={24} />
                      </MenuItem>
                    ) : (
                      drivers.map((driver) => (
                        <MenuItem key={driver.id} value={driver.id}>
                          {driver.firstName} {driver.lastName}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>

                {/* Dropdown Tên Xe */}
                <FormControl
                  variant="filled"
                  sx={{ gridColumn: "span 2" }}
                  error={!!touched.car && !!errors.car}
                >
                  <InputLabel>Tên Xe</InputLabel>
                  <Select
                    name="car"
                    value={newSchedule.car} // Lấy giá trị từ newSchedule
                    onChange={handleInputChange} // Cập nhật newSchedule khi thay đổi
                  >
                    {loadingCars ? (
                      <MenuItem disabled>
                        <CircularProgress size={24} />
                      </MenuItem>
                    ) : (
                      cars.map((car) => (
                        <MenuItem key={car.carId} value={car.carId}>
                          {`Xe ${car.plateNumber}: ${
                            car.type.numSeat
                          } chỗ, ${car.type.price.toLocaleString()} VND`}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>

                {/* Chọn Ngày */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="Ngày"
                  onChange={handleInputChange} // Cập nhật newSchedule khi thay đổi
                  value={newSchedule.date} // Lấy giá trị từ newSchedule
                  name="date"
                  error={!!touched.date && !!errors.date}
                  helperText={touched.date && errors.date}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{
                    inputProps: { min: currentDate },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                {/* Chọn Giờ */}
                <FormControl variant="filled" sx={{ gridColumn: "span 1" }}>
                  <InputLabel>Giờ</InputLabel>
                  <Select
                    name="hour"
                    value={newSchedule.hour} // Lấy giá trị từ newSchedule
                    onChange={handleInputChange} // Cập nhật newSchedule khi thay đổi
                  >
                    {[...Array(24).keys()].map((hour) => (
                      <MenuItem key={hour} value={hour}>
                        {hour}h
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Chọn Phút */}
                <FormControl variant="filled" sx={{ gridColumn: "span 1" }}>
                  <InputLabel>Phút</InputLabel>
                  <Select
                    name="minute"
                    value={newSchedule.minute} // Lấy giá trị từ newSchedule
                    onChange={handleInputChange} // Cập nhật newSchedule khi thay đổi
                  >
                    {[0, 10, 20, 30, 40, 50].map((minute) => (
                      <MenuItem key={minute} value={minute}>
                        {minute} phút
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
                    value={newSchedule.route} // Lấy giá trị từ newSchedule
                    onChange={handleInputChange} // Cập nhật newSchedule khi thay đổi
                  >
                    {loadingRoutes ? (
                      <MenuItem disabled>
                        <CircularProgress size={24} />
                      </MenuItem>
                    ) : (
                      routes.map((route) => (
                        <MenuItem key={route.id} value={route.id}>
                          {`${route.startLocation} > ${route.stopLocation}`}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Box>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Tạo Mới Lịch Trình
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>

      {/* Hiển thị kết quả từ API */}
      {scheduleData ? (
        scheduleData.length === 0 ? (
          <Box mt="20px">
            <p>Chưa có lịch trình cho tài xế và xe này</p>
          </Box>
        ) : (
          <Box mt="20px">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Tài Xế
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Xe
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Tuyến Đường
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Thời Gian Bắt Đầu
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((schedule, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {schedule.account.firstName} {schedule.account.lastName}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {schedule.car.name}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {`${schedule.route.startLocation} > ${schedule.route.stopLocation}`}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {new Date(schedule.startTime).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )
      ) : (
        <Box mt="20px">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default AddSchedule;

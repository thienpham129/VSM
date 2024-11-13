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
  date: new Date().toISOString().split("T")[0], // Lấy ngày hiện tại theo định dạng yyyy-mm-dd
  hour: "",
  minute: "",
};

// Khai báo scheduleSchema với yup để kiểm tra form validation
const scheduleSchema = yup.object().shape({
  driver: yup.string().required("Tài xế là bắt buộc"),
  car: yup.string().required("Tên xe là bắt buộc"),
  date: yup.date().required("Ngày là bắt buộc"),
  hour: yup.number().required("Giờ là bắt buộc"),
  minute: yup.number().required("Phút là bắt buộc"),
});

const AddSchedule = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [currentDate] = useState(new Date().toISOString().split("T")[0]);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [loadingCars, setLoadingCars] = useState(true);
  const [scheduleData, setScheduleData] = useState(null); // State lưu kết quả từ API

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

  // useEffect để theo dõi sự thay đổi của ngày và tự động gọi API khi ngày thay đổi
  useEffect(() => {
    // Nếu tài xế và xe đã được chọn, gọi API để lấy lịch trình cho ngày mới
    if (initialValues.driver && initialValues.car && initialValues.date) {
      handleDriverAndCarChange(
        initialValues.driver,
        initialValues.car,
        initialValues.date
      );
    }
  }, [initialValues.date]); // Chỉ gọi lại khi ngày thay đổi

  const handleDriverAndCarChange = async (driverId, carId, startDate) => {
    if (driverId && carId && startDate) {
      try {
        // Gửi dữ liệu qua POST request với body
        const response = await request("post", "/public/find-schedule", {
          accountId: driverId,
          carId: carId,
          startDate: startDate,
        });
        setScheduleData(response.data); // Lưu kết quả vào state
        console.log(response.data); // Log kết quả ra màn hình
      } catch (error) {
        console.error("Lỗi khi lấy lịch trình:", error);
        setScheduleData(null);
      }
    }
  };

  const handleFormSubmit = (values) => {
    console.log(values);
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
                  onChange={(e) => {
                    handleChange(e);
                    handleDriverAndCarChange(
                      e.target.value,
                      values.car,
                      values.date
                    ); // Gọi API khi chọn tài xế
                  }}
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
                  value={values.car}
                  onChange={(e) => {
                    handleChange(e);
                    handleDriverAndCarChange(
                      values.driver,
                      e.target.value,
                      values.date
                    ); // Gọi API khi chọn xe
                  }}
                >
                  {loadingCars ? (
                    <MenuItem disabled>
                      <CircularProgress size={24} />
                    </MenuItem>
                  ) : (
                    cars.map((car) => (
                      <MenuItem key={car.carId} value={car.carId}>
                        {`Xe ${car.name}: ${
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
                onChange={(e) => {
                  handleChange(e);
                  // Gọi lại API mỗi khi ngày thay đổi
                  handleDriverAndCarChange(
                    values.driver,
                    values.car,
                    e.target.value
                  );
                }}
                value={values.date}
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

              <FormControl variant="filled" sx={{ gridColumn: "span 1" }}>
                <InputLabel>Giờ</InputLabel>
                <Select
                  name="hour"
                  value={values.hour}
                  onChange={handleChange}
                  error={!!touched.hour && !!errors.hour}
                >
                  {[...Array(24).keys()].map((hour) => (
                    <MenuItem key={hour + 1} value={hour + 1}>
                      {hour + 1}h
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
                  error={!!touched.minute && !!errors.minute}
                >
                  {[0, 10, 20, 30, 40, 50].map((minute) => (
                    <MenuItem key={minute} value={minute}>
                      {minute} phút
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Tạo Mới Lịch Trình
              </Button>
            </Box>
          </form>
        )}
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

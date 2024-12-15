import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import StyledDataGridContainer from "./StyledDataGridContainer";
import { Button, Box, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddDriverModal from "./AddDriverModal";
import { request } from "../../admin/helpers/axios_helper"; // Đảm bảo import hàm request

const DriverAdmin = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [driverData, setDriverData] = useState([]); // State để lưu danh sách tài xế
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    status: "",
  });

  // Hàm fetch dữ liệu tài xế từ API
  const fetchDriverData = async () => {
    try {
      const response = await request("GET", "/driver/get-all");
      console.log("Dữ liệu tài xế:", response);
      setDriverData(response.data); // Cập nhật driverData với dữ liệu từ API
    } catch (error) {
      console.error("Có lỗi xảy ra khi fetch dữ liệu tài xế:", error);
      setSnackbar({
        open: true,
        message: "Có lỗi xảy ra khi tải dữ liệu tài xế.",
        status: "error",
      });
    }
  };

  // Gọi hàm fetch dữ liệu khi component mount
  useEffect(() => {
    fetchDriverData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({ email: "", password: "" });
    setNewDriver({ email: "", password: "" });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDriver({ ...newDriver, [name]: value });

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: !validateEmail(value) ? "Email không hợp lệ." : "",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: value.length < 8 ? "Mật khẩu ít nhất 8 ký tự." : "",
      }));
    }
  };

  const handleSubmit = async () => {
    const emailError = !newDriver.email
      ? "Email không được để trống."
      : !validateEmail(newDriver.email)
      ? "Email không hợp lệ."
      : "";
    const passwordError = !newDriver.password
      ? "Mật khẩu không được để trống."
      : newDriver.password.length < 8
      ? "Mật khẩu ít nhất 8 ký tự."
      : "";

    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      try {
        // Gọi API để thêm tài xế mới
        const response = await request("POST", "/driver/create", newDriver);
        console.log("Phản hồi từ API:", response);

        // Kiểm tra phản hồi và cập nhật thông báo snackbar
        if (response.status === 200) {
          setSnackbar({
            open: true,
            message: "Tài xế mới đã được thêm thành công!",
            status: "success",
          });
          fetchDriverData(); // Gọi lại hàm fetch để lấy dữ liệu mới
        } else {
          setSnackbar({
            open: true,
            message: "Có lỗi xảy ra khi thêm tài xế.",
            status: "error",
          });
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API:", error);
        // Kiểm tra nếu là lỗi 500 và thông báo cụ thể
        if (error.response && error.response.status === 500) {
          setSnackbar({
            open: true,
            message: "Email đã tồn tại",
            status: "error",
          });
        } else {
          setSnackbar({
            open: true,
            message: "Có lỗi xảy ra khi thêm tài xế.",
            status: "error",
          });
        }
      }

      handleClose();
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Họ Tên",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Địa Chỉ",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Số Điện Thoại",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "is_available",
      headerName: "Trạng Thái",
      flex: 1,
      valueGetter: (params) => (params.row.available ? "Rảnh" : "Bận"),
    },
    {
      field: "detail",
      headerName: "Chi Tiết",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/admin/driver/${params.row.id}`)}
        >
          Xem Chi Tiết
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Quản Lý Tài Xế" subtitle="Danh Sách Thông Tin Tài Xế" />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button variant="contained" color="success" onClick={handleClickOpen}>
          Thêm Mới Tài Xế
        </Button>
      </Box>
      <StyledDataGridContainer>
        <DataGrid
          rows={driverData} // Sử dụng driverData từ state
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </StyledDataGridContainer>

      {/* Sử dụng component modal mới */}
      <AddDriverModal
        open={open}
        handleClose={handleClose}
        newDriver={newDriver}
        setNewDriver={setNewDriver}
        errors={errors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      {/* Snackbar thông báo thành công hoặc lỗi */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ContentProps={{
          style: {
            backgroundColor: snackbar.status === "error" ? "red" : "green", // Thay đổi màu sắc dựa trên trạng thái
            color: "white",
          },
        }}
      />
    </Box>
  );
};

export default DriverAdmin;

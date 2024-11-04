import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataAccount } from "../../admin/data/mockData";
import Header from "../../components/Header";
import StyledDataGridContainer from "./StyledDataGridContainer";
import { Button, Box, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddDriverModal from "./AddDriverModal";

const DriverAdmin = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const driverData = mockDataAccount.filter(
    (account) => account.role === "ROLE_DRIVER"
  );

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Họ Tên",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Địa Chỉ",
      flex: 1,
    },
    {
      field: "phone_number",
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
      valueGetter: (params) => (params.row.is_available ? "Rảnh" : "Bận"),
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

  const handleSubmit = () => {
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
      console.log("Thêm tài xế mới:", newDriver);
      setSnackbarMessage("Tài xế mới đã được thêm thành công!");
      setSnackbarOpen(true);
      handleClose();
    }
  };

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
          rows={driverData}
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

      {/* Snackbar thông báo thành công */}
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

export default DriverAdmin;
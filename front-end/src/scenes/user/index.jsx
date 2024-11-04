import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../theme";
import { mockDataUser } from "../../admin/data/mockData";
import Header from "../../components/Header";
import UserFormDialog from "./UserFormDialog";
import ConfirmDialog from "./ConfirmDialog";
import SnackbarAlert from "./SnackbarAlert";
import UserDataGrid from "./UserDataGrid";

const UserAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [userToBan, setUserToBan] = useState(null);
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({ email: "", password: "" });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    const newErrors = { email: "", password: "" };

    if (!newUser.email) {
      newErrors.email = "Email không được để trống";
    } else if (!validateEmail(newUser.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    if (!newUser.password) {
      newErrors.password = "Password không được để trống";
    } else if (newUser.password.length < 8) {
      newErrors.password = "Password phải ít nhất 8 ký tự";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    console.log("Thêm người dùng mới:", newUser);
    setNewUser({ email: "", firstName: "", lastName: "", password: "" });
    handleClose();
    setSnackbarMessage("Thêm người dùng thành công.");
    setSnackbarOpen(true);
  };

  const handleConfirmBanUnbanUser = (user) => {
    setUserToBan(user);
    setConfirmDialogOpen(true);
  };

  const handleBanUser = () => {
    console.log("Đã ban người dùng:", userToBan);
    setSnackbarMessage("Bạn đã ban người dùng thành công.");
    setSnackbarOpen(true);
    setConfirmDialogOpen(false);
    setUserToBan(null);
  };

  const handleUnbanUser = () => {
    console.log("Đã bỏ ban người dùng:", userToBan);
    setSnackbarMessage("Bạn đã bỏ ban người dùng thành công.");
    setSnackbarOpen(true);
    setConfirmDialogOpen(false);
    setUserToBan(null);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "gender", headerName: "Giới Tính", flex: 1 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (params) => params.row.account?.email || "",
    },
    {
      field: "fullname",
      headerName: "Họ và Tên",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.account?.lastName || ""} ${
          params.row.account?.firstName || ""
        }`,
      cellClassName: "name-column--cell",
    },
    {
      field: "Khả Dụng",
      headerName: "Enabled",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: params.row.account?.enabled
              ? colors.greenAccent[600]
              : colors.redAccent[600],
            color: "#fff",
            "&:hover": {
              backgroundColor: params.row.account?.enabled
                ? colors.greenAccent[700]
                : colors.redAccent[700],
            },
          }}
        >
          {params.row.account?.enabled ? "Enable" : "Disable"}
        </Button>
      ),
    },
    {
      field: "banUser",
      headerName: "Action",
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.account?.enabled ? "error" : "success"}
          sx={{ width: "150px" }}
          onClick={() => handleConfirmBanUnbanUser(params.row)}
        >
          {params.row.account?.enabled
            ? "Chặn Người dùng"
            : "Bỏ Chặn Người Dùng"}
        </Button>
      ),
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="USER" subtitle="MANAGE USER" />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Thêm Mới Người Dùng
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <UserDataGrid
          rows={mockDataUser}
          columns={columns}
          onBanUnban={handleConfirmBanUnbanUser}
        />
      </Box>

      <UserFormDialog
        open={open}
        onClose={handleClose}
        newUser={newUser}
        setNewUser={setNewUser}
        handleSubmit={handleSubmit}
        errors={errors}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        userToBan={userToBan}
        onConfirm={() =>
          userToBan?.account?.enabled ? handleBanUser() : handleUnbanUser()
        }
      />

      <SnackbarAlert
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default UserAdmin;
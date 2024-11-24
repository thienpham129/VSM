import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import UserFormDialog from "./UserFormDialog";
import ConfirmDialog from "./ConfirmDialog";
import SnackbarAlert from "./SnackbarAlert";
import UserDataGrid from "./UserDataGrid";
import { request } from "admin/helpers/axios_helper";
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
  const [listUser, setListUser] = useState([]);

  // call list user
  const fetchUsers = async () => {
    try {
      const response = await request("get", "/admin/users");
      setListUser(response.data); // Cập nhật danh sách người dùng
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({ email: "", password: "" });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
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

    try {
      // Gọi API để tạo mới người dùng
      const response = await request("post", "/admin/user", {
        email: newUser.email,
        password: newUser.password,
      });

      // Cập nhật danh sách người dùng sau khi thêm mới thành công
      setListUser((prevUsers) => [...prevUsers, response.data]);

      // Reset form và hiển thị thông báo
      setNewUser({ email: "", firstName: "", lastName: "", password: "" });
      handleClose();
      setSnackbarMessage("Thêm người dùng thành công.");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(error.response.data);
      setSnackbarOpen(true);
    }
  };

  const handleConfirmBanUnbanUser = (user) => {
    setUserToBan(user.row);
    setConfirmDialogOpen(true);
  };

  const handleBanUser = async () => {
    try {
      const response = await request("put", `/admin/user/ban/${userToBan.id}`);
      // Kiểm tra nếu thành công
      if (response.status === 200) {
        setSnackbarMessage("Bạn đã ban người dùng thành công.");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Có lỗi khi ban người dùng.");
        setSnackbarOpen(true);
      }
      setConfirmDialogOpen(false);
      setUserToBan(null);
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi ban người dùng:", error);
      setSnackbarMessage("Có lỗi khi ban người dùng.");
      setSnackbarOpen(true);
    }
  };

  const handleUnbanUser = async () => {
    try {
      const response = await request("put", `/admin/user/ban/${userToBan.id}`);
      // Kiểm tra nếu thành công
      if (response.status === 200) {
        setSnackbarMessage("Bạn đã bỏ chặn người dùng thành công.");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Có lỗi khi bỏ chặn người dùng.");
        setSnackbarOpen(true);
      }
      setConfirmDialogOpen(false);
      setUserToBan(null);
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi bỏ chặn người dùng:", error);
      setSnackbarMessage("Có lỗi khi bỏ chặn người dùng.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "fullname",
      headerName: "Họ và Tên",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.lastName || ""} ${params.row.firstName || ""}`,
      cellClassName: "name-column--cell",
    },
    {
      field: "role",
      headerName: "Vai Trò",
      flex: 1,
    },
    {
      field: "enabled",
      headerName: "Trạng Thái",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: params.row.enabled
              ? colors.greenAccent[600]
              : colors.redAccent[600],
            color: "#fff",
            "&:hover": {
              backgroundColor: params.row.enabled
                ? colors.greenAccent[700]
                : colors.redAccent[700],
            },
          }}
        >
          {params.row.enabled ? "Enabled" : "Disabled"}
        </Button>
      ),
    },
    {
      field: "banUser",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.enabled ? "error" : "success"}
          sx={{ width: "150px" }}
          onClick={() => handleConfirmBanUnbanUser(params.row)}
        >
          {params.row.enabled ? "Chặn Người dùng" : "Bỏ Chặn Người Dùng"}
        </Button>
      ),
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
          rows={listUser} // Sử dụng dữ liệu thực tế từ API
          columns={columns} // Cập nhật cột để khớp với dữ liệu mới
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
          userToBan?.enabled ? handleBanUser() : handleUnbanUser()
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

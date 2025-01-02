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
const FeedbackAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
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
      console.log("««««« response.data »»»»»", response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);



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
      headerName: "Đánh giá",
      flex: 1,
    },
   
  ];

  return (
    <Box m="20px">
      <Header
        title="Quản Lý Đánh Giá"
        subtitle="Quản Lý Đánh Giá Người Dùng"
      />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
       
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
        />
      </Box>

      
    </Box>
  );
};

export default FeedbackAdmin;

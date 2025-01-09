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

  const [listFeedback, setListFeedback] = useState([]);
  console.log('««««« listFeedback »»»»»', listFeedback);

  // call list user
  const fetchFeedback = async () => {
    try {
      const response = await request("get", "/public/view-feedback");
      const formattedData = response.data.data.map((item, index) => ({
        id: item.feedbackId, 
        fullName: item.fullName,
        content: item.content,
        email: item.account?.email || "Không có email",
      }));
      setListFeedback(formattedData);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };
  useEffect(() => {
    fetchFeedback();
  }, []);



  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "fullName", headerName: "Họ và Tên", flex: 1 },
    { field: "content", headerName: "Nội Dung", flex: 1 },
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
          rows={listFeedback} // Sử dụng dữ liệu thực tế từ API
          columns={columns} // Cập nhật cột để khớp với dữ liệu mới
        />
      </Box>

      
    </Box>
  );
};

export default FeedbackAdmin;

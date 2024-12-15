import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { request } from "../../admin/helpers/axios_helper"; // Import hàm request

const Schedule = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // State để lưu dữ liệu từ API
  const [schedules, setSchedules] = useState([]);

  const handleClickOpen = () => {
    navigate("/admin/schedule/create");
  };

  const handleDetail = (id) => {
    navigate(`/admin/schedule/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Xóa lịch trình với ID:", id);
  };

  // Gọi API để lấy dữ liệu lịch trình
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request("get", "/public/schedules");
        setSchedules(response.data); // Lưu data từ API vào state
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch trình:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Tài Xế",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.account?.firstName || ""} ${
          params.row.account?.lastName || ""
        }`,
      cellClassName: "name-column--cell",
    },
    {
      field: "carName",
      headerName: "Tên Xe",
      flex: 1,
      valueGetter: (params) => params.row.car?.name || "",
    },
    {
      field: "startTime",
      headerName: "Giờ Xuất Phát",
      flex: 1,
    },
    {
      field: "endTime",
      headerName: "Giờ Kết Thúc",
      flex: 1,
    },
    {
      field: "route", // Cập nhật cột chuyến đường
      headerName: "Chuyến Đường",
      flex: 1,
      valueGetter: (params) => {
        const startLocation = params.row.route?.startLocation || "";
        const stopLocation = params.row.route?.stopLocation || "";
        return `${startLocation} > ${stopLocation}`;
      },
    },
    {
      field: "status",
      headerName: "Trạng Thái",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Hành Động",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleDetail(params.row.id)}
          >
            Chi Tiết
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Xóa
          </Button> */}
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Quản Lý Lịch Trình"
        subtitle="Danh Sách Thông Tin Lịch Trình"
      />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Thêm Mới Lịch Trình
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
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
        <DataGrid
          rows={schedules} // Thay mockDataSchedules bằng dữ liệu từ API
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id} // Xác định ID của mỗi row
        />
      </Box>
    </Box>
  );
};

export default Schedule;

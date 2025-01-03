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
        const response = await request("get", "/public/schedule");
        const sortedData = response.data.sort(
          (a, b) => new Date(b.startTime) - new Date(a.startTime)
        );
        setSchedules(sortedData); // Lưu data từ API vào state
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch trình:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "nameDriver",
      headerName: "Tài Xế",
      flex: 0.5,
      valueGetter: (params) =>
        `${
          params.row.idDriver
            ? `${params.row.firstNameDriver} ${params.row.lastNameDriver}`
            : "Chưa phân công"
        }`,
      renderCell: (params) => {
        const isUnassigned = !params.row.idDriver;
        return (
          <span
            style={{
              color: isUnassigned ? "red" : "inherit",
              fontWeight: isUnassigned ? "bold" : "normal",
            }}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      field: "carDetails",
      headerName: "Tên Xe - Biển Số",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.nameCar || "Không rõ"} - ${
          params.row.plateNumber || "Không rõ"
        }`,
    },
    {
      field: "startTime",
      headerName: "Giờ Xuất Phát",
      flex: 0.5,
      valueGetter: (params) =>
        new Date(params.row.startTime).toLocaleString("vi-VN", {
          dateStyle: "short",
          timeStyle: "short",
        }),
    },
    {
      field: "route", // Cột tuyến đường
      headerName: "Tuyến Đường",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.startLocation || ""} > ${params.row.stopLocation || ""}`,
    },
    {
      field: "status",
      headerName: "Trạng Thái",
      flex: 0.5,
      renderCell: (params) => {
        const statusColor = {
          "Đã lên lịch": "yellow",
          "Đang chạy": "orange",
          "Đã hoàn thành": "green",
        };

        return (
          <span
            style={{
              color: statusColor[params.value] || "inherit",
              fontWeight: "bold",
            }}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      field: "price",
      headerName: "Giá Vé",
      flex: 0.5,
      valueGetter: (params) =>
        `${params.row.price?.toLocaleString("vi-VN")} VND` || "Chưa cập nhật",
    },
    {
      field: "actions",
      headerName: "Hành Động",
      flex: 0.5,
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
          rows={schedules}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
};

export default Schedule;

import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataSchedules } from "../../admin/data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    navigate("/admin/schedule/create");
  };

  const handleDetail = (id) => {
    navigate(`/admin/schedule/${id}`);
  };

  const handleDelete = (id) => {
    // Logic để xóa item dựa trên id (bạn có thể thêm xác nhận hoặc xử lý API tại đây)
    console.log("Xóa lịch trình với ID:", id);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Tài Xế",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.account.firstName} ${params.row.account.lastName}`, // Lấy tên từ account
      cellClassName: "name-column--cell",
    },
    {
      field: "carName",
      headerName: "Tên Xe",
      flex: 1,
      valueGetter: (params) => params.row.car.name, // Lấy tên xe
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
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Xóa
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
          Thêm Mới Loại Xe
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
          rows={mockDataSchedules}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Schedule;

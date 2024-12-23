import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "admin/helpers/axios_helper";

const TemplateSeat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  // Fetch types data
  const fetchTypes = async () => {
    try {
      const response = await request("GET", `/admin/types`);
      setTypes(response.data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  // Delete type method
  const deleteType = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mẫu này không?")) {
      try {
        await request("DELETE", `/admin/type/${id}`);
        setTypes((prevTypes) => prevTypes.filter((type) => type.id !== id));
        alert("Mẫu đã được xóa thành công!");
      } catch (error) {
        console.error("Error deleting type:", error);
        alert("Xóa mẫu thất bại. Vui lòng thử lại!");
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "typeName", headerName: "Tên Mẫu", flex: 1 },
    { field: "numSeats", headerName: "Số Lượng Ghế", flex: 1 },
    {
      field: "action",
      headerName: "Chi Tiết",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/admin/template-seat/${params.row.id}`)}
        >
          Chi Tiết
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Xóa",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteType(params.row.id)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  const rows = types.map((type) => ({
    id: type.id,
    typeName: type.typeName,
    numSeats: type.numSeats,
    seatList: type.seatList,
  }));

  return (
    <Box m="20px">
      <Header
        title="Mẫu Chỗ Ngồi"
        subtitle="Quản lý mẫu vị trí chỗ ngồi của xe"
      />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/admin/template-seat/addnew")}
        >
          Thêm mới mẫu
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
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default TemplateSeat;

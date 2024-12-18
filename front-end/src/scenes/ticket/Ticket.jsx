import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "admin/helpers/axios_helper";

const Ticket = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [tickets, SetTickets] = useState([]);

  const fetchTicket = async () => {
    try {
      const response = await request("GET", "/admin/tickets");
      const data = response.data
        .map((ticket) => ({
          id: ticket.ticketId, // DataGrid requires an id field
          ...ticket,
          startTime: ticket.schedules?.startTime, // Giờ khởi hành
        }))
        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime)); // Sort theo ngày giờ mới nhất
      SetTickets(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchTicket();
  }, []);

  const handleDetailClick = (id) => {
    navigate(`/admin/ticket/${id}`);
  };

  const columns = [
    { field: "ticketId", headerName: "ID", flex: 0.5 },
    { field: "fullName", headerName: "Họ Tên", flex: 1 },
    { field: "phoneNumber", headerName: "Số Điện Thoại", flex: 1 },
    {
      field: "selectedSeat",
      headerName: "Ghê đã chọn",
      flex: 0.5,
      valueGetter: (params) => params.row.selectedSeat.join(", "),
    },
    {
      field: "startTime",
      headerName: "Giờ Khởi Hành",
      flex: 1,
    },
    { field: "totalPrice", headerName: "Giá tiền", flex: 1, type: "number" },
    { field: "status", headerName: "Trạng thái", flex: 1 },
    {
      field: "paid",
      headerName: "Thanh toán",
      flex: 1,
      renderCell: (params) =>
        params.row.paid ? "Đã thanh toán" : "Chưa thanh toán",
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDetailClick(params.row.ticketId)}
        >
          Chi Tiết
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Vé Xe" subtitle="Danh Sách Thông Tin Vé Xe" />
      {/* <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button variant="contained" color="secondary">
          Thêm Mới Vé Xe
        </Button>
      </Box> */}
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
          rows={tickets}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Ticket;

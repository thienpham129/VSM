import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { request } from "admin/helpers/axios_helper";
import { useNavigate } from "react-router-dom";

const CarRoute = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [carRoute, setCarRoute] = useState([]);
  const [selectedCarRoute, setSelectedCarRoute] = useState(null); // Dữ liệu được chọn để xóa
  const [openDialog, setOpenDialog] = useState(false); // Trạng thái popup
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false); // Trạng thái snackbar
  const navigate = useNavigate();

  // Fetch dữ liệu từ API
  const fetchCarRoute = async () => {
    try {
      const response = await request("get", "/public/car-route");
      setCarRoute(response.data);
    } catch (err) {
      console.log("Lỗi fetch car route: " + err);
    }
  };

  useEffect(() => {
    fetchCarRoute();
  }, []);

  // Mở dialog xóa
  const handleDeleteClick = (row) => {
    setSelectedCarRoute(row);
    setOpenDialog(true);
  };

  // Xử lý xóa
  const handleDeleteConfirm = async () => {
    try {
      // Gửi request xóa car route từ API
      await request("delete", `/admin/car-route/${selectedCarRoute.id}`);
      // Sau khi xóa thành công, đóng dialog và cập nhật lại danh sách car route
      setOpenDialog(false);
      setCarRoute(carRoute.filter((route) => route.id !== selectedCarRoute.id));
      setSnackbarMessage("Xóa tuyến xe thành công!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (err) {
      setSnackbarMessage("Có lỗi xảy ra khi xóa tuyến xe.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.log("Lỗi khi xóa car route:", err);
    }
  };

  // Đóng dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Cột cho DataGrid
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "carDetails",
      headerName: "Chi Tiết Xe",
      flex: 2,
      valueGetter: (params) =>
        `${params.row.car.name} - ${params.row.car.plateNumber} - ${params.row.car.type.typeName} ${params.row.car.type.numSeats} chỗ`,
    },
    {
      field: "routeDetails",
      headerName: "Tuyến Đường",
      flex: 2,
      valueGetter: (params) =>
        `${params.row.route.startLocation} -> ${params.row.route.stopLocation}`,
    },
    {
      field: "price",
      headerName: "Giá Tiền",
      flex: 1,
      valueGetter: (params) => `${params.row.price.toLocaleString()} VND`,
    },
    {
      field: "actions",
      headerName: "Hành Động",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/admin/car-route/${params.row.id}`)}
          >
            Chi Tiết
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteClick(params.row)}
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
        title="Chi Tiết Giá Xe"
        subtitle="Danh sách các tuyến xe và giá vé"
      />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/admin/car-route/create");
          }}
        >
          Thêm Mới Giá Xe
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
        }}
      >
        <DataGrid
          rows={carRoute}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id} // Định nghĩa ID cho các hàng
        />
      </Box>

      {/* Dialog Xóa */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "25%", // Cập nhật chiều rộng của dialog thành 50%
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Xác Nhận Xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa car route với ID{" "}
            <strong>{selectedCarRoute?.id}</strong>? Hành động này không thể
            hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for error or success */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CarRoute;

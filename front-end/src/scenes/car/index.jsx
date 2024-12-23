import { Box, Button } from "@mui/material";
import {
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import CarTable from "./carTable";
import { useNavigate } from "react-router-dom";
import { request } from "../../admin/helpers/axios_helper"; // Import hàm request
import { getCarTableStyles } from "./CarTableStyles"; // Import styles mới

const CarAdmin = () => {
  const theme = useTheme();
  const styles = getCarTableStyles(theme); // Lấy styles từ component mới
  const navigate = useNavigate();
  const [mockCars, setMockCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const response = await request("get", "/public/cars");
      const formattedData = response.data.map((car) => ({
        ...car,
        id: car.carId, // Đảm bảo mỗi hàng có `id` duy nhất
        typeNameWithSeats: car.type
          ? `${car.type.typeName} - ${car.type.numSeats} chỗ`
          : "Không xác định",
      }));
      setMockCars(formattedData);
    } catch (err) {
      setError("Không thể tải dữ liệu xe. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCar = async () => {
    try {
      await request("delete", `/admin/car/${selectedCarId}`);
      setSnackbar({
        open: true,
        message: "Xóa xe thành công!",
        severity: "success",
      });
      setMockCars((prev) => prev.filter((car) => car.carId !== selectedCarId));
    } catch (error) {
      console.error("Lỗi khi xóa xe:", error);
      setSnackbar({
        open: true,
        message: "Xóa xe thất bại. Vui lòng thử lại.",
        severity: "error",
      });
    } finally {
      handleCloseDialog();
    }
  };

  const handleOpenDialog = (carId) => {
    setSelectedCarId(carId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCarId(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleAddCar = () => {
    navigate("/admin/car/create"); // Chuyển hướng đến trang thêm mới xe
  };

  const columns = [
    { field: "carId", headerName: "Car ID", flex: 0.3 },
    { field: "name", headerName: "Tên Xe", flex: 0.5 },
    { field: "plateNumber", headerName: "Biển Số Xe", flex: 0.5 },
    {
      field: "typeNameWithSeats",
      headerName: "Mẫu Xe (Ghế)",
      flex: 0.7,
    },
    {
      field: "dayMaintenance",
      headerName: "Ngày Bảo Hành",
      flex: 0.5,
      valueGetter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "N/A",
    },
    {
      field: "parking",
      headerName: "Đỗ Xe",
      flex: 0.5,
      valueGetter: (params) => {
        return params.row.parking ? params.row.parking.name : "Chưa đỗ xe";
      },
    },
    {
      field: "yearOfManufacture",
      headerName: "Năm Sản Xuất",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
      valueFormatter: (params) => {
        const year = params.value;
        return year ? year.toString() : "Không xác định";
      },
    },
    {
      field: "details",
      headerName: "Chi tiết",
      flex: 0.3,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(`/admin/car/${params.row.carId}`)}
        >
          Chi tiết
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Xóa",
      flex: 0.3,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleOpenDialog(params.row.carId)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Danh Sách Xe" subtitle="Quản Lý Danh Sách Thông Tin Xe" />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="secondary" onClick={handleAddCar}>
          Thêm Mới Xe
        </Button>
      </Box>
      <Box m="40px 0 0 0" height="75vh" sx={styles}>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <p>Đang tải dữ liệu...</p>
          </Box>
        ) : error ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <p>{error}</p>
          </Box>
        ) : (
          <CarTable rows={mockCars} columns={columns} />
        )}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa xe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa xe này? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteCar} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default CarAdmin;

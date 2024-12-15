import { useState, useEffect } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import Header from "../../components/Header";
import ParkingLotTable from "./ParkingLotTable";
import ParkingLotDialog from "./ParkingLotDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { request } from "admin/helpers/axios_helper"; // import hàm gọi API

const ParkingLot = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [parkingLotToDelete, setParkingLotToDelete] = useState(null);
  const [newParkingLot, setNewParkingLot] = useState({
    name: "",
    location: "",
    capacity: 0,
    numCar: 0,
    empty: true,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Gọi API để lấy dữ liệu bãi đỗ xe khi component được mount
  useEffect(() => {
    fetchParkingLots();
  }, []);

  const fetchParkingLots = async () => {
    try {
      const response = await request("get", "/driver/parkings");
      const formattedData = response.data.map((lot) => ({
        id: lot.id,
        name: lot.name,
        location: lot.location,
        capacity: lot.capacity,
        numCar: lot.numCar,
        empty: lot.empty,
      }));
      setParkingLots(formattedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bãi đỗ xe:", error);
      setSnackbar({
        open: true,
        message: "Không thể tải dữ liệu bãi đỗ xe.",
        severity: "error",
      });
    }
  };

  const handleDelete = (id) => {
    setParkingLotToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await request("delete", `/admin/parking/${parkingLotToDelete}`);
      setParkingLots(
        parkingLots.filter((lot) => lot.id !== parkingLotToDelete)
      );
      setConfirmDeleteOpen(false);
      setSnackbar({
        open: true,
        message: "Xóa bãi đỗ xe thành công!",
        severity: "success",
      });
    } catch (error) {
      console.error("Lỗi khi xóa bãi đỗ xe:", error);
      setSnackbar({
        open: true,
        message: "Không thể xóa bãi đỗ xe.",
        severity: "error",
      });
    }
  };

  const handleUpdate = (row) => {
    setNewParkingLot(row);
    setOpen(true);
  };

  const handleClickOpen = () => {
    setNewParkingLot({
      name: "",
      location: "",
      capacity: 0,
      numCar: 0,
      empty: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddParkingLot = async (newParkingLot) => {
    try {
      const response = await request("post", "/admin/parking", newParkingLot);
      const addedLot = {
        ...newParkingLot,
        id: response.data.id,
      };
      setParkingLots([...parkingLots, addedLot]);
      handleClose();
      setSnackbar({
        open: true,
        message: "Thêm bãi đỗ xe thành công!",
        severity: "success",
      });
    } catch (error) {
      console.error("Lỗi khi thêm bãi đỗ xe:", error);
      setSnackbar({
        open: true,
        message: "Không thể thêm bãi đỗ xe.",
        severity: "error",
      });
    }
  };

  const handleUpdateParkingLot = async (updatedParkingLot) => {
    try {
      await request(
        "put",
        `/admin/parking/${updatedParkingLot.id}`,
        updatedParkingLot
      );
      const updatedParkingLots = parkingLots.map((lot) =>
        lot.id === updatedParkingLot.id ? updatedParkingLot : lot
      );
      setParkingLots(updatedParkingLots);
      handleClose();
      setSnackbar({
        open: true,
        message: "Cập nhật bãi đỗ xe thành công!",
        severity: "success",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật bãi đỗ xe:", error);
      setSnackbar({
        open: true,
        message: "Không thể cập nhật bãi đỗ xe.",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Tên Bãi Đỗ Xe", flex: 0.5 },
    { field: "location", headerName: "Địa Điểm", flex: 1 },
    { field: "capacity", headerName: "Sức Chứa", type: "number" },
    { field: "numCar", headerName: "Số Xe Đã Đỗ", type: "number" },
    {
      field: "empty",
      headerName: "Còn Trống",
      type: "boolean",
      renderCell: (params) => (
        <strong>{params.value ? "Trống" : "Hết chỗ"}</strong>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="BÃI ĐỖ XE"
        subtitle="Quản Lý Danh Sách Thông Tin Bãi Đỗ Xe"
      />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Tạo Mới Bãi Đỗ Xe
        </Button>
      </Box>
      <ParkingLotTable
        rows={parkingLots}
        columns={columns}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <ParkingLotDialog
        open={open}
        onClose={handleClose}
        parkingLot={newParkingLot}
        onConfirm={(values) => {
          if (values.id) {
            handleUpdateParkingLot(values);
          } else {
            handleAddParkingLot(values);
          }
        }}
      />
      <ConfirmDeleteDialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ParkingLot;

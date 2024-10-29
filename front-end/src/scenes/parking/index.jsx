import { useState } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import { mockParkingLot } from "admin/data/mockData";
import Header from "../../components/Header";
import ParkingLotTable from "./ParkingLotTable";
import ParkingLotDialog from "./ParkingLotDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const ParkingLot = () => {
  const [parkingLots, setParkingLots] = useState(mockParkingLot);
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
  const [errors, setErrors] = useState({});

  // State cho Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // hoặc "error", "warning", tùy vào từng trường hợp
  });

  const handleDelete = (id) => {
    setParkingLotToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    setParkingLots(parkingLots.filter((lot) => lot.id !== parkingLotToDelete));
    setConfirmDeleteOpen(false);
    setParkingLotToDelete(null);

    setSnackbar({
      open: true,
      message: "Xóa bãi đỗ xe thành công!",
      severity: "success",
    });
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
    setErrors({});
  };

  const handleConfirm = () => {
    const newErrors = {};
    if (!newParkingLot.name) newErrors.name = "Name is required.";
    if (!newParkingLot.location) newErrors.location = "Location is required.";
    if (newParkingLot.capacity <= 0)
      newErrors.capacity = "Capacity must be positive.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newId = parkingLots.length
      ? parkingLots[parkingLots.length - 1].id + 1
      : 1;
    const parkingLotToAdd = { ...newParkingLot, id: newId };

    setParkingLots([...parkingLots, parkingLotToAdd]);
    handleClose();

    setSnackbar({
      open: true,
      message: parkingLotToAdd.id
        ? "Cập nhật bãi đỗ xe thành công!"
        : "Thêm bãi đỗ xe thành công!",
      severity: "success",
    });
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
      <Header title="BÃI ĐỖ XE" subtitle="Quản Lý Bãi Đỗ Xe" />
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
        setParkingLot={setNewParkingLot}
        onConfirm={handleConfirm}
        errors={errors}
      />

      <ConfirmDeleteDialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Snackbar cho thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ParkingLot;

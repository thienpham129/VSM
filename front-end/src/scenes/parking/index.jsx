import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormHelperText,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockParkingLot } from "admin/data/mockData";
import Header from "../../components/Header";

const ParkingLot = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false); // Trạng thái mở modal thêm
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // Trạng thái mở modal xác nhận xóa
  const [parkingLotToDelete, setParkingLotToDelete] = useState(null); // Bãi đỗ xe cần xóa
  const [newParkingLot, setNewParkingLot] = useState({
    name: "",
    location: "",
    capacity: 0,
    numCar: 0,
    empty: true,
  });
  const [errors, setErrors] = useState({}); // Trạng thái để lưu thông tin lỗi

  const handleDelete = (id) => {
    setParkingLotToDelete(id); // Thiết lập bãi đỗ xe cần xóa
    setConfirmDeleteOpen(true); // Mở modal xác nhận xóa
  };

  const confirmDelete = () => {
    // Xóa bãi đỗ xe dựa trên id
    const updatedParkingLot = mockParkingLot.filter(
      (lot) => lot.id !== parkingLotToDelete
    );
    console.log("Updated Parking Lot:", updatedParkingLot);
    setConfirmDeleteOpen(false); // Đóng modal xác nhận
    setParkingLotToDelete(null); // Reset bãi đỗ xe cần xóa
    // Cập nhật state hoặc logic cần thiết để lưu thông tin
  };

  const handleUpdate = (row) => {
    setNewParkingLot(row);
    setOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Parking Name", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    {
      field: "capacity",
      headerName: "Capacity",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "numCar",
      headerName: "Number of Cars",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "empty",
      headerName: "Empty",
      type: "boolean",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => <strong>{params.value ? "Yes" : "No"}</strong>,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdate(params.row)}
            sx={{ marginRight: 1 }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewParkingLot({
      name: "",
      location: "",
      capacity: 0,
      numCar: 0,
      empty: true,
    });
    setErrors({});
  };

  const handleConfirm = () => {
    const newErrors = {};
    if (!newParkingLot.name) {
      newErrors.name = "Name is required.";
    }
    if (!newParkingLot.location) {
      newErrors.location = "Location is required.";
    }
    if (newParkingLot.capacity <= 0) {
      newErrors.capacity = "Capacity must be a positive number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newId = mockParkingLot.length
      ? mockParkingLot[mockParkingLot.length - 1].id + 1
      : 1;
    const parkingLotToAdd = { ...newParkingLot, id: newId };
    console.log("Thêm bãi đỗ xe:", parkingLotToAdd);
    handleClose();
  };

  return (
    <Box m="20px">
      <Header title="PARKING LOT" subtitle="Manage Parking Lot" />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Add New Parking Lot
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockParkingLot}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Modal để thêm bãi đỗ xe mới */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            width: "50vw",
          },
        }}
      >
        <DialogTitle>Add New Parking Lot</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={newParkingLot.name}
            onChange={(e) =>
              setNewParkingLot({ ...newParkingLot, name: e.target.value })
            }
            error={!!errors.name}
          />
          {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}{" "}
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            variant="outlined"
            value={newParkingLot.location}
            onChange={(e) =>
              setNewParkingLot({ ...newParkingLot, location: e.target.value })
            }
            error={!!errors.location}
          />
          {errors.location && (
            <FormHelperText error>{errors.location}</FormHelperText>
          )}{" "}
          <TextField
            margin="dense"
            label="Capacity"
            type="number"
            fullWidth
            variant="outlined"
            value={newParkingLot.capacity}
            onChange={(e) =>
              setNewParkingLot({
                ...newParkingLot,
                capacity: Number(e.target.value),
              })
            }
            error={!!errors.capacity}
          />
          {errors.capacity && (
            <FormHelperText error>{errors.capacity}</FormHelperText>
          )}{" "}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "gray",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgray",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            sx={{
              backgroundColor: "green",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal xác nhận xóa */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this parking lot?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ParkingLot;

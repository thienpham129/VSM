import React, { useState } from "react";
import { Box, Button, Snackbar } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataType } from "../../admin/data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import AddTypeDialog from "./AddTypeDialog";
import UpdateTypeDialog from "./UpdateTypeDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const TypeCar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [newType, setNewType] = useState({ numSeat: "", price: "" });
  const [errors, setErrors] = useState({ numSeat: false, price: false });
  const [data, setData] = useState(mockDataType);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("success");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "numSeat",
      headerName: "Số Chỗ ngồi",
      type: "number",
      flex: 0.2,
    },
    {
      field: "price",
      headerName: "Giá",
      type: "number",
      flex: 0.3,
      valueFormatter: (params) => {
        return `${params.value.toLocaleString()} VND`;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleEdit(params.row)}
            variant="contained"
            color="success"
            sx={{ marginRight: 1 }}
          >
            Cập Nhập
          </Button>
          {/* <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row)}
          >
            Xóa
          </Button> */}
        </>
      ),
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewType({ numSeat: "", price: "" });
    setErrors({ numSeat: false, price: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewType({ ...newType, [name]: String(value) });

    if (value.trim() === "") {
      setErrors((prev) => ({ ...prev, [name]: true }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = () => {
    if (newType.numSeat.trim() === "" || newType.price.trim() === "") {
      setErrors({
        numSeat: newType.numSeat.trim() === "",
        price: newType.price.trim() === "",
      });
      return;
    }

    const newId = data.length + 1;
    const newEntry = {
      id: newId,
      numSeat: parseFloat(newType.numSeat),
      price: parseFloat(newType.price),
    };

    console.log("New Type Added:", newEntry);
    setData((prev) => [...prev, newEntry]);
    setSnackbarMessage("Tạo mới loại xe thành công!");
    setSnackbarColor("success");
    setSnackbarOpen(true);
    handleClose();
  };

  const handleEdit = (row) => {
    setNewType({ numSeat: String(row.numSeat), price: String(row.price) });
    setSelectedRow(row);
    setOpenUpdateDialog(true);
  };

  const handleUpdate = () => {
    if (newType.numSeat.trim() === "" || newType.price.trim() === "") {
      setErrors({
        numSeat: newType.numSeat.trim() === "",
        price: newType.price.trim() === "",
      });
      return;
    }

    const updatedData = data.map((item) =>
      item.id === selectedRow.id
        ? {
            ...item,
            numSeat: parseFloat(newType.numSeat),
            price: parseFloat(newType.price),
          }
        : item
    );

    console.log("Updated Type:", {
      id: selectedRow.id,
      numSeat: newType.numSeat,
      price: newType.price,
    });
    setData(updatedData);
    setOpenUpdateDialog(false);
    setSnackbarMessage("Cập nhập thông tin thành công!");
    setSnackbarColor("success");
    setSnackbarOpen(true);
  };

  // const handleDelete = (row) => {
  //   setSelectedRow(row);
  //   setConfirmDelete(true);
  // };

  const confirmDeleteAction = () => {
    console.log("Deleted Type:", selectedRow);
    setData(data.filter((item) => item.id !== selectedRow.id));
    setConfirmDelete(false);
    setSnackbarMessage("Deleted successfully!");
    setSnackbarColor("error");
    setSnackbarOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <Box m="20px">
      <Header title="Loại Xe" subtitle="Quản Lý Loại Xe" />
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
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <AddTypeDialog
        open={open}
        handleClose={handleClose}
        newType={newType}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />
      <UpdateTypeDialog
        open={openUpdateDialog}
        handleClose={() => setOpenUpdateDialog(false)}
        newType={newType}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        errors={errors}
      />
      <DeleteConfirmDialog
        open={confirmDelete}
        handleClose={handleCloseConfirmDelete}
        confirmDeleteAction={confirmDeleteAction}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarColor}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ContentProps={{
          style: {
            backgroundColor: "green",
            color: "white",
          },
        }}
      />
    </Box>
  );
};

export default TypeCar;

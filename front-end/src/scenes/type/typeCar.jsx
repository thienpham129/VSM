import React, { useEffect, useState } from "react";
import { Box, Button, Snackbar } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import AddTypeDialog from "./AddTypeDialog";
import UpdateTypeDialog from "./UpdateTypeDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { request } from "../../admin/helpers/axios_helper"; // Import hàm request

const TypeCar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [newType, setNewType] = useState({ numSeat: "", price: "" });
  const [errors, setErrors] = useState({ numSeat: false, price: false });
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("success");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fetchData = async () => {
    try {
      const response = await request("GET", "/admin/types");
      const formattedData = response.data.map((item) => ({
        id: item.typeId,
        numSeat: item.numSeat,
        price: item.price,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSnackbarMessage("Có lỗi xảy ra khi tải dữ liệu.");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setNewType({ numSeat: "", price: "" });
    setErrors({ numSeat: false, price: false });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewType((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !value }));
  };

  const handleSubmit = async () => {
    if (!newType.numSeat || !newType.price) {
      setErrors({
        numSeat: !newType.numSeat,
        price: !newType.price,
      });
      return;
    }

    try {
      await request("POST", "/admin/type", newType);
      setSnackbarMessage("Thêm mới loại xe thành công.");
      setSnackbarColor("success");
      setSnackbarOpen(true);
      setOpen(false);
      await fetchData();
    } catch (error) {
      console.error("Error adding type:", error);
      setSnackbarMessage("Có lỗi xảy ra khi thêm loại xe.");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };

  const handleUpdate = async () => {
    if (!newType.numSeat || !newType.price) {
      setErrors({
        numSeat: !newType.numSeat,
        price: !newType.price,
      });
      return;
    }

    try {
      await request("PUT", `/admin/type/${selectedRow.id}`, newType);
      setSnackbarMessage("Cập nhật loại xe thành công.");
      setSnackbarColor("success");
      setSnackbarOpen(true);
      setOpenUpdateDialog(false);
      await fetchData();
    } catch (error) {
      console.error("Error updating type:", error);
      setSnackbarMessage("Có lỗi xảy ra khi cập nhật loại xe.");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };

  const confirmDeleteAction = async () => {
    try {
      await request("DELETE", `/admin/types/${selectedRow.id}`);
      setSnackbarMessage("Xóa loại xe thành công.");
      setSnackbarColor("success");
      setSnackbarOpen(true);
      setConfirmDelete(false);
      await fetchData();
    } catch (error) {
      console.error("Error deleting type:", error);
      setSnackbarMessage("Có lỗi xảy ra khi xóa loại xe.");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (row) => {
    setNewType({ numSeat: row.numSeat, price: row.price });
    setSelectedRow(row);
    setOpenUpdateDialog(true);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "numSeat", headerName: "Số Chỗ Ngồi", flex: 1 },
    {
      field: "price",
      headerName: "Giá Tiền",
      flex: 1,
      renderCell: (params) => {
        // Format giá tiền theo tiền Việt Nam
        const formattedPrice = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0, // Không hiển thị số thập phân
        }).format(params.value);
        return formattedPrice;
      },
    },
    {
      field: "action",
      headerName: "Thao Tác",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleEdit(params.row)} // Mở dialog cập nhật khi nhấn nút
        >
          Cập Nhập
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Quản Lý Loại Xe" subtitle="Danh Sách Thông Tin Loại Xe" />
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
        handleClose={() => setConfirmDelete(false)}
        onConfirm={confirmDeleteAction}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <Button color="inherit" onClick={() => setSnackbarOpen(false)}>
            Đóng
          </Button>
        }
        severity={snackbarColor}
      />
    </Box>
  );
};

export default TypeCar;

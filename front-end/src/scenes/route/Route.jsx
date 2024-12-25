import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { request } from "admin/helpers/axios_helper";

const RouteAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [newRoute, setNewRoute] = useState({
    startLocation: "",
    stopLocation: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("success");

  // Fetch routes from API
  const fetchRoutes = async () => {
    try {
      const response = await request("get", "/public/routes");
      setRoutes(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu lịch trình:", error);
    }
  };

  // Open modal for updating route
  const handleOpenUpdateModal = (route) => {
    setSelectedRoute(route);
    setOpenUpdate(true);
  };

  // Close update modal
  const handleCloseUpdateModal = () => {
    setSelectedRoute(null);
    setOpenUpdate(false);
  };

  // Open modal for adding route
  const handleOpenAddModal = () => {
    setNewRoute({ startLocation: "", stopLocation: "" });
    setErrors({});
    setOpenAdd(true);
  };

  // Close add modal
  const handleCloseAddModal = () => {
    setNewRoute({ startLocation: "", stopLocation: "" });
    setErrors({});
    setOpenAdd(false);
  };

  // Validate fields
  const validateFields = (route) => {
    const vietnameseRegex =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểễệịỉọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s]+$/;
    const newErrors = {};

    if (!route.startLocation.trim())
      newErrors.startLocation = "Điểm bắt đầu không được để trống.";
    // else if (!vietnameseRegex.test(route.startLocation))
    //   newErrors.startLocation = "Điểm bắt đầu chỉ được chứa chữ tiếng Việt.";

    if (!route.stopLocation.trim())
      newErrors.stopLocation = "Điểm kết thúc không được để trống.";
    // else if (!vietnameseRegex.test(route.stopLocation))
    //   newErrors.stopLocation = "Điểm kết thúc chỉ được chứa chữ tiếng Việt.";

    return newErrors;
  };

  // Handle adding a new route
  const handleAddRoute = async () => {
    // Trim inputs
    const trimmedRoute = {
      startLocation: newRoute.startLocation.trim(),
      stopLocation: newRoute.stopLocation.trim(),
    };

    const validationErrors = validateFields(trimmedRoute);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await request("post", "/public/routes", trimmedRoute);
      fetchRoutes();
      setSnackbarMessage("Thêm mới tuyến đường thành công!");
      setSnackbarColor("success");
      setSnackbarOpen(true);
      handleCloseAddModal();
    } catch (error) {
      console.error("Lỗi khi thêm tuyến đường:", error);
      setSnackbarMessage(error.response?.data || "Đã xảy ra lỗi.");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };

  // Submit updates
  const handleUpdateRoute = async () => {
    // Trim inputs
    const trimmedRoute = {
      ...selectedRoute,
      startLocation: selectedRoute.startLocation.trim(),
      stopLocation: selectedRoute.stopLocation.trim(),
    };

    const validationErrors = validateFields(trimmedRoute);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await request("put", `/public/routes/${trimmedRoute.id}`, trimmedRoute);
      fetchRoutes();
      setSnackbarMessage("Cập nhật tuyến đường thành công!");
      setSnackbarColor("success");
      setSnackbarOpen(true);
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      setSnackbarMessage(error.response?.data || "Đã xảy ra lỗi.");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };

  // Handle deleting a route
  const handleDeleteRoute = async (id) => {
    try {
      await request("delete", `/public/routes/${id}`);
      fetchRoutes();
      setSnackbarMessage("Xóa tuyến đường thành công!");
      setSnackbarColor("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Lỗi khi xóa tuyến đường:", error);
      // setSnackbarMessage(error.response?.data || "Đã xảy ra lỗi.");
      setSnackbarMessage(
        "Không thể xóa tuyến đường đã được sử dụng ở lịch trình"
      );
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // Define columns
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "startLocation", headerName: "Điểm Bắt Đầu", flex: 1 },
    { field: "stopLocation", headerName: "Điểm Kết Thúc", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenUpdateModal(params.row)}
            sx={{ marginRight: 1 }}
          >
            Cập nhật
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteRoute(params.row.id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Tuyến Đường" subtitle="Quản Lý Danh Sách Tuyến Đường" />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenAddModal}
        >
          Thêm Mới Tuyến Đường
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
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
        }}
      >
        <DataGrid
          rows={routes}
          columns={columns}
          getRowId={(row) => row.id} // Ensure proper row key
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Update Route Modal */}
      <Dialog open={openUpdate} onClose={handleCloseUpdateModal}>
        <DialogTitle>Cập nhật tuyến đường</DialogTitle>
        <DialogContent>
          <TextField
            label="Điểm Bắt Đầu"
            fullWidth
            margin="normal"
            value={selectedRoute?.startLocation || ""}
            onChange={(e) =>
              setSelectedRoute((prev) => ({
                ...prev,
                startLocation: e.target.value,
              }))
            }
          />
          <TextField
            label="Điểm Kết Thúc"
            fullWidth
            margin="normal"
            value={selectedRoute?.stopLocation || ""}
            onChange={(e) =>
              setSelectedRoute((prev) => ({
                ...prev,
                stopLocation: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseUpdateModal}
            color="secondary"
            sx={{
              backgroundColor: "gray",
              color: "white",
              "&:hover": { backgroundColor: "darkgray" },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleUpdateRoute}
            color="primary"
            sx={{
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Route Modal */}
      <Dialog open={openAdd} onClose={handleCloseAddModal}>
        <DialogTitle>Thêm mới tuyến đường</DialogTitle>
        <DialogContent>
          <TextField
            label="Điểm Bắt Đầu"
            fullWidth
            margin="normal"
            value={newRoute.startLocation}
            onChange={(e) =>
              setNewRoute((prev) => ({
                ...prev,
                startLocation: e.target.value,
              }))
            }
            error={!!errors.startLocation}
            helperText={errors.startLocation}
          />
          <TextField
            label="Điểm Kết Thúc"
            fullWidth
            margin="normal"
            value={newRoute.stopLocation}
            onChange={(e) =>
              setNewRoute((prev) => ({
                ...prev,
                stopLocation: e.target.value,
              }))
            }
            error={!!errors.stopLocation}
            helperText={errors.stopLocation}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAddModal}
            color="secondary"
            sx={{
              backgroundColor: "gray",
              color: "white",
              "&:hover": { backgroundColor: "darkgray" },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleAddRoute}
            color="primary"
            sx={{
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
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
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: snackbarColor === "success" ? "green" : "red",
            color: "white",
          },
        }}
      />
    </Box>
  );
};

export default RouteAdmin;

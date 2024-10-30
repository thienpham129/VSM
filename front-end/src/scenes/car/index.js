import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CarTable from "./carTable";
import CarDialog from "./carDialog";
import { useNavigate } from "react-router-dom";

const CarAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [carDetails, setCarDetails] = useState({
    name: "",
    plateNumber: "",
    price: "",
    color: "",
    manufactory: "",
    yearOfManufacture: "",
  });
  const [images, setImages] = useState({ image1: null, image2: null });
  const [mockCars, setMockCars] = useState([]); // State để lưu danh sách xe

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:8080/public/cars");
        const data = await response.json();

        // Chuyển đổi carId thành id
        const formattedData = data.map((car) => ({
          id: car.carId,
          name: car.name,
          plateNumber: car.plateNumber,
          color: car.color,
          manufactory: car.manufactory,
          yearOfManufacture: car.yearOfManufacture,
          dayMaintenance: car.dayMaintenance,
          price: car.type.price,
          // Thêm các trường khác nếu cần
        }));

        setMockCars(formattedData); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars(); // Gọi hàm fetch khi component được mount
  }, []);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setCarDetails({
      name: "",
      plateNumber: "",
      price: "",
      color: "",
      manufactory: "",
      yearOfManufacture: "",
    });
    setImages({ image1: null, image2: null });
    setErrors({});
  };

  const validateField = (fieldName, value) => {
    let error = "";
    if (!value) error = `${fieldName} không được để trống`;
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setImages({ ...images, [name]: file });
    validateField(name, file);
  };

  const validateCarDetails = () => {
    const errors = {};
    for (const field in carDetails) {
      if (!carDetails[field]) errors[field] = `${field} không được để trống`;
    }
    if (!images.image1) errors.image1 = "Image Car 1 không được để trống";
    if (!images.image2) errors.image2 = "Image Car 2 không được để trống";
    return errors;
  };

  const handleCreate = () => {
    const validationErrors = validateCarDetails();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Car Details:", carDetails);
    console.log("Images:", images);
    handleClose();
  };

  const columns = [
    { field: "id", headerName: "Car ID", flex: 0.3 },
    { field: "name", headerName: "Tên Xe", flex: 0.5 },
    { field: "plateNumber", headerName: "Biển Số Xe", flex: 0.5 },
    {
      field: "dayMaintenance",
      headerName: "Ngày Bảo Hành",
      flex: 0.5,
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "price",
      headerName: "Giá Xe",
      type: "number",
      headerAlign: "left",
      align: "left",
      valueFormatter: (params) =>
        params.value !== undefined
          ? `${params.value.toLocaleString()} VND`
          : "0 VND",
    },
    {
      field: "yearOfManufacture",
      headerName: "Năm Sản Xuất",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "details",
      headerName: "Chi tiết",
      flex: 0.3,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/admin/car/${params.row.id}`)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Danh Sách Xe" subtitle="Quản Lý Danh Sách Xe" />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Thêm Mới Xe
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
        <CarTable rows={mockCars} columns={columns} />
      </Box>

      <CarDialog
        open={open}
        handleClose={handleClose}
        carDetails={carDetails}
        setCarDetails={setCarDetails}
        errors={errors}
        validateField={validateField}
        handleImageChange={handleImageChange}
        handleCreate={handleCreate}
      />
    </Box>
  );
};

export default CarAdmin;

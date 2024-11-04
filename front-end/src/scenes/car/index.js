import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CarTable from "./carTable";
import CarDialog from "./carDialog";
import { mockCars } from "../../admin/data/mockData";

const CarAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "plateNumber", headerName: "Plate Number", flex: 0.5 },
    {
      field: "dayMaintenance",
      headerName: "Day of Maintenance",
      flex: 0.5,
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
      valueFormatter: (params) =>
        params.value !== undefined ? `$${params.value.toLocaleString()}` : "$0",
    },
    {
      field: "yearOfManufacture",
      headerName: "Year of Manufacture",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Manage Car"
        subtitle="List of Contacts for Future Reference"
      />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Add New Car
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

import { Box, Button } from "@mui/material";
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

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await request("get", "/public/cars");
      const formattedData = response.data.map((car) => ({
        id: car.carId,
        name: car.name,
        plateNumber: car.plateNumber,
        color: car.color,
        manufactory: car.manufactory,
        yearOfManufacture: car.yearOfManufacture,
        dayMaintenance: car.dayMaintenance,
        price: car.type.price,
      }));
      setMockCars(formattedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu xe:", error);
    }
  };

  const handleAddCar = () => {
    navigate("/admin/car/create"); // Chuyển hướng đến trang thêm mới xe
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
          ? `${params.value.toLocaleString()} VNĐ`
          : "0 VNĐ",
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
          color="success"
          onClick={() => navigate(`/admin/car/${params.row.id}`)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Danh Sách Xe" subtitle="Quản Lý Danh Sách Thông Tin Xe" />
      <Box display="flex" justifyContent="flex-end" mb={-5}>
        <Button variant="contained" color="secondary" onClick={handleAddCar}>
          Thêm Mới Xe
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={styles} // Sử dụng styles từ component mới
      >
        <CarTable rows={mockCars} columns={columns} />
      </Box>
    </Box>
  );
};

export default CarAdmin;

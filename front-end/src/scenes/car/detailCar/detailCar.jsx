// DetailCar.jsx
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import DetailCarHeader from "./detailCarHeader";
import DetailCarForm from "./detailCarForm";

const DetailCar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/public/car/${id}`
      );
      setCarDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching car details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const handleFormSubmit = async (values) => {
    try {
      // Gửi yêu cầu PUT đến máy chủ để cập nhật thông tin xe
      const response = await axios.put(
        `http://localhost:8080/public/car/${id}`,
        values
      );

      // Xử lý phản hồi từ máy chủ
      console.log("Cập nhật thành công:", response.data);

      // Điều hướng về trang danh sách hoặc thông báo thành công
      navigate("/cars"); // Thay đổi đường dẫn nếu cần
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin xe:", error);
    }
  };

  const initialValues = {
    carId: carDetails.carId || "",
    name: carDetails.name || "",
    plateNumber: carDetails.plateNumber || "",
    color: carDetails.color || "",
    manufactory: carDetails.manufactory || "",
    yearOfManufacture: carDetails.yearOfManufacture || "",
    dayMaintenance: carDetails.dayMaintenance || "",
    numSeat: carDetails.type?.numSeat || "",
    price: carDetails.type?.price || "",
    parking: carDetails.parking || "",
    images: carDetails.images || [],
  };

  if (loading) return <Typography>Đang tải dữ liệu...</Typography>;

  return (
    <Box m="20px">
      <DetailCarHeader />
      <DetailCarForm
        initialValues={initialValues}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default DetailCar;

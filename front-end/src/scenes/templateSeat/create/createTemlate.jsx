import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { request } from "admin/helpers/axios_helper";

const AddTemplateSeat = () => {
  const [seats, setSeats] = useState([]);
  const [cars, setCars] = useState([]);
  const fetchCars = async () => {
    try {
      const response = await request("get", "/public/cars");
      const formattedData = response.data.map((car) => ({
        id: car.carId,
        name: car.name,
        plateNumber: car.plateNumber,
        price: car.type.price,
      }));
      setCars(formattedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu xe:", error);
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);

  // Tạo dữ liệu bảng
  const rows = Array.from({ length: 10 }, (_, rowIndex) => rowIndex + 1);
  const columns = ["A", "B", "C", "D", "E"];

  // Xử lý sự kiện click vào ô
  const handleSeatClick = (seat) => {
    if (seats.includes(seat)) {
      // Nếu đã tồn tại, xóa khỏi danh sách và đổi màu về xám
      setSeats(seats.filter((s) => s !== seat));
    } else {
      // Nếu chưa tồn tại, thêm vào danh sách và đổi màu thành trắng
      setSeats([...seats, seat]);
    }
  };

  return (
    <Box m="20px">
      <h2>Thêm Mới Mẫu Chỗ Ngồi</h2>
      {/* Bảng chỗ ngồi */}
      <TableContainer
        component={Paper}
        style={{ width: "70%", marginTop: "20px" }}
      >
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row}>
                {columns.map((col) => {
                  const seat = `${col}${row}`;
                  const isSelected = seats.includes(seat);
                  return (
                    <TableCell
                      key={seat}
                      align="center"
                      onClick={() => handleSeatClick(seat)}
                      style={{
                        backgroundColor: isSelected ? "white" : "gray",
                        cursor: "pointer",
                      }}
                    >
                      {seat}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Hiển thị danh sách ghế đã chọn */}
      <Box mt="20px">
        <h3>Danh sách chỗ đã chọn:</h3>
        <Box>{seats.join(", ") || "Không có chỗ nào được chọn."}</Box>
      </Box>
    </Box>
  );
};

export default AddTemplateSeat;

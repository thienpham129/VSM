import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import Header from "components/Header";
import { Link } from "react-router-dom";
import { request } from "admin/helpers/axios_helper";

const AddTemplateSeat = () => {
  const [seats, setSeats] = useState([]);
  const [seatValues, setSeatValues] = useState({});
  const [busName, setBusName] = useState("");
  const [busNameError, setBusNameError] = useState(false);
  const [seatCount, setSeatCount] = useState("");
  const [seatCountError, setSeatCountError] = useState(false);
  const [seatSelectionError, setSeatSelectionError] = useState(false); // Error state for seat selection
  const [idType, setIdType] = useState(null);
  const rows = Array.from({ length: 10 }, (_, rowIndex) => rowIndex + 1);
  const columns = ["A", "B", "C", "D", "E"];

  const handleSeatClick = (seat) => {
    const isSelected = seats.some((s) => s.seat === seat);
    if (isSelected) {
      setSeats(seats.filter((s) => s.seat !== seat));
    } else {
      const newSeat = { seat, price: seatValues[seat] || 0 };
      setSeats([...seats, newSeat]);
    }
  };

  const handleInputChange = (seat, value) => {
    setSeatValues((prev) => ({
      ...prev,
      [seat]: value,
    }));

    setSeats((prevSeats) =>
      prevSeats.map((s) => (s.seat === seat ? { ...s, price: value } : s))
    );
  };

  const validateInputs = () => {
    let isValid = true;
    setSeatSelectionError(false); // Reset the seat selection error

    if (!busName.trim()) {
      setBusNameError(true);
      isValid = false;
    } else {
      setBusNameError(false);
    }

    if (!seatCount.trim() || isNaN(seatCount)) {
      setSeatCountError(true);
      isValid = false;
    } else {
      setSeatCountError(false);
    }

    // Validate seat selection against seat count
    if (seats.length !== parseInt(seatCount) - 1) {
      setSeatSelectionError(true); // Show error if seats selected don't match the count
      isValid = false;
    }

    return isValid;
  };

  const handleSave = async () => {
    if (validateInputs()) {
      // Sắp xếp seats theo vị trí
      const sortedSeats = [...seats].sort((a, b) => {
        const [colA, rowA] = [a.seat[0], parseInt(a.seat.slice(1))];
        const [colB, rowB] = [b.seat[0], parseInt(b.seat.slice(1))];
        if (colA === colB) {
          return rowA - rowB;
        }
        return colA.localeCompare(colB);
      });

      // Sau khi sắp xếp, in ra các thông tin
      console.log("Danh sách ghế đã chọn (đã sắp xếp):", sortedSeats);
      console.log("Giá trị từng ghế:", seatValues);
      const newType = { name: busName, numSeat: seatCount };

      try {
        // Gọi API tạo thể loại xe
        const response = await request("post", "/admin/type", newType);
        setIdType(response.data.id);

        // Tạo dữ liệu cho seatDetails
        let seatDetails = sortedSeats.map((seat) => ({
          position: seat.seat,
          surcharge: seatValues[seat.seat] || 0, // Dùng giá trị surcharge từ seatValues
        }));

        // Đảm bảo có một đối tượng với "A1" và surcharge = 0
        if (!seatDetails.some((seat) => seat.position === "A1")) {
          seatDetails.unshift({
            position: "A1",
            surcharge: 0,
          });
        }
        // Gọi API cập nhật thông tin chỗ ngồi
        try {
          const detailResponse = await request(
            "post",
            `/admin/detailSeat?idType=${response.data.id}`,
            seatDetails
          );
          console.log(
            "Cập nhật thông tin chỗ ngồi thành công:",
            detailResponse
          );
        } catch (detailError) {
          console.error("Lỗi khi cập nhật thông tin chỗ ngồi:", detailError);
        }
      } catch (error) {
        console.error("Lỗi khi tạo thể loại xe:", error);
      }
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Thêm Mới Mẫu Vị Trí Chỗ Ngồi"
        subtitle={
          <span>
            <Link
              to="/admin/template-seat"
              style={{ textDecoration: "none", color: "white" }}
            >
              Quản lý mẫu vị trí chỗ ngồi xe
            </Link>
            <span style={{ textDecoration: "none", color: "inherit" }}>
              {" > Thêm mới"}
            </span>
          </span>
        }
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          width="70%"
          bgcolor="white"
          p="20px"
          borderRadius="10px"
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)" // Đổ bóng nhẹ
        >
          <h2 style={{ color: "#141b2d" }}>Thêm Mới Mẫu Chỗ Ngồi</h2>
          <Box mb="20px">
            {/* Tên xe */}
            <TextField
              label="Tên xe"
              variant="outlined"
              fullWidth
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
              error={busNameError}
              helperText={busNameError ? "Tên xe không được để trống" : ""}
              style={{ marginBottom: "20px" }}
              InputProps={{
                style: {
                  backgroundColor: "#141b2d", // Màu nền của input
                  color: "white", // Màu chữ của input
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white", // Màu chữ của label
                },
              }}
            />
            {/* Số chỗ */}
            <TextField
              label="Số chỗ"
              variant="outlined"
              fullWidth
              value={seatCount}
              onChange={(e) => setSeatCount(e.target.value)}
              error={seatCountError}
              helperText={
                seatCountError ? "Số chỗ phải là số và không được để trống" : ""
              }
              InputProps={{
                style: {
                  backgroundColor: "#141b2d", // Màu nền của input
                  color: "white", // Màu chữ của input
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white", // Màu chữ của label
                },
              }}
            />
          </Box>
          <TableContainer
            component={Paper}
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "20px auto",
            }}
          >
            <Table>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row}>
                    {columns.map((col) => {
                      const seat = `${col}${row}`;
                      const isSelected = seats.some((s) => s.seat === seat);
                      const seatObj = seats.find((s) => s.seat === seat);
                      const seatDefaultValue = seatObj
                        ? seatObj.price
                        : seatValues[seat] || 0;

                      // Điều kiện cho ghế A1
                      const isDisabled = seat === "A1";

                      return (
                        <TableCell
                          key={seat}
                          align="center"
                          onClick={() => !isDisabled && handleSeatClick(seat)} // Không thể chọn ghế A1
                          style={{
                            backgroundColor: isSelected
                              ? "#4caf50"
                              : isDisabled
                              ? "#b0b0b0" // Màu xám cho ghế A1
                              : "#e0e0e0",
                            color:
                              isSelected || isDisabled ? "#ffffff" : "#000000",
                            cursor: isDisabled ? "not-allowed" : "pointer", // Đổi con trỏ khi disabled
                            border: "1px solid #d0d0d0",
                            textAlign: "center", // Căn giữa nội dung
                          }}
                        >
                          {/* Nếu là ghế A1 thì hiển thị 'Tài xế', còn lại là vị trí ghế */}
                          {isDisabled ? "Tài xế" : seat}
                          {!isDisabled && (
                            <TextField
                              size="small"
                              type="number"
                              variant="outlined"
                              value={seatDefaultValue} // Thiết lập giá trị mặc định
                              onChange={(e) =>
                                handleInputChange(seat, e.target.value)
                              } // Cập nhật giá trị khi thay đổi
                              style={{
                                marginTop: "5px",
                                backgroundColor: "white",
                              }}
                              InputProps={{
                                style: { color: "black" },
                              }}
                              onClick={(e) => e.stopPropagation()} // Ngăn click vào input ảnh hưởng trạng thái ghế
                            />
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Hiển thị thông báo lỗi nếu số ghế đã chọn không khớp với số chỗ */}
          {seatSelectionError && (
            <Box color="red" textAlign="center" mb="10px">
              Bạn cần chọn đúng số ghế với số chỗ đã nhập.
            </Box>
          )}
          <Box
            mt="30px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" color="primary" onClick={handleSave}>
              Lưu Mẫu
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddTemplateSeat;

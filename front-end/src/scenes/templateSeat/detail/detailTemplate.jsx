import React, { useEffect, useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import { request } from "admin/helpers/axios_helper";

const DetailTemplateSeat = () => {
  const [seats, setSeats] = useState([]);
  const [seatValues, setSeatValues] = useState({});
  const [busName, setBusName] = useState("");
  const [busNameError, setBusNameError] = useState(false);
  const [seatCount, setSeatCount] = useState("");
  const [seatCountError, setSeatCountError] = useState(false);
  const [seatSelectionError, setSeatSelectionError] = useState(false);
  const [idType, setIdType] = useState(null);
  const rows = Array.from({ length: 10 }, (_, rowIndex) => rowIndex + 1);
  const columns = ["A", "B", "C", "D", "E"];
  const { id } = useParams();

  // Fetch seat details based on type ID
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await request("GET", `/admin/type/${id}`);
        const data = response.data;
        console.log(data);

        // Set bus name and seat count
        setBusName(data.typeName);
        setSeatCount(data.numSeats);

        // Set seat selection and surcharge values
        setSeats(
          data.seatList.map((seat) => ({
            seat: seat.position,
            price: seat.surcharge,
          }))
        );

        // Set seatValues to match surcharge values for each seat
        const seatValuesObj = data.seatList.reduce((acc, seat) => {
          acc[seat.position] = seat.surcharge;
          return acc;
        }, {});
        setSeatValues(seatValuesObj);
      } catch (error) {
        console.error("Error fetching seat details:", error);
      }
    };

    if (id) {
      fetchSeats();
    }
  }, [id]);

  // Handle seat selection
  const handleSeatClick = (seat) => {
    const isSelected = seats.some((s) => s.seat === seat);
    if (isSelected) {
      setSeats(seats.filter((s) => s.seat !== seat));
    } else {
      const newSeat = { seat, price: seatValues[seat] || 0 };
      setSeats([...seats, newSeat]);
    }
  };

  // Handle price input change for seats
  const handleInputChange = (seat, value) => {
    setSeatValues((prev) => ({
      ...prev,
      [seat]: value,
    }));

    setSeats((prevSeats) =>
      prevSeats.map((s) => (s.seat === seat ? { ...s, price: value } : s))
    );
  };

  // Validate inputs before saving
  const validateInputs = () => {
    let isValid = true;
    setSeatSelectionError(false);

    // Kiểm tra nếu busName là chuỗi rỗng
    if (!busName.trim()) {
      setBusNameError(true);
      isValid = false;
    } else {
      setBusNameError(false);
    }

    // Chuyển seatCount thành chuỗi trước khi gọi .trim()
    const seatCountStr = String(seatCount).trim();

    // Kiểm tra seatCount có phải là số hợp lệ không
    if (!seatCountStr || isNaN(seatCountStr)) {
      setSeatCountError(true);
      isValid = false;
    } else {
      setSeatCountError(false);
    }

    // Kiểm tra số ghế đã chọn có khớp với số ghế nhập vào
    if (seats.length !== parseInt(seatCountStr)) {
      setSeatSelectionError(true);
      isValid = false;
    }

    return isValid;
  };

  // Handle save and send data to the server
  const handleSave = async () => {
    if (validateInputs()) {
      const sortedSeats = [...seats].sort((a, b) => {
        const [colA, rowA] = [a.seat[0], parseInt(a.seat.slice(1))];
        const [colB, rowB] = [b.seat[0], parseInt(b.seat.slice(1))];
        return colA === colB ? rowA - rowB : colA.localeCompare(colB);
      });

      console.log("Sorted Seats:", sortedSeats);
      console.log("Seat Values:", seatValues);
      const newType = { name: busName, numSeat: seatCount };

      try {
        const response = await request("PUT", `/admin/type/${id}`, newType);
        // setIdType(response.data.id);

        let seatDetails = sortedSeats.map((seat) => ({
          position: seat.seat,
          surcharge: seatValues[seat.seat] || 0,
        }));

        // Ensure that "A1" is included with surcharge = 0
        if (!seatDetails.some((seat) => seat.position === "A1")) {
          seatDetails.unshift({ position: "A1", surcharge: 0 });
        }

        const detailResponse = await request(
          "PUT",
          `/admin/detailSeat?idType=${id}`,
          seatDetails
        );
        console.log("Seat details updated successfully:", detailResponse);
      } catch (error) {
        console.error("Error while saving seat data:", error);
      }
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Add New Seat Template"
        subtitle={
          <span>
            <Link
              to="/admin/template-seat"
              style={{ textDecoration: "none", color: "white" }}
            >
              Manage Seat Templates
            </Link>
            <span style={{ textDecoration: "none", color: "inherit" }}>
              {" > Add New"}
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
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
        >
          <h2 style={{ color: "#141b2d" }}>Add New Seat Template</h2>
          <Box mb="20px">
            <TextField
              label="Bus Name"
              variant="outlined"
              fullWidth
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
              error={busNameError}
              helperText={busNameError ? "Bus name cannot be empty" : ""}
              style={{ marginBottom: "20px" }}
              InputProps={{
                style: {
                  backgroundColor: "#141b2d",
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              label="Number of Seats"
              variant="outlined"
              fullWidth
              value={seatCount}
              onChange={(e) => setSeatCount(e.target.value)}
              error={seatCountError}
              helperText={
                seatCountError
                  ? "Seat count must be a number and cannot be empty"
                  : ""
              }
              InputProps={{
                style: {
                  backgroundColor: "#141b2d",
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
          </Box>

          <TableContainer
            component={Paper}
            style={{ width: "100%", maxWidth: "600px", margin: "20px auto" }}
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

                      const isDisabled = seat === "A1"; // A1 is disabled

                      return (
                        <TableCell
                          key={seat}
                          align="center"
                          onClick={() => !isDisabled && handleSeatClick(seat)}
                          style={{
                            backgroundColor: isSelected
                              ? "#4caf50"
                              : isDisabled
                              ? "#b0b0b0"
                              : "#e0e0e0",
                            color:
                              isSelected || isDisabled ? "#ffffff" : "#000000",
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            border: "1px solid #d0d0d0",
                            textAlign: "center",
                          }}
                        >
                          {isDisabled ? "Driver" : seat}
                          {!isDisabled && (
                            <TextField
                              size="small"
                              type="number"
                              variant="outlined"
                              value={seatDefaultValue}
                              onChange={(e) =>
                                handleInputChange(seat, e.target.value)
                              }
                              style={{
                                marginTop: "5px",
                                backgroundColor: "white",
                              }}
                              InputProps={{ style: { color: "black" } }}
                              onClick={(e) => e.stopPropagation()}
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

          {seatSelectionError && (
            <Box color="red" textAlign="center" mb="10px">
              You need to select the correct number of seats as per the input.
            </Box>
          )}

          <Box
            mt="30px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Template
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailTemplateSeat;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "pages/bookingTicket.module.css";
import BookingForm from "components/BookingForm";
import { root } from "helper/axiosClient";

const SeatMap = ({
  car,
  priceOfSeat,
  carRouteId,
  scheduleId,
  startTime,
  startLocation,
  stopLocation,
  selectedRoute,
  selectedCar,
  routeDetail,
  carDetail,
}) => {
  const [seats, setSeats] = useState(car.type.seatList);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [successSeats, setSuccessSeats] = useState([]);
  const [waitingSeats, setWaitingSeats] = useState([]);
  // const [successSeats, setSuccessSeats] = useState([]);

  useEffect(() => {
    setSeats(car.type.seatList);
  }, [car]);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await root.get(
          `/public/ticket-with-schedule/${scheduleId}`
        );

        if (response.status === 200) {
          const tickets = response.data;
          setTickets(tickets);

          // Lọc ghế có status là "Đã thanh toán"
          const successSeats = tickets.filter(
            (ticket) => ticket.status === "Đã thanh toán"
          );
          setSuccessSeats(successSeats);

          // Lọc ghế có status là "Đang chờ xử lý"
          const waitingSeats = tickets.filter(
            (ticket) => ticket.status === "Đang chờ xử lý"
          );
          setWaitingSeats(waitingSeats);
        } else {
          console.error(
            "Không thể lấy dữ liệu vé. Mã trạng thái:",
            response.status
          );
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API: ", error);
      }
    };

    fetchTickets();
  }, [scheduleId]);

  // Hàm kiểm tra ghế bị hủy
  const checkSuccessTicket = (seatPosition) => {
    return successSeats.some((ticket) =>
      ticket.selectedSeat.includes(seatPosition)
    );
  };

  // Hàm xử lý chọn ghế
  const handleSeatClick = (seatPosition) => {
    if (seatPosition === "A1") {
      return;
    }

    // Tìm ghế dựa trên seatPosition
    const selectedSeat = seats.find((seat) => seat.position === seatPosition);

    // Kiểm tra nếu ghế này đã bị hủy hoặc đang chờ xử lý thì không thể chọn
    const isSuccess = checkSuccessTicket(seatPosition);
    const isWaiting = waitingSeats.some((ticket) =>
      ticket.selectedSeat.includes(seatPosition)
    );
    if (isSuccess || isWaiting) {
      return; // Không làm gì nếu ghế đã bị hủy hoặc đang chờ xử lý
    }

    // Cập nhật danh sách ghế đã chọn
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.position === seatPosition
          ? { ...seat, selected: !seat.selected }
          : seat
      )
    );

    // Cập nhật selectedSeats, thêm hoặc bỏ ghế đã chọn
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatPosition)) {
        return prevSelected.filter((seat) => seat !== seatPosition); // Bỏ ghế đã chọn
      } else {
        return [...prevSelected, seatPosition]; // Thêm ghế vào danh sách đã chọn
      }
    });
  };

  const formatCurrency = (value) => {
    return (
      new Intl.NumberFormat("vi-VN", {
        style: "decimal",
        minimumFractionDigits: 0,
      }).format(value) + " VND"
    );
  };

  // Tính tổng tiền khi có các phụ phí
  const priceTotalAllSeat = selectedSeats.reduce((total, seatPosition) => {
    const seat = seats.find((seat) => seat.position === seatPosition);
    const surcharge = seat ? seat.surcharge : 0;
    return total + priceOfSeat + surcharge;
  }, 0);
  const totalPriceTicket = priceTotalAllSeat;

  return (
    <div>
      <div
        className={`${styles.bookingPage__tickets__item} ${styles.allowBook}`}
        data-wrap-trip="PLT0Tc1ybgN295oCg20241015"
        id="tripPLT0Tc1ybgN295oCg20241015"
      >
        <div
          className={styles.bookingPage__tickets__item__collapse}
          style={{ transition: "all 0.5s ease" }}
        >
          <div
            className={styles.bookingPage__tickets__item__collapse__booking}
            collapse
            data-parent="#tripPLT0Tc1ybgN295oCg20241015"
            id="collapse--booking-ticketPLT0Tc1ybgN295oCg20241015"
          >
            <div
              className={
                styles.bookingPage__tickets__item__collapse__booking__seat_map
              }
            >
              <h4 style={{ textAlign: "center" }}>
                Xe {car.type.numSeats} chỗ
              </h4>

              <div
                className={
                  styles.bookingPage__tickets__item__collapse__booking__seat_map__floor
                }
              >
                <table>
                  <tbody>
                    {[...Array(5)].map((_, rowIndex) => {
                      return (
                        <tr key={rowIndex}>
                          {["A", "B", "C", "D", "E"].map((col, colIndex) => {
                            const position = `${col}${rowIndex + 1}`;
                            const seat = seats.find(
                              (seat) => seat.position === position
                            );

                            // Kiểm tra nếu ghế bị hủy, đang chờ xử lý hoặc không thể chọn
                            const isSuccess = checkSuccessTicket(position);
                            const isWaiting = waitingSeats.some((ticket) =>
                              ticket.selectedSeat.includes(position)
                            );

                            let seatClass = "icon-seat-empty";
                            let cursorStyle = "pointer"; // Mặc định là pointer

                            if (position === "A1") {
                              seatClass = "icon-seat-not-sell";
                              cursorStyle = "not-allowed"; // Ghế A1 không thể chọn
                            } else if (isSuccess) {
                              seatClass = "icon-seat-sold"; // Ghế đã hủy
                              cursorStyle = "not-allowed"; // Không thể chọn ghế đã hủy
                            } else if (isWaiting) {
                              seatClass = "icon-seat-booked"; // Ghế đang chờ xử lý
                              cursorStyle = "not-allowed"; // Không thể chọn ghế đang chờ xử lý
                            } else if (selectedSeats.includes(position)) {
                              seatClass = "icon-seat-selected"; // Ghế đang chọn
                            }

                            // Nếu không có ghế trong seatList thì hiển thị hidden
                            if (!seat) {
                              return (
                                <td
                                  key={colIndex}
                                  style={{ visibility: "hidden" }}
                                />
                              );
                            }

                            return (
                              <>
                                <td key={colIndex}>
                                  {/* <div style={{ position: "relative", textAlign: "center", width: "80px" }}> */}
                                  <div
                                    style={{
                                      textAlign: "center",
                                      position: "relative",
                                    }}
                                  >
                                    <input
                                      type="button"
                                      value={
                                        position === "A1"
                                          ? "Tài Xế"
                                          : seat.position
                                      }
                                      readOnly
                                      className={`avicon ${seatClass}`}
                                      onClick={
                                        position === "A1" ||
                                        isSuccess ||
                                        isWaiting
                                          ? undefined
                                          : () => handleSeatClick(position)
                                      }
                                      style={{
                                        display: "inline-block",
                                        width: "80px",
                                        textAlign: "center",
                                        cursor: cursorStyle, // Cập nhật style con trỏ
                                      }}
                                    />
                                    {seat && seat.surcharge !== 0 && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          bottom: "-28px",
                                          left: "50%",
                                          transform: "translateX(-50%)",
                                          fontSize: "12px",
                                          color:
                                            seat.surcharge > 0
                                              ? "red"
                                              : "green",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {seat.surcharge > 0
                                          ? `Phụ thu giá sẽ cộng thêm ${formatCurrency(
                                              seat.surcharge
                                            )}`
                                          : `Phụ thu giá sẽ giảm ${formatCurrency(
                                              Math.abs(seat.surcharge)
                                            )}`}
                                      </div>
                                    )}
                                    {/* {seat && seat.surcharge !== 0 && (
                                      <div
                                        style={{
                                          fontSize: "12px",
                                          marginTop: "5px",
                                          color:
                                            seat.surcharge > 0
                                              ? "red"
                                              : "green",
                                        }}
                                      >
                                        {seat.surcharge > 0
                                          ? `Phụ thu giá sẽ cộng thêm ${formatCurrency(
                                              seat.surcharge
                                            )}`
                                          : `Phụ thu giá sẽ giảm ${formatCurrency(
                                              Math.abs(seat.surcharge)
                                            )}`}
                                      </div>
                                    )} */}
                                  </div>
                                </td>
                              </>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div
                className={
                  styles.bookingPage__tickets__item__collapse__booking__seat_map__note
                }
              >
                <p>
                  <span className="avicon icon-seat-empty" />
                  Ghế trống
                </p>
                <p>
                  <span className="avicon icon-seat-booked" />
                  Ghế đã đặt
                </p>
                <p>
                  <span className="avicon icon-seat-selected" />
                  Ghế đang chọn
                </p>
                <p>
                  <span className="avicon icon-seat-sold" />
                  Ghế đã bán
                </p>
                <p>
                  <span className="avicon icon-seat-not-sell" />
                  Ghế không bán
                </p>
              </div>
            </div>

            <BookingForm
              car={car}
              selectedSeats={selectedSeats}
              totalPriceTicket={totalPriceTicket}
              carRouteId={carRouteId}
              scheduleId={scheduleId}
              startLocation={startLocation}
              stopLocation={stopLocation}
              startTime={startTime}
              selectedRoute={selectedRoute}
              selectedCar={selectedCar}
              routeDetail={routeDetail}
              carDetail={carDetail}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;

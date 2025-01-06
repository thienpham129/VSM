import React, { useEffect, useState } from "react";
import styles from "components/bookingTicket.module.css";
import { useNavigate } from "react-router-dom";
import SellectAddress from "components/SellectAddress";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "services/app";
import { getTokenFromLocalStorage } from "utils/tokenUtils";
import { root } from "helper/axiosClient";
import { jwtDecode } from "jwt-decode";
import location_icon from "../BookingForm/location_icon.png";
import axios from "axios";

const SeatMapMobile = ({
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
  const navigate = useNavigate();
  const [seats, setSeats] = useState(car.type.seatList); // Ghế từ car data
  const [selectedSeats, setSelectedSeats] = useState([]); // Ghế đã chọn
  const [tickets, setTickets] = useState([]); // Dữ liệu vé từ API
  const [canceledSeats, setCanceledSeats] = useState([]); // Ghế hủy đặt vé
  const [waitingSeats, setWaitingSeats] = useState([]); // Ghế đang chờ xử lý
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(null);

  //
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [detailAddressToPickUp, setDetailAddressToPickUp] = useState("");
  const [detailAddressDropOff, setDetailAddressDropOff] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("vietQR");
  const [selectedSeat, setSelectedSeat] = useState(0);
  const [errors, setErrors] = useState({});

  //

  const [pickUpAddress, setPickUpAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [suggesstPickUpAddress, setSuggestPickUpAddress] = useState([]);
  const [suggesstDropAddress, setSuggestDropAddress] = useState([]);
  const [isShowSuggestPickUp, setIsShowSuggestPickup] = useState(false);
  const [isShowSuggestDrop, setIsShowSuggestDrop] = useState(false);
  const [pickUpLat, setPickUpLat] = useState("");
  const [pickUpLon, setPickUpLon] = useState("");
  const [dropLat, setDropLat] = useState("");
  const [dropLon, setDropLon] = useState("");
  const [messageVoucher, setMessageVoucher] = useState("");
  const [voucher, setVoucher] = useState("");

  const createAddressValuePickUp = () => {
    setDetailAddressToPickUp(pickUpAddress);
  };
  const createAddressValueDropOff = () => {
    setDetailAddressDropOff(dropAddress);
  };

  useEffect(() => {
    createAddressValuePickUp();
    createAddressValueDropOff();
  }, [pickUpAddress, dropAddress]);
  // End Api

  //
  useEffect(() => {
    setSeats(car.type.seatList);
  }, [car]);
  useEffect(() => {
    axios
      .get(`http://localhost:9000/public/ticket-with-schedule/${scheduleId}`)
      .then((response) => {
        setTickets(response.data);

        // Lọc ghế có status là "Hủy thanh toán"
        const canceledSeats = response.data.filter(
          (ticket) => ticket.status === "Hủy thanh toán"
        );
        setCanceledSeats(canceledSeats);

        // Lọc ghế có status là "Đang chờ xử lý"
        const waitingSeats = response.data.filter(
          (ticket) => ticket.status === "Đang chờ xử lý"
        );
        console.log("««««« waitingSeats »»»»»", waitingSeats);
        setWaitingSeats(waitingSeats);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API: ", error);
      });
  }, []);

  // Hàm kiểm tra ghế bị hủy
  const checkCanceledTicket = (seatPosition) => {
    return canceledSeats.some((ticket) =>
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
    const isCanceled = checkCanceledTicket(seatPosition);
    const isWaiting = waitingSeats.some((ticket) =>
      ticket.selectedSeat.includes(seatPosition)
    );
    if (isCanceled || isWaiting) {
      return; 
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

  // Hàm định dạng tiền VND
  const formatCurrency = (value) => {
    return (
      new Intl.NumberFormat("vi-VN", {
        style: "decimal",
        minimumFractionDigits: 0, // Không hiển thị phần thập phân
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

  useEffect(() => {
    setSelectedSeat(selectedSeats); // Set selectedSeat to the count of selected seats
  }, [selectedSeats]);

  //
  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Họ tên là bắt buộc.";
    if (!selectedSeats.length)
      newErrors.selectedSeats = "Vui lòng chọn ít nhất một ghế.";
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc.";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber =
        "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng 10 chữ số.";
    }
    if (!email.trim()) {
      newErrors.email = "Email là bắt buộc.";
    }
    if (!pickUpAddress.trim())
      newErrors.pickupSpecificAddress = "Vui lòng nhập địa chỉ điểm đi.";
    if (!dropAddress.trim())
      newErrors.dropoffSpecificAddress = "Vui lòng nhập địa chỉ điểm đến.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //

  // Create Ticket
  const handleSubmitMobile = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const ticketData = {
      fullName,
      phoneNumber,
      email,
      note,
      detailAddressToPickUp,
      selectedSeat,
      detailAddressDropOff,
      paymentMethod,
      scheduleId,
      totalPrice,
      ...(voucher && { voucher }),
    };

    console.log('««««« ticketData »»»»»', ticketData);

    // Gửi dữ liệu lên server (có thể dùng fetch hoặc axios)
    try {
      const token = getTokenFromLocalStorage();
      if (!token) {
        window.location.href = "/login";
      }
      const response = await root.post("/public/tickets/create", ticketData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Booking successful:", response.data);
        navigate("/methodPayment", {
          state: {
            fullName,
            phoneNumber,
            email,
            note,
            detailAddressToPickUp,
            selectedSeat,
            detailAddressDropOff,
            totalPrice: response.data.totalPrice,
            startTime,
            startLocation,
            stopLocation,
            selectedCar,
            selectedRoute,
            routeDetail,
            carDetail,
            ticketId: response.data.ticketId,
          },
        });
      } else {
        console.error("Error submitting booking");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  //
  const fetchUser = async (userId) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await root.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log("««««« data »»»»»", data);
      if (data) {
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");
        setFullName(
          `${response.data.firstName || ""} ${
            response.data.lastName || ""
          }`.trim()
        );
      }
    } catch (error) {
      console.error("Failed to retrieve user data:", error);
    }
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;
        if (userId) {
          setUserId(userId);
          fetchUser(userId);
        } else {
          console.error("userId not found in token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);
  //

  useEffect(() => {
    if (pickUpAddress) {
      const delayDebounceFn = setTimeout(() => {
        const query = pickUpAddress.trim();
        if (query) {
          const fetchAddressData = async () => {
            try {
              const response = await fetch(
                `https://rsapi.goong.io/Place/AutoComplete?api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo&input=${query}`
              );
              const data = await response.json();
              setSuggestPickUpAddress(data.predictions);
            } catch (error) {
              console.log(error);
            }
          };
          fetchAddressData();
        }
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setIsShowSuggestPickup(false);
    }
  }, [pickUpAddress]);

  useEffect(() => {
    if (dropAddress) {
      const delayDebounceFn = setTimeout(() => {
        const query = dropAddress.trim();
        if (query) {
          const fetchAddressData = async () => {
            try {
              const response = await fetch(
                `https://rsapi.goong.io/Place/AutoComplete?api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo&input=${query}`
              );
              const data = await response.json();
              setSuggestDropAddress(data.predictions);
            } catch (error) {
              console.log(error);
            }
          };
          fetchAddressData();
        }
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setIsShowSuggestDrop(false);
    }
  }, [dropAddress]);

  useEffect(() => {
    const checkVoucher = async () => {
      try {
        const response = await root.get(
          `/public/check-voucher?voucher=${voucher}`
        );
        if(response.data.data){
          setDiscount(response.data.data.discount)
          const newTotalPrice = totalPriceTicket - (totalPriceTicket * response.data.data.discount / 100); 
          setTotalPrice(newTotalPrice); 
        }
        if (response.data.data.message !== "Mã hợp lệ có thể sử dụng") {
          setMessageVoucher("Mã Đã Hết Hạn Hoặc Không Đúng !");
        } else {
          setMessageVoucher("");
        }
      } catch (error) {
        setMessageVoucher("Mã Đã Hết Hạn Hoặc Không Đúng !");
        console.log(error);
      }
    };
    checkVoucher();
  }, [voucher, totalPriceTicket]);

  return (
    <div
      className={styles.bookingPage__mobile__item}
      allowBook
      data-wrap-trip="PLT0Tc1ybgN295oCg20241015"
      id="mtrip-PLT0Tc1ybgN295oCg20241015-0"
    >
      <div
        className="bookingPage__mobile__item__thumb js--toggleCreateMapMobile"
        data-toggle="collapse"
        data-trip-id="PLT0Tc1ybgN295oCg20241015"
        data-parent="#mtrip-PLT0Tc1ybgN295oCg20241015-0"
        href="#mcollapse--bookingPLT0Tc1ybgN295oCg20241015-0"
      ></div>
      <div
        className={styles.bookingPage__mobile__tickets__item__collapse__booking}
        collapse
        id="mcollapse--bookingPLT0Tc1ybgN295oCg20241015-0"
      >
        <div
          className={
            styles.bookingPage__mobile__tickets__item__collapse__booking__seat_map
          }
          data-tab-content="seatMap"
        >
          <h4 style={{ textAlign: "center" }}>Xe {car.type.numSeats} chỗ</h4>

          {/* Sơ đồ ghế */}
          <div
            className={
              styles.bookingPage__mobile__tickets__item__collapse__booking__seat_map__floor
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
                        const isCanceled = checkCanceledTicket(position);
                        const isWaiting = waitingSeats.some((ticket) =>
                          ticket.selectedSeat.includes(position)
                        );

                        let seatClass = "icon-seat-empty";
                        let cursorStyle = "pointer"; // Mặc định là pointer

                        if (position === "A1") {
                          seatClass = "icon-seat-not-sell";
                          cursorStyle = "not-allowed"; // Ghế A1 không thể chọn
                        } else if (isCanceled) {
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
                          <td key={colIndex}>
                            <div style={{ textAlign: "center" }}>
                              <input
                                type="button"
                                value={
                                  position === "A1" ? "Tài Xế" : seat.position
                                }
                                readOnly
                                className={`avicon ${seatClass}`}
                                onClick={
                                  position === "A1" || isCanceled || isWaiting
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
                              {/* Hiển thị thông báo phụ thu nếu có */}
                              {seat && seat.surcharge !== 0 && (
                                <div
                                  style={{
                                    fontSize: "12px",
                                    marginTop: "5px",
                                    color: seat.surcharge > 0 ? "red" : "green",
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
                            </div>
                          </td>
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
              styles.bookingPage__mobile__tickets__item__collapse__booking__seat_map__note
            }
          >
            <p>
              <span className="avicon icon-seat-sm-empty" /> <b>Ghế trống</b>
            </p>
            <p>
              <span className="avicon icon-seat-sm-booked" /> <b>Ghế đã đặt</b>
            </p>
            <p>
              <span className="avicon icon-seat-sm-selected" />{" "}
              <b>Ghế đang chọn</b>{" "}
            </p>
            <p>
              <span className="avicon icon-seat-sm-sold" /> <b>Ghế đã bán</b>{" "}
            </p>
            <p>
              <span className="avicon icon-seat-sm-not-sell" />{" "}
              <b>Ghế không bán</b>{" "}
            </p>
          </div>
          {/*  */}
          {/* Start in4 */}
          <div
            className={
              styles.bookingPage__mobile__tickets__item__collapse__booking__user
            }
            id="userInfoPLT0Tc1ybgN295oCg20241015"
            data-tab-content="userInfo"
          >
            <h4 style={{ textAlign: "center" }}>Thông tin khách hàng</h4>
            <form
              data-form-trip-id="PLT0Tc1ybgN295oCg20241015"
              data-trip-choosableseat={1}
              method="POST"
              onSubmit={handleSubmitMobile}
            >
              <div className={styles.form_group}>
                <label htmlFor="">Ghế đã chọn</label>

                <div data-content="listSeat" className={styles.list_seat}>
                  {selectedSeats.join(", ")}
                  <span className={styles.error}>{errors.selectedSeats}</span>
                </div>
              </div>
              <div className={styles.form_group}>
                <label htmlFor="">Tổng tiền</label>
                <span className="total-monney">
                  <span data-content="totalPrice">
                  {totalPriceTicket.toLocaleString().replace(",", ".")} VNĐ
                  </span>{" "}
                </span>
              </div>
              <div className={styles.form_group}>
                <label htmlFor="">
                  Họ tên: <span className={styles.text_danger}>*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && (
                  <span
                    className={styles.error}
                    style={{ marginLeft: "262px" }}
                  >
                    {errors.fullName}
                  </span>
                )}
              </div>
              <div className={styles.form_group}>
                <label htmlFor="">
                  Số điện thoại: <span className={styles.text_danger}>*</span>
                </label>
                <input
                  type="number"
                  name="phone"
                  defaultValue=""
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {errors.phoneNumber && (
                  <span
                    className={styles.error}
                    style={{ marginLeft: "262px" }}
                  >
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
              <div className={styles.form_group} data-content="email">
                <label htmlFor="">
                  Email: <span className={styles.text_danger}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <span
                    className={styles.error}
                    style={{ marginLeft: "262px" }}
                  >
                    {errors.email}
                  </span>
                )}
              </div>
              <div className={styles.form_group}>
                <label htmlFor="">Ghi chú</label>
                <textarea
                  name="note"
                  className="form-control"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="">
                  Điểm đi: <span className={styles.text_danger}>*</span>
                </label>
                <div className={styles.point_wrap}>
                  {/* <input
                      type="text"
                      placeholder="Nhập địa chỉ cụ thể"
                      className={styles.input_box}
                      id="input-box"
                      value={pickUpAddress}
                      style={{ width: "100%" }}
                    /> */}
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ cụ thể"
                    className={styles.input_box}
                    id="input-box"
                    value={pickUpAddress}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setIsShowSuggestPickup(true);
                      setPickUpAddress(e.target.value);
                    }}
                    autoComplete="off"
                  />
                  {suggesstPickUpAddress.length > 0 && isShowSuggestPickUp ? (
                    <div className={styles.result_box}>
                      <ul>
                        {suggesstPickUpAddress.map((item) => (
                          <li
                            onClick={() => {
                              setPickUpAddress(item.description);
                              setIsShowSuggestPickup(false);
                            }}
                          >
                            {" "}
                            <img
                              src={location_icon}
                              alt="location_icon"
                              style={{ width: "24px", height: "24px" }}
                            />{" "}
                            {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}

                  {errors.pickupSpecificAddress && (
                    <span className={styles.error}>
                      {errors.pickupSpecificAddress}
                    </span>
                  )}
                </div>
                <label htmlFor="pointUp" className={styles.error} />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="">
                  Điểm đến: <span className={styles.text_danger}>*</span>
                </label>
                <div className={styles.point_wrap}>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ cụ thể"
                    className={styles.input_box}
                    id="input-box"
                    value={dropAddress}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setIsShowSuggestDrop(true);
                      setDropAddress(e.target.value);
                    }}
                    autoComplete="off"
                  />
                  {suggesstDropAddress.length > 0 && isShowSuggestDrop ? (
                    <div className={styles.result_box}>
                      <ul>
                        {suggesstDropAddress.map((item) => (
                          <li
                            onClick={() => {
                              setDropAddress(item.description);
                              setIsShowSuggestDrop(false);
                            }}
                          >
                            {" "}
                            <img
                              src={location_icon}
                              alt="location_icon"
                              style={{ width: "24px", height: "24px" }}
                            />{" "}
                            {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  {errors.dropoffSpecificAddress && (
                    <span className={styles.error}>
                      {errors.dropoffSpecificAddress}
                    </span>
                  )}
                </div>
                <label htmlFor="pointDown" className={styles.error} />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="">Mã khuyến mãi</label>
                <input
                  type="text"
                  name="promotionCode"
                  defaultValue=""
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                />
                {voucher ? (
                  <p
                    style={{
                      color: "red",
                      marginTop: "10px",
                      marginLeft: "31%",
                    }}
                  >
                    {messageVoucher}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div
                className="form-group mb-2"
                data-discount-trip="PLT0Tc1ybgN295oCg20241015"
              ></div>
              <div className={styles.order_summary}>
                <button type="submit" className={styles.text_right}>
                  <a style={{ color: "#fff" }}>Tiếp tục</a>
                </button>
              </div>
            </form>
          </div>
          {/* End in4 */}
        </div>
      </div>
    </div>
  );
};

export default SeatMapMobile;

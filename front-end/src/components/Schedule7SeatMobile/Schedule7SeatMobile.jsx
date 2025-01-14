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

const Seat = ({ seatId, seatStatus, onSelect, bookedSeats }) => {
  const isSold = bookedSeats.soldSeats.includes(seatId);
  const isBooked = bookedSeats.bookedSeats.includes(seatId);
  const [isSelected, setIsSelected] = useState(false);

  const handleSeatClick = () => {
    if (isSold || isBooked) return;
    setIsSelected((prev) => !prev);
    onSelect(seatId, !isSelected);
  };

  return (
    <td
      className={`${styles.avseat} ${
        isSold ? styles.soldSeat : isBooked ? styles.bookedSeat : ""
      }`}
      onClick={handleSeatClick}
      data-seat-id={seatId}
      title={seatId}
    >
      <div
        className={`avicon ${
          isSold
            ? "icon-seat-sold" // paid: true
            : isBooked
            ? "icon-seat-booked" // paid: false
            : isSelected
            ? "icon-seat-selected"
            : "icon-seat-empty"
        }`}
      />
      <span className={styles.showSeatId}>{seatId}</span>
    </td>
  );
};

const Schedule7SeatMobile = ({
  startTime,
  startLocation,
  stopLocation,
  car,
  numSeat,
  price,
  scheduleId,
  typeId,
}) => {
  const navigate = useNavigate();
  const ticketPrice = price;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookedSeats, setBookedSeats] = useState({
    soldSeats: [],
    bookedSeats: [],
    canceledSeats: [], // Thêm trạng thái "Đã hủy vé"
  });

  const [availableSeats, setAvailableSeats] = useState(6); // Số ghế còn trống

  //
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [detailAddressToPickUp, setDetailAddressToPickUp] = useState("");
  const [detailAddressDropOff, setDetailAddressDropOff] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("VNPay");
  const [selectedSeat, setSelectedSeat] = useState(0);
  const [errors, setErrors] = useState({});

  //
  const [pickupSpecificAddress, setPickupSpecificAddress] = useState("");
  const [dropoffSpecificAddress, setDropoffSpecificAddress] = useState("");
  const [dropoffProvinces, setDropoffProvinces] = useState([]);
  const [dropoffDistricts, setDropoffDistricts] = useState([]);
  const [dropoffWards, setDropoffWards] = useState([]);
  const [dropoffProvince, setDropoffProvince] = useState("");
  const [dropoffDistrict, setDropoffDistrict] = useState("");
  const [dropoffWard, setDropoffWard] = useState("");
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
  // Start Api
  // Handle change for specific addresses
  // const handlePickupSpecificAddressChange = (event) => {
  //   setPickupSpecificAddress(event.target.value);
  // };

  // const handleDropoffSpecificAddressChange = (event) => {
  //   setDropoffSpecificAddress(event.target.value);
  // };

  const createAddressValuePickUp = () => {
    // const newAddressPickUp = `${pickupSpecificAddress} ${
    //   pickupWard
    //     ? `${
    //         pickupWards?.find((item) => item.ward_id === pickupWard)?.ward_name
    //       },`
    //     : ""
    // } ${
    //   pickupDistrict
    //     ? `${
    //         pickupDistricts?.find((item) => item.district_id === pickupDistrict)
    //           ?.district_name
    //       },`
    //     : ""
    // } ${
    //   pickupProvince
    //     ? pickupProvinces?.find((item) => item.province_id === pickupProvince)
    //         ?.province_name
    //     : ""
    // }`;
    // setDetailAddressToPickUp(newAddressPickUp.trim());
    setDetailAddressToPickUp(pickUpAddress);
  };
  const createAddressValueDropOff = () => {
    // const newAddressDropOff = `${dropoffSpecificAddress} ${
    //   dropoffWard
    //     ? `${
    //         dropoffWards?.find((item) => item.ward_id === dropoffWard)
    //           ?.ward_name
    //       },`
    //     : ""
    // } ${
    //   dropoffDistrict
    //     ? `${
    //         dropoffDistricts?.find(
    //           (item) => item.district_id === dropoffDistrict
    //         )?.district_name
    //       },`
    //     : ""
    // } ${
    //   dropoffProvince
    //     ? dropoffProvinces?.find((item) => item.province_id === dropoffProvince)
    //         ?.province_name
    //     : ""
    // }`;
    // setDetailAddressDropOff(newAddressDropOff.trim());
    setDetailAddressDropOff(dropAddress);
  };

  // Fetch provinces once and use them for both pick-up and drop-off
  // useEffect(() => {
  //   const fetchProvinces = async () => {
  //     const response = await apiGetPublicProvinces();
  //     if (response.status === 200) {
  //       setPickupProvinces(response.data.results);
  //       setDropoffProvinces(response.data.results);
  //     }
  //   };
  //   fetchProvinces();
  // }, []);

  // // Fetch districts and wards for pick-up location based on province and district selection
  // useEffect(() => {
  //   const fetchPickupDistricts = async () => {
  //     const response = await apiGetPublicDistrict(pickupProvince);
  //     if (response.status === 200) {
  //       setPickupDistricts(response.data.results);
  //     }
  //   };
  //   pickupProvince && fetchPickupDistricts();

  //   setPickupDistrict("");
  //   setPickupWards([]);
  // }, [pickupProvince]);

  // useEffect(() => {
  //   const fetchPickupWards = async () => {
  //     const response = await apiGetPublicWard(pickupDistrict);
  //     if (response.status === 200) {
  //       setPickupWards(response.data.results);
  //     }
  //   };
  //   pickupDistrict && fetchPickupWards();

  //   setPickupWard("");
  // }, [pickupDistrict]);

  // // Fetch districts and wards for drop-off location based on province and district selection
  // useEffect(() => {
  //   const fetchDropoffDistricts = async () => {
  //     const response = await apiGetPublicDistrict(dropoffProvince);
  //     if (response.status === 200) {
  //       setDropoffDistricts(response.data.results);
  //     }
  //   };
  //   dropoffProvince && fetchDropoffDistricts();

  //   setDropoffDistrict("");
  //   setDropoffWards([]);
  // }, [dropoffProvince]);

  // useEffect(() => {
  //   const fetchDropoffWards = async () => {
  //     const response = await apiGetPublicWard(dropoffDistrict);
  //     if (response.status === 200) {
  //       setDropoffWards(response.data.results);
  //     }
  //   };
  //   dropoffDistrict && fetchDropoffWards();

  //   setDropoffWard("");
  // }, [dropoffDistrict]);

  useEffect(() => {
    createAddressValuePickUp();
    createAddressValueDropOff();
  }, [
    // pickupWard,
    // pickupDistrict,
    // pickupProvince,
    // dropoffWard,
    // dropoffDistrict,
    // dropoffProvince,
    pickUpAddress,
    dropAddress,
  ]);
  // End Api

  //
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await root.get(
          `/public/ticket-with-schedule/${scheduleId}`
        );
        // Lấy ghế có status "Đang chờ xử lý", "Đã thanh toán", và "Đã hủy vé"
        const seatsPending = response.data
          .filter((ticket) => ticket.status === "Đang chờ xử lý")
          .map((ticket) => ticket.selectedSeat)
          .flat();

        const seatsPaid = response.data
          .filter((ticket) => ticket.status === "Đã thanh toán")
          .map((ticket) => ticket.selectedSeat)
          .flat();

        const seatsCanceled = response.data
          .filter((ticket) => ticket.status === "Đã hủy vé")
          .map((ticket) => ticket.selectedSeat)
          .flat();

        // Lưu danh sách ghế theo trạng thái
        setBookedSeats({
          soldSeats: seatsPaid, // Đã thanh toán
          bookedSeats: seatsPending, // Đang chờ xử lý
          canceledSeats: seatsCanceled, // Đã hủy vé
        });

        // Đếm số ghế còn trống
        const totalSeats = 6; // Xe có 6 ghế
        const soldAndBookedSeats = new Set([...seatsPaid, ...seatsPending]); // Ghế đã bán hoặc đang chờ xử lý
        const availableSeats = totalSeats - soldAndBookedSeats.size;
        setAvailableSeats(availableSeats);
      } catch (err) {
        console.log("««««« err »»»»»", err);
      } finally {
      }
    };

    fetchBookedSeats();
  }, [scheduleId]);
  //

  const handleSeatSelection = (seatId, isSelected) => {
    setSelectedSeats((prev) => {
      if (isSelected) {
        return [...prev, seatId];
      } else {
        return prev.filter((id) => id !== seatId);
      }
    });

    setTotalPrice((prev) =>
      isSelected ? prev + ticketPrice : prev - ticketPrice
    );
  };

  const handleToggleUserInfo = () => {
    if (selectedSeats.length === 0) {
      setErrorMessage("Vui lòng chọn ghế");
    } else {
      setErrorMessage("");
      // Tiến hành xác nhận đặt vé ở đây
      setIsUserInfoVisible(true);

      console.log("Đặt vé thành công", selectedSeats);
    }
  };

  const handleHideUserInfo = () => {
    setIsUserInfoVisible(false);
  };

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
      typeId,
    };

    // Gửi dữ liệu lên server (có thể dùng fetch hoặc axios)
    try {
      const token = getTokenFromLocalStorage();
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
            totalPrice,
            startTime,
            startLocation,
            stopLocation,
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
  }, [voucher]);

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
      >
        <div className={styles.bookingPage__mobile__item__thumb__line}>
          <h3>
            <span>
              {new Date(startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <p>{startLocation}</p>
          </h3>
          <h4>
            <span>{price.toLocaleString()} VND</span>
          </h4>
        </div>
        <div className={styles.bookingPage__mobile__item__thumb__line}>
          <h3>
            <span style={{ visibility: "hidden" }}>--:--</span>
            <p>
              {stopLocation} <br /> <b className="d-none" />{" "}
            </p>
          </h3>
          <p>
            còn {availableSeats} chỗ ngồi trống <br />{" "}
            <b className={styles.bookingPage__mobile__item__toggle_detail}>
              {car.name} - {numSeat} chỗ ngồi{" "}
              <span className="avicon icon-caret-down-bg" />{" "}
            </b>
          </p>
        </div>
      </div>
      <div
        className="bookingPage__mobile__item__collapse__booking collapse"
        id="mcollapse--bookingPLT0Tc1ybgN295oCg20241015-0"
      >
        <div
          className={
            styles.bookingPage__mobile__tickets__item__collapse__booking__seat_map
          }
          data-tab-content="seatMap"
        >
          {!isUserInfoVisible && (
            <>
              <div
                className={
                  styles.bookingPage__mobile__tickets__item__collapse__booking__seat_map__note
                }
              >
                <p>
                  <span className="avicon icon-seat-sm-empty" />{" "}
                  <b>Ghế trống</b>
                </p>
                <p>
                  <span className="avicon icon-seat-sm-booked" />{" "}
                  <b>Ghế đã đặt</b>
                </p>
                <p>
                  <span className="avicon icon-seat-sm-selected" />{" "}
                  <b>Ghế đang chọn</b>{" "}
                </p>
                <p>
                  <span className="avicon icon-seat-sm-sold" />{" "}
                  <b>Ghế đã bán</b>{" "}
                </p>
                <p>
                  <span className="avicon icon-seat-sm-not-sell" />{" "}
                  <b>Ghế không bán</b>{" "}
                </p>
              </div>

              <div
                className={
                  styles.bookingPage__mobile__tickets__item__collapse__booking__seat_map__floor
                }
              >
                <h4>Xe 7 chỗ</h4>
                <table le="" className={styles.avseatmap}>
                  <tbody>
                    <tr>
                      <td
                        className={styles.avseat}
                        data-seat-price={0}
                        data-extra-price={0}
                        data-trip-id="PLT0Tc1ybgN295oCg20241015"
                        data-seat-status="notSell"
                        data-seat-col={1}
                        data-seat-row={1}
                        data-seat-type={2}
                        data-seat-floor={1}
                        data-seat-id="TAI"
                        title="TAI"
                        data-seatmap-id="SM0Tc1ybgBNa7yys"
                      >
                        <div className="avicon icon-seat-not-sell" />
                        <span className={styles.showSeatId}>TAI</span>
                      </td>
                      <td />
                      <Seat
                        seatId="A1"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                    </tr>
                    <tr>
                      <Seat
                        seatId="A2"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A3"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A4"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                    </tr>
                    <tr>
                      <Seat
                        seatId="A5"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                      <td />

                      <Seat
                        seatId="A6"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                      {/* <Seat
                        seatId="A7"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      /> */}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className={
                  styles.bookingPage__mobile__tickets__item__collapse__booking__seat_map__total
                }
              >
                <p>
                  <span>
                    Ghế:{" "}
                    <span data-content="listSeat" className={styles.list_seat}>
                      {selectedSeats.join(", ")}{" "}
                    </span>
                  </span>
                  <span>
                    <span data-content="totalPrice">
                      {totalPrice.toLocaleString()} đ
                    </span>{" "}
                  </span>
                </p>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <a
                  href="javascript:;"
                  data-action="toggleTab"
                  data-trip-id="PLT0Tc1ybgN295oCg20241015"
                  onClick={handleToggleUserInfo}
                >
                  Xác nhận đặt{" "}
                  <i className="fa fa-arrow-right" aria-hidden="true" />
                </a>
              </div>
            </>
          )}

          {isUserInfoVisible && (
            <div
              className={
                styles.bookingPage__mobile__tickets__item__collapse__booking__user
              }
              id="userInfoPLT0Tc1ybgN295oCg20241015"
              data-tab-content="userInfo"
              style={{ display: isUserInfoVisible ? "block" : "none" }}
            >
              <h4>
                <i
                  class="fa-solid fa-arrow-left"
                  style={{ paddingRight: "200px" }}
                  onClick={handleHideUserInfo}
                ></i>
                Thông tin khách hàng
              </h4>
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
                      {totalPrice.toLocaleString()} đ
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
                {/* <div className={`${styles.form_group} ${styles.useEmail}`}>
                  <label htmlFor="useEmail" className="d-block">
                    Gửi vé cho tôi qua email
                  </label>
                  <input
                    style={{ width: "2%" }}
                    data-action="useEmail"
                    data-trip-id="PLT0Tc1ybgN295oCg20241015"
                    defaultChecked=""
                    type="checkbox"
                    name="useEmail"
                    defaultValue=""
                  />
                </div> */}
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
                  <div>
                    <p>
                      Ghế:{" "}
                      <span
                        data-content="listSeat"
                        className={styles.list_seat}
                      >
                        {selectedSeats.join(", ")}{" "}
                      </span>
                    </p>
                    <h4>
                      <span className="total-monney">
                        <span data-content="totalPrice">
                          {totalPrice.toLocaleString()} đ
                        </span>{" "}
                      </span>
                    </h4>
                  </div>
                  <button type="submit" className={styles.text_right}>
                    <a style={{ color: "#fff" }}>Tiếp tục</a>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule7SeatMobile;

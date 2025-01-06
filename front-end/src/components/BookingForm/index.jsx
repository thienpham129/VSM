// BookingForm.js
import React, { useEffect, useState } from "react";
import styles from "components/bookingTicket.module.css";
import Button from "@mui/material/Button";
import SellectAddress from "components/SellectAddress";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import location_icon from "./location_icon.png";

import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "services/app";
import { root } from "helper/axiosClient";
import { getTokenFromLocalStorage } from "utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import MethodPayment from "pages/methodPayment";
import { jwtDecode } from "jwt-decode";

function BookingForm({
  selectedSeats,
  totalPriceTicket,
  startTime,
  startLocation,
  stopLocation,
  // price,
  scheduleId,
  carRouteId,
  selectedRoute,
  selectedCar,
  routeDetail,
  carDetail
}) {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [detailAddressToPickUp, setDetailAddressToPickUp] = useState("");
  const [detailAddressDropOff, setDetailAddressDropOff] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("vietQR");
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [errors, setErrors] = useState({});
  const [ticketId, setTicketId] = useState(null);
  const [voucher, setVoucher] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(totalPriceTicket)

  // Pick-up location state
  const [pickupSpecificAddress, setPickupSpecificAddress] = useState("");
  const [pickupProvinces, setPickupProvinces] = useState([]);
  const [pickupDistricts, setPickupDistricts] = useState([]);
  const [pickupWards, setPickupWards] = useState([]);
  const [pickupProvince, setPickupProvince] = useState("");
  const [pickupDistrict, setPickupDistrict] = useState("");
  const [pickupWard, setPickupWard] = useState("");

  // Drop-off location state
  const [dropoffSpecificAddress, setDropoffSpecificAddress] = useState("");
  const [dropoffProvinces, setDropoffProvinces] = useState([]);
  const [dropoffDistricts, setDropoffDistricts] = useState([]);
  const [dropoffWards, setDropoffWards] = useState([]);
  const [dropoffProvince, setDropoffProvince] = useState("");
  const [dropoffDistrict, setDropoffDistrict] = useState("");
  const [dropoffWard, setDropoffWard] = useState("");
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

  useEffect(() => {
    setTotalPrice(totalPriceTicket); // Cập nhật state khi props thay đổi
  }, [totalPriceTicket]);


  const notifyErrorEmptyVoucher = () =>
    toast.error("Hãy nhập mã giảm giá của bạn !", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const notifyErrorVoucher = () =>
    toast.error("Mã khuyến mãi đã hết hạn hoặc không đúng", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

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
  const handleSubmit = async (e) => {
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
            // voucher : response.data.voucher
          },
        });
      } else {
        console.error("Error submitting booking");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

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
              if (data.predictions) {
                setSuggestPickUpAddress(data.predictions);
              }
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
              if (data.predictions) {
                setSuggestDropAddress(data.predictions);
              }
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

  // const handleCheckVoucher = async () => {
  //   if (!voucher) {
  //     notifyErrorEmptyVoucher();
  //   } else {
  //     try {
  //       const response = await root.get(
  //         `/public/check-voucher?voucher=${voucher}`
  //       );
  //       if (response.data.data.message === "Mã hợp lệ có thể sử dụng") {
  //         const notifySuccessCheckVoucher = () =>
  //           toast.success(
  //             `Mã khuyến mại hợp lệ, bạn được giảm giá ${response.data.data.discount}%`,
  //             {
  //               position: "bottom-right",
  //               autoClose: 2500,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //               theme: "colored",
  //               transition: Bounce,
  //             }
  //           );
  //         notifySuccessCheckVoucher();
  //       } else {
  //         notifyErrorVoucher();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       notifyErrorVoucher();
  //     }
  //   }
  // };
  //

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
    <div className={styles.bookingPage__tickets__item__collapse__booking__user}>
      {/* <div
        className={styles.bookingPage__tickets__item__collapse__booking__title}
      >
        <h3>
          {startLocation} <i class="fa-solid fa-arrow-right" /> {stopLocation}
        </h3>
        <p>{new Date(startTime).toLocaleString()}</p>
      </div> */}
      <form
        method="POST"
        data-trip-choosableseat={1}
        data-form-trip-id="PLT0Tc1ybgN295oCg20241015"
        onSubmit={handleSubmit}
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
            <span className={styles.error} style={{ marginLeft: "112px" }}>
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
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && (
            <span className={styles.error} style={{ marginLeft: "112px" }}>
              {errors.phoneNumber}
            </span>
          )}
        </div>
        <div className={`${styles.form_group} ${styles.useEmail}`}></div>
        <div className={styles.form_group} data-content="email">
          <label htmlFor="">
            Email:
            <span className={styles.text_danger} required>
              *
            </span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
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
              onChange={handlePickupSpecificAddressChange}
              value={pickupSpecificAddress}
              placeholder="Nhập địa chỉ cụ thể"
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
          <label htmlFor="">Mã khuyến mãi:</label>
          <input
            type="text"
            name="promotionCode"
            defaultValue=""
            className="form-control"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
          {voucher ? (
            <p style={{ color: "red", marginTop: "10px", marginLeft: "31%" }}>
              {messageVoucher}
            </p>
          ) : (
            ""
          )}
        </div>

        <div
          className={`styles.form_group`}
          data-discount-trip="PLT0Tc1ybgN295oCg20241015"
        ></div>
        <div className="d-flex justify-content-end">
          {/* <button
            type="button"
            className="mr-2 px-3"
            data-action="checkPromotion"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            style={{ marginRight: "10px" }}
          >
            <i
              className="fa fa-search mr-2"
              aria-hidden="true"
              style={{ paddingRight: "5px" }}
            />
            Kiểm tra mã
          </button> */}
          <button
            type="submit"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            className="js__toggleProcessBooking"
          >
            <a style={{ color: "#fff" }}>Tiếp tục</a>
          </button>
        </div>
      </form>
      {/* <button
        // data-trip-id="PLT0Tc1ybgN295oCg20241015"
        className="js__toggleProcessBooking"
        style={{ marginRight: "10px" }}
        onClick={handleCheckVoucher}
      >
        <a style={{ color: "#fff" }}>Kiểm tra mã giảm giá</a>
      </button> */}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default BookingForm;

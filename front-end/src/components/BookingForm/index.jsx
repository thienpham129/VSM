// BookingForm.js
import React, { useEffect, useState } from "react";
import styles from "components/bookingTicket.module.css";
import SellectAddress from "components/SellectAddress";
import { ToastContainer, toast, Bounce } from "react-toastify";

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
  totalPrice,
  startTime,
  startLocation,
  stopLocation,
  price,
  scheduleId,
  typeId,
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

  // Handle change for specific addresses
  const handlePickupSpecificAddressChange = (event) => {
    setPickupSpecificAddress(event.target.value);
  };

  const handleDropoffSpecificAddressChange = (event) => {
    setDropoffSpecificAddress(event.target.value);
  };

  const createAddressValuePickUp = () => {
    const newAddressPickUp = `${pickupSpecificAddress} ${
      pickupWard
        ? `${
            pickupWards?.find((item) => item.ward_id === pickupWard)?.ward_name
          },`
        : ""
    } ${
      pickupDistrict
        ? `${
            pickupDistricts?.find((item) => item.district_id === pickupDistrict)
              ?.district_name
          },`
        : ""
    } ${
      pickupProvince
        ? pickupProvinces?.find((item) => item.province_id === pickupProvince)
            ?.province_name
        : ""
    }`;
    setDetailAddressToPickUp(newAddressPickUp.trim());
  };
  const createAddressValueDropOff = () => {
    const newAddressDropOff = `${dropoffSpecificAddress} ${
      dropoffWard
        ? `${
            dropoffWards?.find((item) => item.ward_id === dropoffWard)
              ?.ward_name
          },`
        : ""
    } ${
      dropoffDistrict
        ? `${
            dropoffDistricts?.find(
              (item) => item.district_id === dropoffDistrict
            )?.district_name
          },`
        : ""
    } ${
      dropoffProvince
        ? dropoffProvinces?.find((item) => item.province_id === dropoffProvince)
            ?.province_name
        : ""
    }`;
    setDetailAddressDropOff(newAddressDropOff.trim());
  };

  // Fetch provinces once and use them for both pick-up and drop-off
  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setPickupProvinces(response.data.results);
        setDropoffProvinces(response.data.results);
      }
    };
    fetchProvinces();
  }, []);

  // Tự động set pickupProvince khi startLocation thay đổi
  useEffect(() => {
    if (startLocation && pickupProvinces.length > 0) {
      // Tìm tỉnh có tên trùng với startLocation
      const province = pickupProvinces.find(
        (item) => item.province_name === startLocation
      );
      console.log("««««« province »»»»»", province);
      if (province) {
        setPickupProvince(province.province_id);
        console.log("««««« province.province_id »»»»»", province.province_id); // Set province vào state
      }
    }
  }, [startLocation, pickupProvinces]);

  // Fetch districts and wards for pick-up location based on province and district selection
  useEffect(() => {
    const fetchPickupDistricts = async () => {
      const response = await apiGetPublicDistrict(pickupProvince);
      if (response.status === 200) {
        setPickupDistricts(response.data.results);
      }
    };
    pickupProvince && fetchPickupDistricts();

    setPickupDistrict("");
    setPickupWards([]);
  }, [pickupProvince]);

  useEffect(() => {
    const fetchPickupWards = async () => {
      const response = await apiGetPublicWard(pickupDistrict);
      if (response.status === 200) {
        setPickupWards(response.data.results);
      }
    };
    pickupDistrict && fetchPickupWards();

    setPickupWard("");
  }, [pickupDistrict]);

  // Fetch districts and wards for drop-off location based on province and district selection
  useEffect(() => {
    const fetchDropoffDistricts = async () => {
      const response = await apiGetPublicDistrict(dropoffProvince);
      if (response.status === 200) {
        setDropoffDistricts(response.data.results);
      }
    };
    dropoffProvince && fetchDropoffDistricts();

    setDropoffDistrict("");
    setDropoffWards([]);
  }, [dropoffProvince]);

  useEffect(() => {
    const fetchDropoffWards = async () => {
      const response = await apiGetPublicWard(dropoffDistrict);
      if (response.status === 200) {
        setDropoffWards(response.data.results);
      }
    };
    dropoffDistrict && fetchDropoffWards();

    setDropoffWard("");
  }, [dropoffDistrict]);

  useEffect(() => {
    createAddressValuePickUp();
    createAddressValueDropOff();
  }, [
    pickupWard,
    pickupDistrict,
    pickupProvince,
    dropoffWard,
    dropoffDistrict,
    dropoffProvince,
  ]);

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
    if (!pickupSpecificAddress.trim())
      newErrors.pickupSpecificAddress = "Vui lòng nhập địa chỉ điểm đi.";
    if (!dropoffSpecificAddress.trim())
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
      typeId,
      ...(voucher && { voucher }),
    };

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
            totalPrice : response.data.totalPrice,
            startTime,
            startLocation,
            stopLocation,
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

  return (
    <div className={styles.bookingPage__tickets__item__collapse__booking__user}>
      <div
        className={styles.bookingPage__tickets__item__collapse__booking__title}
      >
        <h3>
          {startLocation} <i class="fa-solid fa-arrow-right" /> {stopLocation}
        </h3>
        <p>{new Date(startTime).toLocaleString()}</p>
      </div>
      <form
        method="POST"
        data-trip-choosableseat={1}
        data-form-trip-id="PLT0Tc1ybgN295oCg20241015"
        onSubmit={handleSubmit}
      >
        <div className="d-none" data-content="additionPriceForUserType" />

        <div className={styles.form_group}>
          <label htmlFor="">Ghế đã chọn</label>
          <div data-content="listSeat" className={styles.list_seat}>
            {selectedSeats.join(", ")}

            <span className={styles.error}>{errors.selectedSeats}</span>
          </div>
        </div>
        {/* <label htmlFor="seat_selected" className={styles.error} /> */}

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
            <span className={styles.error} style={{ marginLeft: "312px" }}>
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
            <span className={styles.error} style={{ marginLeft: "312px" }}>
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
          {errors.email && (
            <span className={styles.error} style={{ marginLeft: "312px" }}>
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
            <input
              type="text"
              onChange={handlePickupSpecificAddressChange}
              value={pickupSpecificAddress}
              placeholder="Nhập địa chỉ cụ thể"
              style={{ width: "100%" }}
            />
            {errors.pickupSpecificAddress && (
              <span className={styles.error}>
                {errors.pickupSpecificAddress}
              </span>
            )}

            <div className="row">
              <div className="col-md-12 form-group">
                <SellectAddress
                  type="province"
                  value={pickupProvince}
                  setValue={setPickupProvince}
                  options={pickupProvinces}
                  label="Province/City(Tỉnh)"
                />
              </div>
              <div className="col-md-12 form-group">
                <SellectAddress
                  type="district"
                  value={pickupDistrict}
                  setValue={setPickupDistrict}
                  options={pickupDistricts}
                  label="District(Quận)"
                />
              </div>
              <div className="col-md-12 form-group">
                <SellectAddress
                  type="ward"
                  value={pickupWard}
                  setValue={setPickupWard}
                  options={pickupWards}
                  label="Wards(phường)"
                />
              </div>
            </div>
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
              onChange={handleDropoffSpecificAddressChange}
              value={dropoffSpecificAddress}
              placeholder="Nhập địa chỉ cụ thể"
              style={{ width: "100%" }}
            />
            {errors.dropoffSpecificAddress && (
              <span className={styles.error}>
                {errors.dropoffSpecificAddress}
              </span>
            )}
            <div className="row">
              <div className="col-md-12 form-group">
                <SellectAddress
                  type="province"
                  value={dropoffProvince}
                  setValue={setDropoffProvince}
                  options={dropoffProvinces}
                  label="Province/City(Tỉnh)"
                />
              </div>
              <div className="col-md-12 form-group">
                <SellectAddress
                  type="district"
                  value={dropoffDistrict}
                  setValue={setDropoffDistrict}
                  options={dropoffDistricts}
                  label="District(Quận)"
                />
              </div>
              <div className="col-md-12 form-group">
                <SellectAddress
                  type="ward"
                  value={dropoffWard}
                  setValue={setDropoffWard}
                  options={dropoffWards}
                  label="Wards(phường)"
                />
              </div>
            </div>
          </div>
          <label htmlFor="pointDown" className={styles.error} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="">Mã khuyến mãi:</label>
          <input type="text" name="promotionCode" defaultValue=""
            className="form-control"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
        </div>
        
        <div
          className={`styles.form_group`}
          data-discount-trip="PLT0Tc1ybgN295oCg20241015"
        ></div>
        <div className="d-flex justify-content-end">
          <button
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
          </button>
          <button
            type="submit"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            className="js__toggleProcessBooking"
          >
            <a style={{ color: "#fff" }}>Tiếp tục</a>
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;

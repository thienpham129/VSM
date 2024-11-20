// BookingForm.js
import React, { useEffect, useState } from "react";
import styles from "components/bookingTicket.module.css";
import SellectAddress from "components/SellectAddress";

import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "services/app";

function BookingForm({ selectedSeats, totalPrice }) {
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

  return (
    <div className={styles.bookingPage__tickets__item__collapse__booking__user}>
      <div
        className={styles.bookingPage__tickets__item__collapse__booking__title}
      >
        <h3>
          SG: 35 Sài Gòn <span className="avicon icon-arrow-right" /> QN: 1 Quy
          Nhơn
        </h3>
        <p>19:00 - 15/10/2024</p>
      </div>
      <form
        method="POST"
        data-trip-choosableseat={1}
        data-form-trip-id="PLT0Tc1ybgN295oCg20241015"
      >
        <div className="d-none" data-content="additionPriceForUserType" />

        <div className={styles.form_group}>
          <label htmlFor="">Ghế đã chọn</label>
          <div data-content="listSeat" className={styles.list_seat}>
            {selectedSeats.join(", ")}{" "}
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
          <input type="text" name="full_name" defaultValue="" />
          <label htmlFor="full_name" className={styles.error} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="">
            Số điện thoại: <span className={styles.text_danger}>*</span>
          </label>
          <input type="text" name="phone" defaultValue="" />
          <label htmlFor="phone" className={styles.error} />
        </div>
        <div className={`${styles.form_group} ${styles.useEmail}`}>
          <label
            htmlFor="useEmail"
            className="d-block"
          >
            Gửi vé cho tôi qua email
          </label>
          <input
            style={{ width: "30%", marginLeft: "-140px"}}
            data-action="useEmail"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            defaultChecked=""
            type="checkbox"
            name="useEmail"
            defaultValue=""
          />
        </div>
        <div className={styles.form_group} data-content="email">
          <label htmlFor="">
            Email:{" "}
            <span className={styles.text_danger} required>
              *
            </span>
          </label>
          <input type="text" name="email" defaultValue="" />
          <label htmlFor="email" className={styles.error} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="">Ghi chú</label>
          <textarea name="note" className="form-control" defaultValue={""} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="">
            Điểm đi: <span className={styles.text_danger}>*</span>
          </label>
          <div className={styles.point_wrap}>
            <input
              type="text"
              value={pickupSpecificAddress}
              onChange={handlePickupSpecificAddressChange}
              placeholder="Nhập địa chỉ cụ thể"
              style={{width: '100%'}}

            />

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
              value={dropoffSpecificAddress}
              onChange={handleDropoffSpecificAddressChange}
              placeholder="Nhập địa chỉ cụ thể"
              style={{width: '100%'}}
            />
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
          <input type="text" name="promotionCode" defaultValue="" />
        </div>
        <div
          className={styles.form_group}
          mb-2
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
            type="button"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            className="js__toggleProcessBooking"
          >
            <a href="/methodPayment" style={{ color: "#fff" }}>
              Tiếp tục
            </a>
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;

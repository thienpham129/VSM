import React, { useEffect, useState } from "react";
import styles from "components/bookingTicket.module.css";
import { useNavigate } from "react-router-dom";

import SellectAddress from "components/SellectAddress";

import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "services/app";

const Seat = ({ seatId, seatStatus, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSeatClick = () => {
    if (seatStatus === "sold") return;
    setIsSelected((prev) => !prev);
    onSelect(seatId, !isSelected);
  };

  return (
    <td
      className={`${styles.avseat} ${
        seatStatus === "sold" ? styles.soldSeat : ""
      }`}
      onClick={handleSeatClick}
      data-seat-id={seatId}
      title={seatId}
    >
      <div
        className={`avicon ${
          seatStatus === "sold"
            ? "icon-seat-sold"
            : isSelected
            ? "icon-seat-selected"
            : "icon-seat-empty"
        }`}
      />
      <span className={styles.showSeatId}>{seatId}</span>
    </td>
  );
};

const Schedule7SeatMobile = () => {
  const navigate = useNavigate();
  const ticketPrice = 150000;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);

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

  // Start Api
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
  // End Api

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
    setIsUserInfoVisible(true);
  };

  const handleHideUserInfo = () => {
    setIsUserInfoVisible(false);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    navigate("/methodPayment");
  };
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
            <span>19 : 00</span>
            <p>SG: 35 Sài Gòn</p>
          </h3>
          <h4>
            <span>500,000 </span>
          </h4>
        </div>
        <div className={styles.bookingPage__mobile__item__thumb__line}>
          <h3>
            <span style={{ visibility: "hidden" }}>--:--</span>
            <p>
              QN: 1 Quy Nhơn <br /> <b className="d-none" />{" "}
            </p>
          </h3>
          <p>
            14 chỗ trống <br />{" "}
            <b className={styles.bookingPage__mobile__item__toggle_detail}>
              Giường nằm limousine{" "}
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
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                    </tr>
                    <tr>
                      <Seat
                        seatId="A2"
                        seatStatus="sold"
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A3"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A4"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                    </tr>
                    <tr>
                      <Seat
                        seatId="A5"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A6"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A7"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
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
              >
                <div className={styles.form_group}>
                  <label htmlFor="">Ghế đã chọn</label>

                  <div data-content="listSeat" className={styles.list_seat}>
                    {selectedSeats.join(", ")}{" "}
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
                  <label htmlFor="">Họ tên</label>
                  <input type="text" name="full_name" />
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="">Số điện thoại</label>
                  <input type="text" name="phone" defaultValue="" />
                </div>
                <div className={`${styles.form_group} ${styles.useEmail}`}>
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
                </div>
                <div className={styles.form_group} data-content="email">
                  <label htmlFor="">
                    Email: <span className={styles.text_danger}>*</span>
                  </label>
                  <input type="text" name="email" defaultValue="" />
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="">Ghi chú</label>
                  <textarea
                    name="note"
                    className="form-control"
                    defaultValue={""}
                  />
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
                      style={{ width: "100%" }}
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
                      style={{ width: "100%" }}
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
                  <label htmlFor="">Mã khuyến mãi</label>
                  <input
                    type="text"
                    name="promotionCode"
                    placeholder=""
                    defaultValue=""
                  />
                </div>
                <div className="" style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    className="btn btn-info"
                    data-action="checkPromotion"
                    data-trip-id="PLT0Tc1ybgN295oCg20241015"
                  >
                    <i className="fa fa-search mr-2" aria-hidden="true" />
                    Kiểm tra mã
                  </button>
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
                  <button
                    type="submit"
                    className={styles.text_right}
                    onClick={handleContinue}
                  >
                    {/* Tiếp tục{" "}
                    <i className="fa fa-arrow-right" aria-hidden="true" /> */}
                    <a href="/methodPayment" style={{ color: "#fff" }}>
                      Tiếp tục
                    </a>
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

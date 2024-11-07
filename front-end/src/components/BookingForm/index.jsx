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
  const [specificAddress, setSpecificAddress] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [reset, setReset] = useState(false);
  const [address, setAddress] = useState("");

  const handleSpecificAddressChange = (event) => {
    setSpecificAddress(event.target.value);
  };

  const updateAddressValue = () => {
    const newAddress = `${specificAddress} ${
      ward ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},` : ""
    } ${
      district
        ? `${
            districts?.find((item) => item.district_id === district)
              ?.district_name
          },`
        : ""
    } ${
      province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : ""
    }`;
    setAddress(newAddress);
  };

  useEffect(() => {
    updateAddressValue();
  }, [specificAddress, ward, district, province]);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);
  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);
  useEffect(() => {
    setWard(null);
    const fetchPublicWard = async () => {
      const response = await apiGetPublicWard(district);
      if (response.status === 200) {
        setWards(response.data?.results);
      }
    };
    district && fetchPublicWard();
    !district ? setReset(true) : setReset(false);
    !district && setWards([]);
  }, [district]);
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
          <input
            style={{ width: "30%" }}
            data-action="useEmail"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            defaultChecked=""
            type="checkbox"
            name="useEmail"
            defaultValue=""
          />
          <label
            htmlFor="useEmail"
            className="d-block"
            style={{ width: "60%" }}
          >
            Gửi vé cho tôi qua email
          </label>
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
              // onChange={handleSpecificAddressChange}
              placeholder="Nhập địa chỉ đón"
              style={{ width: "100%" }}
            />

            <div className="row">
              <div className="col-md-12 form-group ">
                <SellectAddress
                  type="province"
                  value={province}
                  setValue={setProvince}
                  options={provinces}
                  label="Province/City(Tỉnh)"
                />
              </div>
              <div className="col-md-12 form-group">
                <SellectAddress
                  reset={reset}
                  type="district"
                  value={district}
                  setValue={setDistrict}
                  options={districts}
                  label="District(Quận)"
                />
              </div>
              <div className="col-md-12 form-group">
                <SellectAddress
                  reset={reset}
                  type="ward"
                  value={ward}
                  setValue={setWard}
                  options={wards}
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
              className="form-control"
              placeholder="Nhập địa chỉ trả"
              style={{ width: "100%" }}
            />
            <div className="row">
              <div className="col-md-12 form-group ">
                <SellectAddress
                  type="province"
                  value={province}
                  setValue={setProvince}
                  options={provinces}
                  label="Province/City(Tỉnh)"
                />
              </div>
              <div className="col-md-12 form-group">
                <SellectAddress
                  reset={reset}
                  type="district"
                  value={district}
                  setValue={setDistrict}
                  options={districts}
                  label="District(Quận)"
                />
              </div>
              <div className="col-md-12 form-group">
                <SellectAddress
                  reset={reset}
                  type="ward"
                  value={ward}
                  setValue={setWard}
                  options={wards}
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

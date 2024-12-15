import React, { useEffect, useState } from "react";
import styles from "components/bookingTicket.module.css";
import SellectAddress from "components/SellectAddress";

import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "services/app";

const BookingFormMobile = () => {
  // Infor user
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  //
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
      console.log("««««« responseProvince »»»»»", response);
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
    <div
      className={
        styles.bookingPage__mobile__tickets__item__collapse__booking__user
      }
      id="userInfoPLT0Tc1ybgN295oCg20241015"
      data-tab-content="userInfo"
    >
      <h4>
        <span
          data-action="toggleTab"
          data-trip-id="PLT0Tc1ybgN295oCg20241015"
          className="avicon icon-arrow-left"
        />
        Thông tin khách hàng
      </h4>
      <form
        data-form-trip-id="PLT0Tc1ybgN295oCg20241015"
        data-trip-choosableseat={1}
        method="POST"
      >
        <div className={styles.form_group}>
          <label htmlFor="">Ghế đã chọn</label>
          <div data-content="listSeat" className="list-seat">
            <span style={{ visibility: "hidden" }}>00</span>
          </div>
          <label htmlFor="seat_selected" className="error" />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="">Tổng tiền</label>
          <div>
            <span data-content="totalPrice">0</span>đ
          </div>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="">Họ tên</label>
          <input
            type="text"
            name="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label htmlFor="full_name" className="error" />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            defaultValue=""
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label htmlFor="phone" className="error" />
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
            Email: <span className={styles.text_danger}>*</span>
          </label>
          <input
            type="text"
            name="email"
            defaultValue=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="error" />
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
          <label htmlFor="pointUp" className="error" />
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
          <label htmlFor="pointDown" className="error" />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="">Mã khuyến mãi</label>
          <input
            type="text"
            name="promotionCode"
            placeholder=""
            defaultValue=""
          />
        </div>
        <div className="text-right">
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
        <div className="order-summary">
          <div>
            <p>
              Ghế: <span data-content="listSeat" className="list-seat" />
            </p>
            <h4>
              <span data-content="totalPrice">0</span>đ{" "}
            </h4>
          </div>
          <button
            type="submit"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            className="js__toggleProcessBooking-mobile"
          >
            Tiếp tục <i className="fa fa-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};
export default BookingFormMobile;

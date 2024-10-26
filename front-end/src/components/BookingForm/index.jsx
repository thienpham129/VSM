// BookingForm.js
import React from "react";
import styles from "components/bookingTicket.module.css";

function BookingForm({ selectedSeats, totalPrice }) {
  return (
    <div
    className={
      styles.bookingPage__tickets__item__collapse__booking__user
    }
  >
    <div
      className={
        styles.bookingPage__tickets__item__collapse__booking__title
      }
    >
      <h3>
        SG: 35 Sài Gòn{" "}
        <span className="avicon icon-arrow-right" /> QN: 1 Quy
        Nhơn
      </h3>
      <p>19:00 - 15/10/2024</p>
    </div>
    <form
      method="POST"
      data-trip-choosableseat={1}
      data-form-trip-id="PLT0Tc1ybgN295oCg20241015"
    >
      <div
        className="d-none"
        data-content="additionPriceForUserType"
      />
      
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
          Số điện thoại:{" "}
          <span className={styles.text_danger}>*</span>
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
          <select
            className="form-control"
            name="pointUp_type"
            data-action="switchAddress"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            data-target="pointUp"
          >
            <option value={0} selected="">
              Tại bến
            </option>
          </select>
          <textarea
            className="form-control"
            style={{ display: "none" }}
            required=""
            placeholder="Nhập địa chỉ đón"
            name="pointUp_address"
            defaultValue={""}
          />
          <select
            name="pointUp"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            style={{ display: "block" }}
          >
            <option
              value="P0Tc1ybg01lyUen"
              data-point-tsprice={0}
            >
              SG: 35 Sài Gòn
            </option>
          </select>
        </div>
        <label htmlFor="pointUp" className={styles.error} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="">
          Điểm đến: <span className={styles.text_danger}>*</span>
        </label>
        <div className={styles.point_wrap}>
          <select
            className="form-control"
            name="pointDown_type"
            data-action="switchAddress"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            data-target="pointDown"
          >
            <option value={0} selected="">
              Tại bến
            </option>
            <option value={1}>Taị nhà</option>
          </select>
          <textarea
            className="form-control"
            required=""
            placeholder="Nhập địa chỉ trả"
            name="pointDown_address"
            style={{ display: "none" }}
            defaultValue={""}
          />
          <select
            name="pointDown"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            style={{ display: "block" }}
          >
            <option
              value="P0DA1s69pNKi9jG"
              data-point-tsprice={0}
            >
              QN: 1 Quy Nhơn
            </option>
          </select>
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

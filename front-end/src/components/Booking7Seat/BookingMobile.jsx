import React from "react";
import styles from "pages/bookingTicket.module.css";

const BookingSeatSevenMobile = () => {
  return (
    // <span className={`${styles.container} ${styles.mobile_wrap}`}>

    <div className={`${styles.bookingPage__mobile} ${styles.bookingPage__mobile}`}>
      <div className={styles.bookingPage__banner} />
      <div className="container-fulll">
        <div className={styles.container}>
          <div
            className={`${styles.bookingPage__search__wrap} ${styles.mobile_wrap}`}
            id="js-SearchTicketMobile"
          >
            {/*TC0Cm1rweVdinjJi*/}
            {/*3658*/}
            <div className={styles.searchTicket}>
              <div className={styles.searchTicket__item}>
                <div className={styles.searchTicket__item__left}>
                  <span className={`${styles.avicon} ${styles.iconsvg}`}>
                    <svg
                      width={14}
                      height={20}
                      viewBox="0 0 14 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 0C3.13 0 0 3.13 0 7C0 11.17 4.42 16.92 6.24 19.11C6.64 19.59 7.37 19.59 7.77 19.11C9.58 16.92 14 11.17 14 7C14 3.13 10.87 0 7 0ZM7 9.5C6.33696 9.5 5.70107 9.23661 5.23223 8.76777C4.76339 8.29893 4.5 7.66304 4.5 7C4.5 6.33696 4.76339 5.70107 5.23223 5.23223C5.70107 4.76339 6.33696 4.5 7 4.5C7.66304 4.5 8.29893 4.76339 8.76777 5.23223C9.23661 5.70107 9.5 6.33696 9.5 7C9.5 7.66304 9.23661 8.29893 8.76777 8.76777C8.29893 9.23661 7.66304 9.5 7 9.5Z"
                        fill="#FFA000"
                      />
                    </svg>
                  </span>
                </div>
                <div className={styles.searchTicket__item__right}>
                  <span className={styles.searchTicket__item__title}>
                    Điểm đi
                  </span>
                  <h3 data-point-target="pointUp" />
                  <select className={styles.pointUp} id="searchPointUp">
                    <option value="">Chọn điểm lên</option>
                    <optgroup label="Quảng Ngãi">
                      <option
                        value="P0DA1s69pNKi9jG"
                        data-route-id="R0U11yleLOCho9m,R0Tu1yipwtweLFh,R0DB1s6ShKApv4w,R0U11yleMeCbGpm,R0DB1s6Tt7KMXT6,R0Tu1yiptmYVave,R0DA1s6Bu8rN9mg,R0NY1wD4MMlyUEQ,R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO,R0NY1wD4LJD2IxB,R0DA1s6C94QCePS,R0DA1s6Bk8LFiei,R0DB1s6UOpGDcXh"
                      >
                        QN: 1 Quảng Ngãi
                      </option>
                    </optgroup>
                    <optgroup label="Đà Nẵng">
                      <option
                        value="P0DA1s6Auxag0uB"
                        data-route-id="R0U11yleLOCho9m,R0DB1s6ShKApv4w,R0U11yleMeCbGpm,R0DB1s6Tt7KMXT6,R0DA1s6Bu8rN9mg,R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO,R0DB1s6UOpGDcXh"
                      >
                        ĐN: 21 Đà Nẵng
                      </option>
                    </optgroup>
                    <optgroup label="Quảng Bình">
                      <option
                        value="P0Tc1ybg01lyUen"
                        data-route-id="R0Tu1yipwtweLFh,R0Tu1yiptmYVave,R0NY1wD4MMlyUEQ,R0NY1wD4LJD2IxB"
                      >
                        ĐH: 35 Đồng Hới
                      </option>
                    </optgroup>
                    <optgroup label="Thừa Thiên Huế">
                      <option
                        value="P0Qo1xUqqNc4L8S"
                        data-route-id="R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO"
                      >
                        H: 28 Huế
                      </option>
                    </optgroup>
                    <optgroup label="Kon Tum">
                      <option
                        value="P0DA1s6AOKJthPd"
                        data-route-id="R0DA1s6C94QCePS,R0DA1s6Bk8LFiei"
                      >
                        KT: 33 Kon Tum
                      </option>
                    </optgroup>
                    <optgroup label="Quảng Trị">
                      <option
                        value="P0DA1s6AOKJthPd"
                        data-route-id="R0DA1s6C94QCePS,R0DA1s6Bk8LFiei"
                      >
                        QT: 33 Quảng Trị
                      </option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className={styles.searchTicket__item}>
                <div className={styles.searchTicket__item__left}>
                  <span className={`${styles.avicon} ${styles.iconsvg}`}>
                    <svg
                      width={14}
                      height={20}
                      viewBox="0 0 14 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 0C3.13 0 0 3.13 0 7C0 11.17 4.42 16.92 6.24 19.11C6.64 19.59 7.37 19.59 7.77 19.11C9.58 16.92 14 11.17 14 7C14 3.13 10.87 0 7 0ZM7 9.5C6.33696 9.5 5.70107 9.23661 5.23223 8.76777C4.76339 8.29893 4.5 7.66304 4.5 7C4.5 6.33696 4.76339 5.70107 5.23223 5.23223C5.70107 4.76339 6.33696 4.5 7 4.5C7.66304 4.5 8.29893 4.76339 8.76777 5.23223C9.23661 5.70107 9.5 6.33696 9.5 7C9.5 7.66304 9.23661 8.29893 8.76777 8.76777C8.29893 9.23661 7.66304 9.5 7 9.5Z"
                        fill="#FFA000"
                      />
                    </svg>
                  </span>
                </div>
                <div className={styles.searchTicket__item__right}>
                  <span className={styles.searchTicket__item__title}>
                    Điểm đến
                  </span>
                  <h3 data-point-target="pointDown" />
                  <select className={styles.pointDown} id="searchPointDown">
                    <option value="">Chọn điểm đến</option>
                    <optgroup label="Kon Tum">
                      <option
                        value="P0DA1s6AOKJthPd"
                        data-route-id="R0DA1s6C94QCePS,R0DA1s6Bk8LFiei"
                      >
                        KT: 33 Kon Tum
                      </option>
                    </optgroup>
                    <optgroup label="Thừa Thiên Huế">
                      <option
                        value="P0Qo1xUqqNc4L8S"
                        data-route-id="R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO"
                      >
                        H: 28 Huế
                      </option>
                    </optgroup>
                    <optgroup label="Quảng Bình">
                      <option
                        value="P0Tc1ybg01lyUen"
                        data-route-id="R0Tu1yipwtweLFh,R0Tu1yiptmYVave,R0NY1wD4MMlyUEQ,R0NY1wD4LJD2IxB"
                      >
                        ĐH: 35 Đồng Hới
                      </option>
                    </optgroup>
                    <optgroup label="Đà Nẵng">
                      <option
                        value="P0DA1s6Auxag0uB"
                        data-route-id="R0U11yleLOCho9m,R0DB1s6ShKApv4w,R0U11yleMeCbGpm,R0DB1s6Tt7KMXT6,R0DA1s6Bu8rN9mg,R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO,R0DB1s6UOpGDcXh"
                      >
                        ĐN: 21 Đà Nẵng
                      </option>
                    </optgroup>
                    <optgroup label="Quảng Ngãi">
                      <option
                        value="P0DA1s69pNKi9jG"
                        data-route-id="R0U11yleLOCho9m,R0Tu1yipwtweLFh,R0DB1s6ShKApv4w,R0U11yleMeCbGpm,R0DB1s6Tt7KMXT6,R0Tu1yiptmYVave,R0DA1s6Bu8rN9mg,R0NY1wD4MMlyUEQ,R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO,R0NY1wD4LJD2IxB,R0DA1s6C94QCePS,R0DA1s6Bk8LFiei,R0DB1s6UOpGDcXh"
                      >
                        QN: 1 Quảng Ngãi
                      </option>
                    </optgroup>
                    <optgroup label="Quảng Trị">
                      <option
                        value="P0DA1s69pNKi9jG"
                        data-route-id="R0U11yleLOCho9m,R0Tu1yipwtweLFh,R0DB1s6ShKApv4w,R0U11yleMeCbGpm,R0DB1s6Tt7KMXT6,R0Tu1yiptmYVave,R0DA1s6Bu8rN9mg,R0NY1wD4MMlyUEQ,R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO,R0NY1wD4LJD2IxB,R0DA1s6C94QCePS,R0DA1s6Bk8LFiei,R0DB1s6UOpGDcXh"
                      >
                        QT: 1 Quảng Trị
                      </option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className={styles.searchTicket__item}>
                <div className={styles.searchTicket__item__left}>
                  <span className={`${styles.avicon} ${styles.iconsvg}`}>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 12H17V18H11V12Z" fill="#FFA000" />
                      <path
                        d="M19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22H19C20.103 22 21 21.103 21 20V6C21 4.897 20.103 4 19 4ZM19.001 20H5V8H19L19.001 20Z"
                        fill="#FFA000"
                      />
                    </svg>
                  </span>
                </div>
                <div className={styles.searchTicket__item__right}>
                  <span className={styles.searchTicket__item__title}>
                    Ngày khởi hành
                  </span>
                  {/* <input className={styles.ticket_date} readOnly="readOnly" /> */}
                  <input className={styles.ticket_date} type="date" />
                </div>
              </div>
            </div>
            <div className="bookingPage__search__triggle mobile">
              <a href="javascript:;" data-action="searchTrip">
                <i className="fa fa-search" aria-hidden="true" />
                Tìm chuyến{" "}
              </a>
            </div>
          </div>
        </div>
        {/* <div className="bookingPage--mobile__head" style={{ display: "none" }}>
          <div className="bookingPage--mobile__head__thumb">
            <a href="javascript:;" data-action="back">
              <span className="avicon icon-arrow-left" />
            </a>
            <div>
              <h3>
                SG: 35 Sài Gòn
                <span className="avicon icon-arrow-right" /> QN: 1 Quy Nhơn
              </h3>
              <p>
                <span>15/10/2024 - Mọi khung giờ</span>
              </p>
            </div>
          </div>
        </div> */}
        <div className="bookingPage--mobile__step">
          <span>Chọn chỗ</span>
          <span>Thanh toán</span>
          <span>Hoàn thành</span>
        </div>
        <div className="bookingPage--mobile__sort  d-none">
          <h4>Sắp xếp</h4>
          <p>
            Thời gian khởi hành <span className="avicon icon-arrow-top" />
          </p>
        </div>
        <div className="bookingPage--mobile__content">
          <div
            className="bookingPage--mobile__item allowBook"
            data-wrap-trip="PLT0Tc1ybgN295oCg20241015"
            id="mtrip-PLT0Tc1ybgN295oCg20241015-0"
          >
            <div
              className="bookingPage--mobile__item__thumb js--toggleCreateMapMobile"
              data-toggle="collapse"
              data-trip-id="PLT0Tc1ybgN295oCg20241015"
              data-parent="#mtrip-PLT0Tc1ybgN295oCg20241015-0"
              href="#mcollapse--bookingPLT0Tc1ybgN295oCg20241015-0"
            >
              <div className="bookingPage--mobile__item__thumb__line">
                <h3>
                  <span>19 : 00</span>
                  <p>SG: 35 Sài Gòn</p>
                </h3>
                <h4>
                  <span>500,000 </span>
                </h4>
              </div>
              <div className="bookingPage--mobile__item__thumb__line">
                <h3>
                  <span style={{ visibility: "hidden" }}>--:--</span>
                  <p>
                    QN: 1 Quy Nhơn <br /> <b className="d-none" />{" "}
                  </p>
                </h3>
                <p>
                  14 chỗ trống <br />{" "}
                  <b className="bookingPage--mobile__item__toggle-detail">
                    Giường nằm limousine{" "}
                    <span className="avicon icon-caret-down-bg" />{" "}
                  </b>
                </p>
              </div>
            </div>
            <div
              className="bookingPage--mobile__item__collapse__booking collapse"
              id="mcollapse--bookingPLT0Tc1ybgN295oCg20241015-0"
            >
              <div
                className="bookingPage--mobile__tickets__item__collapse__booking__seat-map"
                data-tab-content="seatMap"
              >
                <div className="bookingPage--mobile__tickets__item__collapse__booking__seat-map__note">
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
                <div className="bookingPage--mobile__tickets__item__collapse__booking__seat-map__floor">
                  <h4>Tầng 1</h4>
                  <table le="" className="avseatmap">
                    <tbody>
                      <tr>
                        <td
                          className="avseat"
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
                          <span className="showSeatId">TAI</span>
                        </td>
                        <td />
                        <td />
                        <td />
                        <td
                          className="avseat"
                          data-seat-price={0}
                          data-extra-price={0}
                          data-trip-id="PLT0Tc1ybgN295oCg20241015"
                          data-seat-status="none"
                          data-seat-col={3}
                          data-seat-row={1}
                          data-seat-type={4}
                          data-seat-floor={1}
                          data-seat-id="A1"
                          title="A1"
                          data-seatmap-id="SM0Tc1ybgBNa7yys"
                        >
                          <div className="avicon icon-seat-empty" />
                          <span className="showSeatId">A1</span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="avseat"
                          data-seat-price={0}
                          data-extra-price={0}
                          data-trip-id="PLT0Tc1ybgN295oCg20241015"
                          data-seat-status="none"
                          data-seat-col={1}
                          data-seat-row={2}
                          data-seat-type={4}
                          data-seat-floor={1}
                          data-seat-id="A2"
                          title="A2"
                          data-seatmap-id="SM0Tc1ybgBNa7yys"
                        >
                          <div className="avicon icon-seat-empty" />
                          <span className="showSeatId">A2</span>
                        </td>
                        <td />
                        <td
                          className="avseat"
                          data-seat-price={0}
                          data-extra-price={0}
                          data-trip-id="PLT0Tc1ybgN295oCg20241015"
                          data-seat-status="none"
                          data-seat-col={3}
                          data-seat-row={3}
                          data-seat-type={4}
                          data-seat-floor={1}
                          data-seat-id="A3"
                          title="A3"
                          data-seatmap-id="SM0Tc1ybgBNa7yys"
                        >
                          <div className="avicon icon-seat-empty" />
                          <span className="showSeatId">A3</span>
                        </td>
                        <td />
                        <td
                          className="avseat"
                          data-seat-price={0}
                          data-extra-price={0}
                          data-trip-id="PLT0Tc1ybgN295oCg20241015"
                          data-seat-status="none"
                          data-seat-col={3}
                          data-seat-row={3}
                          data-seat-type={4}
                          data-seat-floor={1}
                          data-seat-id="A4"
                          title="A4"
                          data-seatmap-id="SM0Tc1ybgBNa7yys"
                        >
                          <div className="avicon icon-seat-empty" />
                          <span className="showSeatId">A4</span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="avseat"
                          data-seat-price={0}
                          data-extra-price={0}
                          data-trip-id="PLT0Tc1ybgN295oCg20241015"
                          data-seat-status="none"
                          data-seat-col={1}
                          data-seat-row={3}
                          data-seat-type={4}
                          data-seat-floor={1}
                          data-seat-id="A5"
                          title="A5"
                          data-seatmap-id="SM0Tc1ybgBNa7yys"
                        >
                          <div className="avicon icon-seat-empty" />
                          <span className="showSeatId">A5</span>
                        </td>
                        <td />
                        <td
                          className="avseat"
                          data-seat-price={0}
                          data-extra-price={0}
                          data-trip-id="PLT0Tc1ybgN295oCg20241015"
                          data-seat-status="none"
                          data-seat-col={2}
                          data-seat-row={3}
                          data-seat-type={4}
                          data-seat-floor={1}
                          data-seat-id="A6"
                          title="A6"
                          data-seatmap-id="SM0Tc1ybgBNa7yys"
                        >
                          <div className="avicon icon-seat-empty" />
                          <span className="showSeatId">A6</span>
                        </td>
                        <td />
                        <td
                          className="avseat"
                          data-seat-price={0}
                          data-extra-price={0}
                          data-trip-id="PLT0Tc1ybgN295oCg20241015"
                          data-seat-status="none"
                          data-seat-col={3}
                          data-seat-row={3}
                          data-seat-type={4}
                          data-seat-floor={1}
                          data-seat-id="A7"
                          title="A7"
                          data-seatmap-id="SM0Tc1ybgBNa7yys"
                        >
                          <div className="avicon icon-seat-empty" />
                          <span className="showSeatId">A7</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bookingPage--mobile__tickets__item__collapse__booking__seat-map__total">
                  <p>
                    <span>
                      Ghế:{" "}
                      <span data-content="listSeat" className="list-seat" />
                    </span>
                    <span>
                      <span data-content="totalPrice">0</span>đ
                    </span>
                  </p>
                  <a
                    href="javascript:;"
                    data-action="toggleTab"
                    data-trip-id="PLT0Tc1ybgN295oCg20241015"
                  >
                    Xác nhận đặt{" "}
                    <i className="fa fa-arrow-right" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div
                className="bookingPage--mobile__tickets__item__collapse__booking__user"
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
                  action="/index.php?mod=datve&page=datve&sub=preBooking"
                  data-form-trip-id="PLT0Tc1ybgN295oCg20241015"
                  data-trip-choosableseat={1}
                  method="POST"
                >
                  <input type="hidden" name="seat_selected" />
                  <input
                    type="hidden"
                    name="tripId"
                    defaultValue="PLT0Tc1ybgN295oCg20241015"
                  />
                  <input type="hidden" name="price" />
                  <input type="hidden" name="priceNotPromo" />
                  <input type="hidden" name="pricePromo" />
                  <input
                    type="hidden"
                    name="routeId"
                    defaultValue="R0NY1wD4MMlyUEQ"
                  />
                  <input
                    type="hidden"
                    name="base_price"
                    defaultValue={500000}
                  />
                  <input
                    type="hidden"
                    name="getInTimePlan"
                    defaultValue={1728993600000}
                  />
                  <input type="hidden" name="extraPrice" defaultValue="" />
                  <input type="hidden" name="extraPriceType" defaultValue="" />
                  <input type="hidden" name="extraPriceName" defaultValue="" />
                  <input type="hidden" name="extraPriceId" defaultValue="" />
                  <input type="hidden" name="server_price" defaultValue={0} />
                  <input
                    type="hidden"
                    name="tripId"
                    defaultValue="PLT0Tc1ybgN295oCg20241015"
                  />
                  <div
                    className="d-none"
                    data-content="additionPriceForUserType"
                  />
                  <div className="form-group">
                    <label htmlFor="">Ghế đã chọn</label>
                    <div data-content="listSeat" className="list-seat">
                      <span style={{ visibility: "hidden" }}>00</span>
                    </div>
                    <label htmlFor="seat_selected" className="error" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Tổng tiền</label>
                    <div>
                      <span data-content="totalPrice">0</span>đ
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Họ tên</label>
                    <input type="text" name="full_name" />
                    <label htmlFor="full_name" className="error" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text" name="phone" defaultValue="" />
                    <label htmlFor="phone" className="error" />
                  </div>
                  <div className="form-group useEmail">
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
                  <div className="form-group" data-content="email">
                    <label htmlFor="">
                      Email: <span className="text-danger">*</span>
                    </label>
                    <input type="text" name="email" defaultValue="" />
                    <label htmlFor="email" className="error" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Ghi chú</label>
                    <textarea
                      name="note"
                      className="form-control"
                      defaultValue={""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      Điểm đi: <span className="text-danger">*</span>
                    </label>
                    <div className="point_wrap">
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
                        placeholder="Nhập địa chỉ"
                        name="pointUp_address"
                        defaultValue={""}
                      />
                      <select
                        name="pointUp"
                        style={{ display: "block" }}
                        data-trip-id="PLT0Tc1ybgN295oCg20241015"
                      >
                        <option value="P0Tc1ybg01lyUen" data-point-tsprice={0}>
                          SG: 35 Sài Gòn
                        </option>
                      </select>
                    </div>
                    <label htmlFor="pointUp" className="error" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      Điểm đến: <span className="text-danger">*</span>
                    </label>
                    <div className="point_wrap">
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
                        style={{ display: "none" }}
                        required=""
                        placeholder="Nhập địa chỉ"
                        name="pointDown_address"
                        defaultValue={""}
                      />
                      <select
                        name="pointDown"
                        style={{ display: "block" }}
                        data-trip-id="PLT0Tc1ybgN295oCg20241015"
                      >
                        <option value="P0DA1s69pNKi9jG" data-point-tsprice={0}>
                          QN: 1 Quy Nhơn
                        </option>
                      </select>
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
                        Ghế:{" "}
                        <span data-content="listSeat" className="list-seat" />
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
                      Tiếp tục{" "}
                      <i className="fa fa-arrow-right" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSeatSevenMobile;

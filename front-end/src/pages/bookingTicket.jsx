import React from "react";
import styles from "pages/bookingTicket.module.css";

const BookingTicket = () => {
  return (
    <div className="no-bottom no-top zebra" id="content">
      <section id="subheader" className="jarallax text-light">
        <img
          src="images/background/subheader.jpg"
          className="jarallax-img"
          alt=""
        />
      </section>
      <section className={styles.bookingPage}>
        {/* <div className={styles.bookingPage__banner} /> */}
        <div className={styles.bookingPage__search}>
          <div className={styles.container}>
            <div
              className={styles.bookingPage__search__wrap}
              id="js-SearchTicket"
            >
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
                      <optgroup label="Bình Định">
                        <option
                          value="P0DA1s69pNKi9jG"
                          data-route-id="R0U11yleLOCho9m,R0Tu1yipwtweLFh,R0DB1s6ShKApv4w,R0U11yleMeCbGpm,R0DB1s6Tt7KMXT6,R0Tu1yiptmYVave,R0DA1s6Bu8rN9mg,R0NY1wD4MMlyUEQ,R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO,R0NY1wD4LJD2IxB,R0DA1s6C94QCePS,R0DA1s6Bk8LFiei,R0DB1s6UOpGDcXh"
                        >
                          QN: 1 Quy Nhơn
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
                      <optgroup label="Hồ Chí Minh">
                        <option
                          value="P0Tc1ybg01lyUen"
                          data-route-id="R0Tu1yipwtweLFh,R0Tu1yiptmYVave,R0NY1wD4MMlyUEQ,R0NY1wD4LJD2IxB"
                        >
                          SG: 35 Sài Gòn
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
                      <optgroup label="Khánh Hòa">
                        <option
                          value="P0DA1s6AOKJthPd"
                          data-route-id="R0DA1s6C94QCePS,R0DA1s6Bk8LFiei"
                        >
                          NT: 33 Nha Trang
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
                      <optgroup label="Khánh Hòa">
                        <option
                          value="P0DA1s6AOKJthPd"
                          data-route-id="R0DA1s6C94QCePS,R0DA1s6Bk8LFiei"
                        >
                          NT: 33 Nha Trang
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
                      <optgroup label="Hồ Chí Minh">
                        <option
                          value="P0Tc1ybg01lyUen"
                          data-route-id="R0Tu1yipwtweLFh,R0Tu1yiptmYVave,R0NY1wD4MMlyUEQ,R0NY1wD4LJD2IxB"
                        >
                          SG: 35 Sài Gòn
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
                      <optgroup label="Bình Định">
                        <option
                          value="P0DA1s69pNKi9jG"
                          data-route-id="R0U11yleLOCho9m,R0Tu1yipwtweLFh,R0DB1s6ShKApv4w,R0U11yleMeCbGpm,R0DB1s6Tt7KMXT6,R0Tu1yiptmYVave,R0DA1s6Bu8rN9mg,R0NY1wD4MMlyUEQ,R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO,R0NY1wD4LJD2IxB,R0DA1s6C94QCePS,R0DA1s6Bk8LFiei,R0DB1s6UOpGDcXh"
                        >
                          QN: 1 Quy Nhơn
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
                    <input className={styles.ticket_date} readOnly="readOnly" />
                  </div>
                </div>
              </div>
              <div className={styles.bookingPage__search__triggle}>
                <a href="javascript:;" data-action="searchTrip">
                  <i className="fa fa-search" aria-hidden="true" /> Tìm chuyến
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bookingPage__step}>
          <div className={styles.container}>
            <div className={styles.bookingPage__step__wrap}>
              <div
                className={`${styles.bookingPage__step__item} ${styles.active}`}
              >
                <span>Chọn chỗ</span>
              </div>
              <div className={styles.bookingPage__step__item}>
                <span>Thanh toán</span>
              </div>
              <div className={styles.bookingPage__step__item}>
                <span>Hoàn thành</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bookingPage__sort}>
          <div className={styles.container}>
            <div
              className={`${styles.bookingPage__sort__wrap} ${styles.d_none}`}
              id="js--bookingPage__sort"
            >
              <h3>Sắp xếp</h3>
              <p
                data-action="sort"
                data-wrap="#js--bookingPage__sort"
                data-filter="sortTime"
                data-value="asc"
              >
                Thời gian khởi hành <span className="avicon icon-arrow-top " />
              </p>
              <p>
                Số ghế trống <span className="avicon icon-arrow-top" />
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${styles.bookingPage__tickets} ${styles.js__booking__destop}`}
        >
          <div className={styles.container}>
            <div className={styles.bookingPage__tickets__wrap}>
              <div
                className={`${styles.bookingPage__tickets__item} ${styles.allowBook}`}
                data-wrap-trip="PLT0Tc1ybgN295oCg20241015"
                id="tripPLT0Tc1ybgN295oCg20241015"
              >
                <div className={styles.bookingPage__tickets__item__thumb}>
                  <div
                    className={styles.bookingPage__tickets__item__thumb__time}
                  >
                    {/* <span className="avicon icon-clock" /> */}
                    {/* {`${styles.bookingPage__tickets__item} ${styles.allowBook}`} */}
                    <div className={styles.times}>
                      <h3>19 : 00</h3>
                    </div>
                  </div>
                  <div
                    className={styles.bookingPage__tickets__item__thumb__route}
                  >
                    <span className="avicon icon-bus" />
                    <div className={styles.route}>
                      <h3 className={styles.showAsPoint}>
                        SG: 35 Sài Gòn <i className="avicon icon-arrow-right" />{" "}
                        QN: 1 Quy Nhơn
                      </h3>
                      <h3 className={styles.showAsRoute}>
                        Sài Gòn - Quy Nhơn (24P Vip)
                      </h3>
                      <a
                        className="d-block"
                        data-toggle="collapse"
                        data-parent="#tripPLT0Tc1ybgN295oCg20241015"
                        href="#collapse--list-routePLT0Tc1ybgN295oCg20241015"
                      >
                        Danh sách điểm đón/trả
                      </a>
                    </div>
                  </div>
                  <div
                    className={styles.bookingPage__tickets__item__thumb__seat}
                  >
                    <span className="avicon icon-chair" />
                    <div className={styles.seat}>
                      <h3>
                        <b
                          data-content="totalEmptySeat"
                          data-seat-empty={14}
                          data-trip-id="PLT0Tc1ybgN295oCg20241015"
                          data-seatmap-id="SM0Tc1ybgBNa7yys"
                        >
                          14
                        </b>{" "}
                        chỗ trống
                      </h3>
                      <span>Giường nằm limousine</span>
                    </div>
                  </div>
                  <div
                    className={styles.bookingPage__tickets__item__thumb__price}
                  >
                    <span> 500,000</span>
                  </div>
                  <div
                    className={
                      styles.bookingPage__tickets__item__thumb__view_button
                    }
                  >
                    <a
                      className="js--toggleCreateMap"
                      data-trip-id="PLT0Tc1ybgN295oCg20241015"
                      href="#collapse--booking-ticketPLT0Tc1ybgN295oCg20241015"
                      data-parent="#tripPLT0Tc1ybgN295oCg20241015"
                      data-toggle="collapse"
                    >
                      Chọn chỗ
                    </a>
                  </div>
                </div>
                <div className={styles.bookingPage__tickets__item__collapse}>
                  <div
                    className={
                      styles.bookingPage__tickets__item__collapse__list_point__wrap
                    }
                    collapse
                    data-parent="#tripPLT0Tc1ybgN295oCg20241015"
                    id="collapse--list-routePLT0Tc1ybgN295oCg20241015"
                  >
                    <span className="avicon icon-caret-top" />
                    {/* <div className={styles.bookingPage__tickets__item__collapse__list_point}>
                    <div className={styles.bookingPage__tickets__item__collapse__list_point__part}>
                      <h3>Điểm đi</h3>
                      <div className={styles.bookingPage__tickets__item__collapse__list_point__part__content}>
                        <div className={styles.bookingPage__tickets__item__collapse__list_point__item}>
                          <span className="icon-dot" />
                          <ul>
                            <li>
                              <span style={{ lineHeight: 25 }}>
                                SG: 35 Sài Gòn
                              </span>
                              <span style={{ lineHeight: 25 }}>19:00</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className={styles.bookingPage__tickets__item__collapse__list_point__part}>
                      <h3>Điểm đến</h3>
                      <div className={styles.bookingPage__tickets__item__collapse__list_point__part__content}>
                        <div className={styles.bookingPage__tickets__item__collapse__list_point__item}>
                          <span className="icon-dot" />
                          <ul>
                            <li>
                              <span style={{ lineHeight: 25 }}>
                                QN: 1 Quy Nhơn
                              </span>
                              <span style={{ lineHeight: 25 }}>07:00</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  </div>
                  <div
                    className={
                      styles.bookingPage__tickets__item__collapse__booking
                    }
                    collapse
                    data-parent="#tripPLT0Tc1ybgN295oCg20241015"
                    id="collapse--booking-ticketPLT0Tc1ybgN295oCg20241015"
                  >
                    <div
                      className={
                        styles.bookingPage__tickets__item__collapse__booking__seat_map
                      }
                    >
                      <div
                        className={
                          styles.bookingPage__tickets__item__collapse__booking__seat_map__floor
                        }
                      >
                        <h4>Tầng 1</h4>
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
                              <td />
                              <td />
                              <td
                                className={styles.avseat}
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
                                <span className={styles.showSeatId}>A1</span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                className={styles.avseat}
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
                                <span className={styles.showSeatId}>A2</span>
                              </td>
                              <td />
                              <td
                                className={styles.avseat}
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
                                <span className={styles.showSeatId}>A3</span>
                              </td>
                              <td />
                              <td
                                className={styles.avseat}
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
                                <span className={styles.showSeatId}>A4</span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                className={styles.avseat}
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
                                <span className={styles.showSeatId}>A5</span>
                              </td>
                              <td />
                              <td
                                className={styles.avseat}
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
                                <span className={styles.showSeatId}>A6</span>
                              </td>
                              <td />
                              <td
                                className={styles.avseat}
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
                                <span className={styles.showSeatId}>A7</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div
                        className={
                          styles.bookingPage__tickets__item__collapse__booking__seat_map__note
                        }
                      >
                        <p>
                          <span className="avicon icon-seat-empty" />
                          Ghế trống
                        </p>
                        <p>
                          <span className="avicon icon-seat-booked" />
                          Ghế đã đặt
                        </p>
                        <p>
                          <span className="avicon icon-seat-selected" />
                          Ghế đang chọn
                        </p>
                        <p>
                          <span className="avicon icon-seat-sold" />
                          Ghế đã bán
                        </p>
                        <p>
                          <span className="avicon icon-seat-not-sell" />
                          Ghế không bán
                        </p>
                      </div>
                    </div>
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
                        // m=""
                        action="/index.php?mod=datve&page=datve&sub=preBooking"
                        method="POST"
                        data-trip-choosableseat={1}
                        data-form-trip-id="PLT0Tc1ybgN295oCg20241015"
                      >
                        <input type="hidden" name="seat_selected" />
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
                        <input
                          type="hidden"
                          name="extraPrice"
                          defaultValue=""
                        />
                        <input
                          type="hidden"
                          name="extraPriceType"
                          defaultValue=""
                        />
                        <input
                          type="hidden"
                          name="extraPriceName"
                          defaultValue=""
                        />
                        <input
                          type="hidden"
                          name="extraPriceId"
                          defaultValue=""
                        />
                        <input
                          type="hidden"
                          name="server_price"
                          defaultValue={0}
                        />
                        <input
                          type="hidden"
                          name="tripId"
                          defaultValue="PLT0Tc1ybgN295oCg20241015"
                        />
                        <div
                          className="d-none"
                          data-content="additionPriceForUserType"
                        />
                        <div className={styles.form_group}>
                          <label htmlFor="">Ghế đã chọn</label>
                          <div
                            data-content="listSeat"
                            className={styles.list_seat}
                          >
                            <span style={{ visibility: "hidden" }}>a</span>
                          </div>
                        </div>
                        <label
                          htmlFor="seat_selected"
                          className={styles.error}
                        />
                        <div className={styles.form_group}>
                          <label htmlFor="">Tổng tiền</label>
                          <span className="total-monney">
                            <span data-content="totalPrice">0</span> đ
                          </span>
                        </div>
                        <div className={styles.form_group}>
                          <label htmlFor="">
                            Họ tên:{" "}
                            <span className={styles.text_danger}>*</span>
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
                        <div
                          className={`${styles.form_group} ${styles.useEmail}`}
                        >
                          {/* 
        className={`${styles.form_group} ${styles.useEmail}`}
                        
                        */}
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
                            Điểm đi:{" "}
                            <span className={styles.text_danger}>*</span>
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
                            Điểm đến:{" "}
                            <span className={styles.text_danger}>*</span>
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
                          <input
                            type="text"
                            name="promotionCode"
                            defaultValue=""
                          />
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
                            style={{marginRight: "10px"}}
                          >
                            <i
                              className="fa fa-search mr-2"
                              aria-hidden="true"
                            style={{paddingRight: "5px"}}

                            />
                            Kiểm tra mã
                          </button>
                          <button
                            type="button"
                            data-trip-id="PLT0Tc1ybgN295oCg20241015"
                            className="js__toggleProcessBooking"
                          >
                            <a href="/methodPayment" style={{color : "#fff"}}>Tiếp tục</a>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingTicket;

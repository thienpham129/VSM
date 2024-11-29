import React, { useState } from "react";
import styles from "pages/bookingTicket.module.css";
import BookingForm from "components/BookingForm";

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

const BookingTenTicket = () => {
  const ticketPrice = 150000; 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
                    {/* <input className={styles.ticket_date} readOnly="readOnly" /> */}
                    <input className={styles.ticket_date} type="date" />
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
                    <div className={styles.times}>
                      <h3>19 : 00</h3>
                    </div>
                  </div>
                  <div
                    className={styles.bookingPage__tickets__item__thumb__route}
                  >
                    <span className="avicon icon-bus" />
                    <div className={styles.route}>
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
                    <span> 150,000</span>
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
                    <BookingForm selectedSeats={selectedSeats} totalPrice={totalPrice} />
                    
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

export default BookingTenTicket;

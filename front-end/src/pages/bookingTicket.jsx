import React, { useState } from "react";
import styles from "pages/bookingTicket.module.css";
import BookingForm from "components/BookingForm";
import BookingSeatSevenMobile from "components/Booking7SeatMobile/BookingSeatSevenMobile";
import Schedule7Seat from "components/Schedule7Seat/Schedule7Seat";
import Schedule10Seat from "components/Schedule10Seat/Schedule10Seat";
import { useNavigate } from "react-router-dom";
import Schedule7SeatMobile from "components/Schedule7SeatMobile/Schedule7SeatMobile";
import { root } from "helper/axiosClient";
import Schedule10SeatMobile from "components/Schedule10SeatMobile/Schedule10SeatMobile";

const BookingTicket = () => {
  const [startLocation, setStartLocation] = useState("");
  const [stopLocation, setStopLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [schedules, setSchedules] = useState([]);

  const handleSearch = async () => {
    if (!startLocation || !stopLocation || !startTime) {
      alert("Vui lòng chọn đầy đủ thông tin!");
      return;
    }

    try {
      const response = await root.get(`/public/schedule/search`, {
        params: {
          startLocation,
          stopLocation,
          startTime,
        },
      });
      setSchedules(response.data);
      console.log("««««« response.data »»»»»", response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không tìm thấy lịch trình phù hợp.");
    }
  };
  console.log("««««« schedules »»»»»", schedules);

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
              // style={{backgroundColor : '#333'}}
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
                    {/* <select
                      className={styles.pointUp}
                      value={startLocation}
                      id="searchPointUp"
                      onChange={(e) => setStartLocation(e.target.value)}
                    >
                      <option value="">Chọn điểm đi</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Quảng Nam">Quảng Nam</option> */}
                    {/* <h3 data-point-target="pointUp" /> */}
                    <select
                      className={styles.pointUp}
                      value={startLocation}
                      id="searchPointUp"
                      onChange={(e) => setStartLocation(e.target.value)}
                    >
                      <option value="">Chọn điểm lên</option>
                      <optgroup label="Quảng Nam">
                        <option
                          value="Quảng Nam"
                          data-route-id="R0U11yleLOCho9m,R0Tu1yipwtweLFh,R0DB1s6ShKApv4w,R0U11yleMeCbGpm,R0DB1s6Tt7KMXT6,R0Tu1yiptmYVave,R0DA1s6Bu8rN9mg,R0NY1wD4MMlyUEQ,R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO,R0NY1wD4LJD2IxB,R0DA1s6C94QCePS,R0DA1s6Bk8LFiei,R0DB1s6UOpGDcXh"
                        >
                          QN: 1 Quảng Nam
                        </option>
                      </optgroup>
                      <optgroup label="Đà Nẵng">
                        <option
                          value="Đà Nẵng"
                          data-route-id="R0U11yleLOCho9m,R0DB1s6ShKApv4w,R0U11yleMeCbGpm,R0DB1s6Tt7KMXT6,R0DA1s6Bu8rN9mg,R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO,R0DB1s6UOpGDcXh"
                        >
                          ĐN: 21 Đà Nẵng
                        </option>
                      </optgroup>

                      <optgroup label="Thừa Thiên Huế">
                        <option
                          value="Huế"
                          data-route-id="R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO"
                        >
                          H: 28 Huế
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
                    <select
                      className={styles.pointUp}
                      id="searchPointUp"
                      value={stopLocation}
                      onChange={(e) => setStopLocation(e.target.value)}
                    >
                      <option value="">Chọn điểm lên</option>
                      <optgroup label="Quảng Nam">
                        <option
                          value="Quảng Nam"
                          data-route-id="R0U11yleLOCho9m,R0Tu1yipwtweLFh,R0DB1s6ShKApv4w,R0U11yleMeCbGpm,R0DB1s6Tt7KMXT6,R0Tu1yiptmYVave,R0DA1s6Bu8rN9mg,R0NY1wD4MMlyUEQ,R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO,R0NY1wD4LJD2IxB,R0DA1s6C94QCePS,R0DA1s6Bk8LFiei,R0DB1s6UOpGDcXh"
                        >
                          QN: 1 Quảng Nam
                        </option>
                      </optgroup>
                      <optgroup label="Đà Nẵng">
                        <option
                          value="Đà Nẵng"
                          data-route-id="R0U11yleLOCho9m,R0DB1s6ShKApv4w,R0U11yleMeCbGpm,R0DB1s6Tt7KMXT6,R0DA1s6Bu8rN9mg,R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO,R0DB1s6UOpGDcXh"
                        >
                          ĐN: 21 Đà Nẵng
                        </option>
                      </optgroup>

                      <optgroup label="Thừa Thiên Huế">
                        <option
                          value="Huế"
                          data-route-id="R0Qn1xUYC8NtCtn,R0Qo1xUvJJtTpEO"
                        >
                          H: 28 Huế
                        </option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div className={styles.searchTicket__item}>
                  {/* <span className={styles.searchTicket__item__title}>
                    Ngày khởi hành
                  </span> */}
                  {/* <input
                    className={styles.ticket_date}
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  /> */}

                  <input
                    className={styles.ticket_date}
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                {/* <div className={styles.searchTicket__item}>
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
                    <input
                    className={styles.ticket_date}
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  </div>
                </div> */}
              </div>
              <div className={styles.bookingPage__search__triggle}>
                <a
                  href="javascript:;"
                  data-action="searchTrip"
                  onClick={handleSearch}
                >
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
              {schedules.length > 0 ? (
                schedules.map((schedule) => (
                  <div
                    key={schedule.scheduleId}
                    className={styles.bookingPage__ticket}
                  >
                    <p style={{ display: "none" }}>
                      Số ghế: {schedule.car.numSeat}
                    </p>
                    {/* <p >
                      Số ghế: {schedule.car.type.typeId}
                    </p> */}
                    {/* Điều kiện hiển thị Schedule7Seat hoặc Schedule10Seat */}
                    {schedule.car.numSeat === 7 && (
                      <Schedule7Seat
                        key={schedule.scheduleId}
                        scheduleId={schedule.scheduleId}
                        startTime={schedule.startTime}
                        startLocation={schedule.startLocation}
                        stopLocation={schedule.stopLocation}
                        car={schedule.car}
                        numSeat={schedule.car.numSeat}
                        typeId={schedule.car.type.typeId}
                        price={schedule.car.price}
                      />
                    )}
                    {schedule.car.numSeat === 10 && (
                      <Schedule10Seat
                        key={schedule.scheduleId}
                        startTime={schedule.startTime}
                        scheduleId={schedule.scheduleId}
                        startLocation={schedule.startLocation}
                        stopLocation={schedule.stopLocation}
                        car={schedule.car}
                        numSeat={schedule.car.numSeat}
                        price={schedule.car.price}
                        typeId={schedule.car.type.typeId}
                      />
                    )}
                  </div>
                ))
              ) : (
                <p>Không tìm thấy lịch trình nào!</p>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Start BookingSeatSevenMobile*/}
      <div
        className={`${styles.bookingPage__mobile} ${styles.js__bookingPage__mobile}`}
      >
        <div className={styles.bookingPage__banner} />
        <div className="container-fulll">
          <div className={styles.container}>
            <div
              className={`${styles.bookingPage__search__wrap} ${styles.mobile_wrap}`}
              id="js-SearchTicketMobile"
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
                    {/* <select className={styles.pointUp} id="searchPointUp"> */}
                    <select
                      id="searchPointUp"
                      className={styles.pointUp}
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                    >
                      <option value="">Chọn điểm đi</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Quảng Nam">Quảng Nam</option>
                    </select>
                    {/* </select> */}
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
                    <h3 data-point-target="pointUp" />

                    <select
                      id="searchPointDown"
                      className={styles.pointDown}
                      value={stopLocation}
                      onChange={(e) => setStopLocation(e.target.value)}
                    >
                      <option value="">Chọn điểm đến</option>
                      <option value="Huế">Huế</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
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
                    <input
                      className={styles.ticket_date}
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`${styles.bookingPage__search__triggle} ${styles.mobile}`}
              >
                <a
                  href="javascript:;"
                  data-action="searchTrip"
                  onClick={handleSearch}
                >
                  <i className="fa fa-search" aria-hidden="true" />
                  Tìm chuyến{" "}
                </a>
              </div>
            </div>
          </div>

          <div className={styles.bookingPage__mobile__step}>
            <span>Chọn chỗ</span>
            <span>Thanh toán</span>
            <span>Hoàn thành</span>
          </div>
          <div className={styles.bookingPage__mobile__content}>
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <div
                  key={schedule.scheduleId}
                  className={styles.bookingPage__ticket}
                >
                  <p style={{ display: "none" }}>
                    Số ghế: {schedule.car.numSeat}
                  </p>
                  {/* <p >
                      Số ghế: {schedule.car.type.typeId}
                    </p> */}
                  {/* Điều kiện hiển thị Schedule7Seat hoặc Schedule10Seat */}
                  {schedule.car.numSeat === 7 && (
                    <Schedule7SeatMobile
                      key={schedule.scheduleId}
                      scheduleId={schedule.scheduleId}
                      startTime={schedule.startTime}
                      startLocation={schedule.startLocation}
                      stopLocation={schedule.stopLocation}
                      car={schedule.car}
                      numSeat={schedule.car.numSeat}
                      typeId={schedule.car.type.typeId}
                      price={schedule.car.price}
                    />
                  )}
                  {schedule.car.numSeat === 10 && (
                    <Schedule10SeatMobile
                      key={schedule.scheduleId}
                      startTime={schedule.startTime}
                      scheduleId={schedule.scheduleId}
                      startLocation={schedule.startLocation}
                      stopLocation={schedule.stopLocation}
                      car={schedule.car}
                      numSeat={schedule.car.numSeat}
                      price={schedule.car.price}
                      typeId={schedule.car.type.typeId}
                    />
                  )}
                </div>
              ))
            ) : (
              <p>Không tìm thấy lịch trình nào!</p>
            )}
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default BookingTicket;

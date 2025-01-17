import React, { useEffect, useState } from "react";
import styles from "pages/bookingTicket.module.css";
import SeatMap from "./SeatMap";
import SeatMapMobile from "components/SeatMapMobile/SeatMapMobile";
import { root } from "helper/axiosClient";

const BookingTicket = () => {
  const [startTime, setStartTime] = useState("");
  const [cars, setCars] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCarSeatMap, setSelectedCarSeatMap] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [routeDetail, setRouteDetail] = useState(null);
  const [carDetail, setCarDetail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [checkStartTime, setCheckStartTime] = useState("");
  const [isCreateSchedule, setIsCreateSchedule] = useState(false);
  const [getSchedule, setGetSchedule] = useState(false);
  const [isDisableSeat, setIsDisableSeat] = useState(false);
  const [dateBefore, setDateBefore] = useState("");
  const [dateAfter, setDateAfter] = useState("");
  const [startTimeRes, setStartTimeRes] = useState("");
  const [tickets, setTickets] = useState([]);

  console.log("««««« schedule »»»»»", schedule);
  console.log("««««« tickets »»»»»", tickets);

  const carRouteId = selectedRoute;
  // selectedRoute là routeId
  // selectedCar là carId
  const handleStartTimeChange = (e) => {
    const selectedTime = new Date(e.target.value);
    const currentTime = new Date();

    if (selectedTime < currentTime) {
      setError("Bạn không thể chọn ngày giờ trong quá khứ!");
      setStartTime("");
    } else {
      setError("");
      setStartTime(e.target.value);
    }
  };

  const isTimeValid = (userTime, scheduleTime) => {
    const userDate = new Date(userTime);
    const scheduleDate = new Date(scheduleTime);

    setErrorMessage(""); // Xóa lỗi nếu hợp lệ
    return true;
  };

  // Xử lý khi người dùng thay đổi thời gian
  const handleUserTimeChange = (e) => {
    const selectedTime = new Date(e.target.value);
    const currentTime = new Date();
    const userInputTime = e.target.value;

    if (selectedTime < currentTime) {
      setErrorMessage("Bạn không thể chọn ngày giờ trong quá khứ!");
      setStartTime("");
    } else {
      setErrorMessage("");
      setStartTime(userInputTime);
    }

    // Chỉ kiểm tra khi schedule đã có giá trị
    if (schedule && schedule.startTime) {
      isTimeValid(userInputTime, schedule.startTime);
    }
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("http://localhost:8080/public/routes");
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    const fetchCarsByRouteAndTime = async () => {
      if (!startTime || !selectedRoute) {
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/public/find-car?idRoute=${selectedRoute}&time=${startTime}`
        );
        if (!response.ok) {
          throw new Error("Không thể lấy danh sách xe khả dụng");
        }
        const data = await response.json();
        console.log("««««« data »»»»»", data);
        setCars(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setError("Không thể lấy danh sách xe. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchCarsByRouteAndTime();
  }, [startTime, selectedRoute]);

  // start detail
  useEffect(() => {
    if (selectedRoute) {
      const selectedRouteDetails = routes.find(
        (route) => route.id === selectedRoute
      );
      if (selectedRouteDetails) {
        setRouteDetail(
          `${selectedRouteDetails.startLocation} - ${selectedRouteDetails.stopLocation}`
        );
      } else {
        setRouteDetail(null);
      }
    } else {
      setRouteDetail(null);
    }
  }, [selectedRoute, routes]);

  useEffect(() => {
    if (selectedCar) {
      const selectedCarDetails = cars.find((car) => car.carId === selectedCar);
      if (selectedCarDetails) {
        setCarDetail(
          `${selectedCarDetails.name} - ${selectedCarDetails.type.numSeats} Chỗ Ngồi`
        );
      } else {
        setCarDetail(null);
      }
    } else {
      setCarDetail(null);
    }
  }, [selectedCar, cars]);

  // End detail

  // Xóa lịch
  useEffect(() => {
    const findOrCreateSchedule = async () => {
      if (!startTime || !selectedRoute || !selectedCar) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        if (schedule && schedule.id) {
          await fetch(`http://localhost:8080/public/schedule/${schedule.id}`, {
            method: "DELETE",
          });
        }

        // Gọi API tạo/lấy lịch trình mới
        const response = await fetch(
          "http://localhost:8080/public/create-or-find",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startTime,
              routeId: selectedRoute,
              carId: selectedCar,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Không thể tạo/lấy lịch trình!");
        }

        const data = await response.json();
        setScheduleId(data.id);
        setCheckStartTime(data.startTime);
        setGetSchedule(true);
        setSchedule(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setError("Không thể lấy thông tin lịch trình!");
      } finally {
        setLoading(false);
      }
    };

    findOrCreateSchedule();
  }, [startTime, selectedRoute, selectedCar]);

  const getTicketByIdScheduleId = async () => {
    try {
      const response = await root.get(
        `/public/ticket-with-schedule/${scheduleId}`
      );
      const tickets = response.data;
      setTickets(tickets);
    } catch (error) {
      if (error.status == 500) {
        setIsCreateSchedule(true);
      }
      console.log("««««« err »»»»»", error);
    }
  };

  useEffect(() => {
    if (isCreateSchedule && getSchedule) {
      const currentDate = new Date();
      const targetDate = new Date(checkStartTime);

      if (
        ~~(targetDate.getTime() / 60000 - currentDate.getTime() / 60000) >= 15
      ) {
        // alert("ok");
        setIsCreateSchedule(false);
        setGetSchedule(false);
        setIsDisableSeat(false);
      } else {
        // alert("Không tạo được lịch");
        setIsDisableSeat(true);
      }
    }
  }, [isCreateSchedule, getSchedule, checkStartTime]);

  useEffect(() => {
    if (scheduleId) {
      getTicketByIdScheduleId();
    }
  }, [scheduleId]);

  useEffect(() => {
    if (schedule && checkStartTime) {
      const sampleTime = new Date(checkStartTime);
      const test1 = new Date(sampleTime);
      const test2 = new Date(sampleTime);
      const tempDateBefore = test1.getTime() - schedule.time * 60000;
      const tempDateAfter = test2.getTime() + schedule.time * 60000;
      const dateBefore = new Date(tempDateBefore);
      const dateAfter = new Date(tempDateAfter);
      setDateBefore(dateBefore.toLocaleString());
      setDateAfter(dateAfter.toLocaleString());
    }
  }, [schedule, checkStartTime]);

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
                      onChange={(e) => {
                        handleUserTimeChange(e);
                        setTickets([]);
                        setScheduleId("");
                      }}
                      min={new Date().toISOString().slice(0, 16)}
                    />
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
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
                      Tuyến Đường
                    </span>
                    <select
                      className={styles.pointUp}
                      id="searchPointUp"
                      value={selectedRoute || ""}
                      onChange={(e) => {
                        setSelectedRoute(Number(e.target.value));
                        setTickets([]);
                        setScheduleId("");
                      }}
                    >
                      <option value="">Chọn tuyến đường</option>
                      {routes.map((route) => (
                        <option key={route.id} value={route.id}>
                          {route.startLocation} - {route.stopLocation}
                        </option>
                      ))}
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
                    <span
                      className={styles.searchTicket__item__title}
                      style={{ paddingRight: "100px" }}
                    >
                      Loại xe
                    </span>
                    <select
                      className={styles.pointUp}
                      id="searchPointUp"
                      // value={selectedCar || ""}
                      // onChange={(e) => setSelectedCar(Number(e.target.value))}
                      value={selectedCar || ""}
                      onChange={(e) => {
                        const car = cars.find(
                          (car) => car.carId === Number(e.target.value)
                        );
                        setSelectedCar(Number(e.target.value));
                        setSelectedCarSeatMap(car);
                        setTickets([]);
                        setScheduleId("");
                      }}
                    >
                      <option value="">Chọn loại xe</option>
                      {cars.map((car) => (
                        <option key={car.carId} value={car.carId}>
                          {car.name} - {car.type.numSeats} Chỗ Ngồi
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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
              {schedule ? (
                <>
                  {isDisableSeat ? (
                    <h4
                      style={{
                        padding: "10px 0 ",
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      Không tạo được lịch trình. Vui lòng chọn thời gian sau 15
                      phút so với giờ hiện tại!
                    </h4>
                  ) : (
                    <>
                      {tickets.length > 0 ? (
                        <>
                          <h3 style={{ padding: "10px 0 ", color: "red" }}>
                            Tất cả những lịch ở trong khoảng khung giờ (
                            {dateBefore}) - ({dateAfter}) này thì sẽ được ghép
                            vào lịch trong khung giờ (
                            {schedule.startTime.toLocaleString().split("T")[1] +
                              " " +
                              schedule.startTime
                                .toLocaleString()
                                .split("T")[0]
                                .split("-")[2] +
                              "/" +
                              schedule.startTime
                                .toLocaleString()
                                .split("T")[0]
                                .split("-")[1] +
                              "/" +
                              schedule.startTime
                                .toLocaleString()
                                .split("T")[0]
                                .split("-")[0]}
                            )
                          </h3>
                          <SeatMap
                            priceOfSeat={schedule.price}
                            car={selectedCarSeatMap}
                            carRouteId={carRouteId}
                            scheduleId={scheduleId}
                            startTime={schedule.startTime}
                            startLocation={schedule.startLocation}
                            stopLocation={schedule.stopLocation}
                            selectedRoute={selectedRoute}
                            selectedCar={selectedCar}
                            routeDetail={routeDetail}
                            carDetail={carDetail}
                          />
                        </>
                      ) : (
                        <SeatMap
                          priceOfSeat={schedule.price}
                          car={selectedCarSeatMap}
                          carRouteId={carRouteId}
                          scheduleId={scheduleId}
                          startTime={schedule.startTime}
                          startLocation={schedule.startLocation}
                          stopLocation={schedule.stopLocation}
                          selectedRoute={selectedRoute}
                          selectedCar={selectedCar}
                          routeDetail={routeDetail}
                          carDetail={carDetail}
                        />
                      )}
                    </>
                  )}
                </>
              ) : (
                // <p>Chưa có lịch trình.</p>
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Start BookingSeatMobile*/}
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
                      Ngày khởi hành
                    </span>
                    <input
                      className={styles.ticket_date}
                      type="datetime-local"
                      value={startTime}
                      onChange={handleStartTimeChange}
                      min={new Date().toISOString().slice(0, 16)}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
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
                      Tuyến Đường
                    </span>
                    <h3 data-point-target="pointUp" />

                    <select
                      className={styles.pointUp}
                      id="searchPointUp"
                      value={selectedRoute || ""}
                      onChange={(e) => setSelectedRoute(Number(e.target.value))}
                    >
                      <option value="">Chọn tuyến đường</option>
                      {routes.map((route) => (
                        <option key={route.id} value={route.id}>
                          {route.startLocation} - {route.stopLocation}
                        </option>
                      ))}
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
                      Loại xe
                    </span>
                    <h3 data-point-target="pointUp" />
                    <select
                      className={styles.pointUp}
                      id="searchPointUp"
                      value={selectedCar || ""}
                      onChange={(e) => {
                        const car = cars.find(
                          (car) => car.carId === Number(e.target.value)
                        );
                        setSelectedCar(Number(e.target.value));
                        setSelectedCarSeatMap(car);
                      }}
                    >
                      <option value="">Chọn loại xe</option>
                      {cars.map((car) => (
                        <option key={car.carId} value={car.carId}>
                          {car.name} - {car.type.numSeats} Chỗ Ngồi
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* <div
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
              </div> */}
            </div>
          </div>

          <div className={styles.bookingPage__mobile__step}>
            <span className={styles.active}>Chọn chỗ</span>
            <span>Thanh toán</span>
            <span>Hoàn thành</span>
          </div>
          <div className={styles.bookingPage__mobile__content}>
            {schedule ? (
              <>
                {isDisableSeat ? (
                  <h4
                    style={{
                      padding: "10px 0 ",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    Không tạo được lịch trình. Vui lòng chọn thời gian sau 15
                    phút so với giờ hiện tại!
                  </h4>
                ) : (
                  <>
                    {tickets.length > 0 ? (
                      <>
                        <h3 style={{ padding: "10px 0 ", color: "red" }}>
                          Tất cả những lịch ở trong khoảng khung giờ (
                          {dateBefore}) - ({dateAfter}) này thì sẽ được ghép vào
                          lịch trong khung giờ (
                          {schedule.startTime.toLocaleString().split("T")[1] +
                            " " +
                            schedule.startTime
                              .toLocaleString()
                              .split("T")[0]
                              .split("-")[2] +
                            "/" +
                            schedule.startTime
                              .toLocaleString()
                              .split("T")[0]
                              .split("-")[1] +
                            "/" +
                            schedule.startTime
                              .toLocaleString()
                              .split("T")[0]
                              .split("-")[0]}
                          )
                        </h3>
                        <SeatMap
                          priceOfSeat={schedule.price}
                          car={selectedCarSeatMap}
                          carRouteId={carRouteId}
                          scheduleId={scheduleId}
                          startTime={schedule.startTime}
                          startLocation={schedule.startLocation}
                          stopLocation={schedule.stopLocation}
                          selectedRoute={selectedRoute}
                          selectedCar={selectedCar}
                          routeDetail={routeDetail}
                          carDetail={carDetail}
                        />
                      </>
                    ) : (
                      <SeatMap
                        priceOfSeat={schedule.price}
                        car={selectedCarSeatMap}
                        carRouteId={carRouteId}
                        scheduleId={scheduleId}
                        startTime={schedule.startTime}
                        startLocation={schedule.startLocation}
                        stopLocation={schedule.stopLocation}
                        selectedRoute={selectedRoute}
                        selectedCar={selectedCar}
                        routeDetail={routeDetail}
                        carDetail={carDetail}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              // <p>Chưa có lịch trình.</p>
              ""
            )}
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default BookingTicket;

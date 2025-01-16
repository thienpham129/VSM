import React, { useEffect, useState } from "react";
import styles from "pages/bookingTicket.module.css";
import MethodPaymentMobile from "components/MethodPaymentMobile/MethodPaymentMobile";
import { useLocation, useNavigate } from "react-router-dom";
import { root } from "helper/axiosClient";

const MethodPayment = () => {
  const location = useLocation();
  const { state } = location;
  const {
    car,
    fullName,
    phoneNumber,
    email,
    note,
    detailAddressToPickUp,
    selectedSeat,
    detailAddressDropOff,
    totalPrice,
    startTime,
    startLocation,
    stopLocation,
    ticketId,
    carDetail,
    routeDetail,
    scheduleId,
  } = state || {};
  const [paymentUrl, setPaymentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  const [pickUpLat, setPickUpLat] = useState("");
  const [pickUpLon, setPickUpLon] = useState("");
  const [dropLat, setDropLat] = useState("");
  const [dropLon, setDropLon] = useState("");
  const [messagePayment, setMessagePayment] = useState(false);

  //
  const [seats, setSeats] = useState(car.type.seatList);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [successSeats, setSuccessSeats] = useState([]);
  const [waitingSeats, setWaitingSeats] = useState([]);

  //
  useEffect(() => {
    setSeats(car.type.seatList);
  }, [car]);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await root.get(
          `/public/ticket-with-schedule/${scheduleId}`
        );

        if (response.status === 200) {
          const tickets = response.data;
          setTickets(tickets);

          // Lọc ghế có status là "Đã thanh toán"
          const successSeats = tickets.filter(
            (ticket) => ticket.status === "Đã thanh toán"
          );
          setSuccessSeats(successSeats);

          // Lọc ghế có status là "Đang chờ xử lý"
          const waitingSeats = tickets.filter(
            (ticket) => ticket.status === "Đang chờ xử lý"
          );
          setWaitingSeats(waitingSeats);
        } else {
          console.error(
            "Không thể lấy dữ liệu vé. Mã trạng thái:",
            response.status
          );
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API: ", error);
      }
    };

    fetchTickets();
  }, [scheduleId]);

  // Hàm kiểm tra ghế bị hủy
  const checkSuccessTicket = (seatPosition) => {
    return successSeats.some((ticket) =>
      ticket.selectedSeat.includes(seatPosition)
    );
  };

  // Hàm xử lý chọn ghế
  const handleSeatClick = (seatPosition) => {
    if (seatPosition === "A1") {
      return;
    }

    // Tìm ghế dựa trên seatPosition
    const selectedSeat = seats.find((seat) => seat.position === seatPosition);

    // Kiểm tra nếu ghế này đã bị hủy hoặc đang chờ xử lý thì không thể chọn
    const isSuccess = checkSuccessTicket(seatPosition);
    const isWaiting = waitingSeats.some((ticket) =>
      ticket.selectedSeat.includes(seatPosition)
    );
    if (isSuccess || isWaiting) {
      return; // Không làm gì nếu ghế đã bị hủy hoặc đang chờ xử lý
    }
  };

  // End

  useEffect(() => {
    console.log(ticketId);
    if (ticketId && detailAddressToPickUp && detailAddressDropOff) {
      const updateCoordinates = async () => {
        if (detailAddressToPickUp) {
          // const data = await fetchGeocode(detailAddressToPickUp);
          // if (data && data.features && data.features.length > 0) {
          //   const { center } = data.features[0];
          //   setPickUpLat(center[1].toString());
          //   setPickUpLon(center[0].toString());
          // }
          fetchGeocode(detailAddressToPickUp.trim()).then((data) => {
            if (data) {
              // console.log("Coordinates:", data.results[0].geometry.location.lat);
              setPickUpLat(data.results[0].geometry.location.lat);
              setPickUpLon(data.results[0].geometry.location.lng);
            }
          });
        }

        if (detailAddressDropOff) {
          // const data = await fetchGeocode(detailAddressDropOff);
          // if (data && data.features && data.features.length > 0) {
          //   const { center } = data.features[0];
          //   setDropLat(center[1].toString());
          //   setDropLon(center[0].toString());
          // }
          fetchGeocode(detailAddressDropOff.trim()).then((data) => {
            if (data) {
              // console.log("Coordinates:", data.results[0].geometry.location.lat);
              setDropLat(data.results[0].geometry.location.lat);
              setDropLon(data.results[0].geometry.location.lng);
            }
          });
        }
      };

      updateCoordinates();
    }
  }, [ticketId, detailAddressToPickUp, detailAddressDropOff]);

  useEffect(() => {
    if (pickUpLat && pickUpLon && dropLat && dropLon) {
      const mapPickUp = `${pickUpLat},${pickUpLon}`;
      const mapDrop = `${dropLat},${dropLon}`;
      const mapStatus = "0";

      console.log(mapPickUp + "   " + mapDrop + "   " + mapStatus);
      console.log(
        typeof mapPickUp + "   " + typeof mapDrop + "   " + typeof mapStatus
      );

      try {
        const updateTicKetMap = async () => {
          const url = "/public/update-status-map/ticket";
          const response = await root.put(`${url}/${ticketId}`, {
            mapPickUp,
            mapDrop,
            mapStatus,
          });
          if (response.data) {
            console.log(response.data);
          } else {
            console.log(
              "Something went wrong with call api of updateTicKetMap"
            );
          }
        };

        updateTicKetMap();
      } catch (error) {
        console.log(error);
      }
    }
  }, [pickUpLat, pickUpLon, dropLat, dropLon]);

  // const fetchGeocode = async (address) => {
  //   const apiKey = "4D4kbtoB1PV8gjRJMqgB";
  //   const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(
  //     address
  //   )}.json?key=${apiKey}`;

  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch geocoding data");
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const fetchGeocode = async (address) => {
    try {
      const response = await fetch(
        `https://rsapi.goong.io/geocode?address=${address}&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
      );
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (e) => {
    // setMessagePayment(true);
    // setIsLoading(true);
    // setError(null);
    e.preventDefault();
    try {
      const response = await root.get(
        `/api/v1/payment/vn-pay?bankCode=NCB&ticketId=${state.ticketId}`
      );

      if (response.status === 200) {
        // setPaymentUrl(response.data.data.paymentUrl);
        window.location.href = response.data.data.paymentUrl;
        console.log(response);
      } else {
        setError("Failed to fetch payment URL");
      }
    } catch (err) {
      setError("An error occurred during payment.");
    }
    // finally {
    //   setIsLoading(false);
    // }
  };

  const vnPayCallBack = async () => {
    try {
      const response = await root.get(
        `http://localhost:8080/api/v1/payment/vn-pay-callback?vnp_ResponseCode=00&vnp_TxnRef=b5c02e9fd1`
      );
      if (response.code === 200) {
        window.location.href = "/paymentSuccess";
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check payment ticket

  // Check cancle ticket
  const checkCancelTicket = async () => {
    if (!ticketId) {
      alert("Vui lòng cung cấp mã vé (ticketId) để kiểm tra.");
      return;
    }

    try {
      const response = await root.get(`public/ticket/check/${ticketId}`);

      if (response.status === 200) {
        console.log("««««« response.data123 »»»»»", response.data);
        if (response.data === true) {
          console.log("««««« Vé đã được thanh toán »»»»»");
          return true;
        } else {
          console.log("««««« Vé chưa được xử lý »»»»»");
          return false;
        }
      } else {
        setError("Không thể kiểm tra trạng thái thanh toán.");
      }
    } catch (err) {
      console.error("Lỗi khi gọi API kiểm tra thanh toán:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkCancelTicket();
  }, []);

  return (
    <div className="no-bottom no-top zebra" id="content">
      <div id="top" />
      {/* section begin */}
      <section id="subheader" className="jarallax text-light">
        <img
          src="images/background/subheader.jpg"
          className="jarallax-img"
          alt=""
        />
      </section>
      {/* section close */}
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
                    {/* <select
                      className={styles.pointUp}
                      id="searchPointUp"
                      value={routeDetail || ""}
                    ></select> */}
                    <div>{routeDetail}</div>
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
                    <div>{carDetail}</div>
                  </div>
                </div>
              </div>
              {/* <div className={styles.bookingPage__search__triggle}>
                <a
                  href="javascript:;"
                  data-action="searchTrip"
                  // onClick={handleSearch}
                >
                  <i className="fa fa-search" aria-hidden="true" /> Tìm chuyến
                </a>
                
              </div> */}
            </div>
          </div>
        </div>
        <div className={styles.bookingPage__step}>
          <div className={styles.container}>
            <div className={styles.bookingPage__step__wrap}>
              <div
                className={`${styles.bookingPage__step__item} ${styles.success} ${styles.active}`}
              >
                <span>Chọn chỗ và điền thông tin</span>
              </div>
              <div
                className={`${styles.bookingPage__step__item} ${styles.active}`}
              >
                <span>Thanh toán hoặc giữ chỗ trước</span>
              </div>
              <div className={styles.bookingPage__step__item}>
                <span>Hoàn thành</span>
              </div>
            </div>
          </div>
        </div>
        <form target="_self">
          <div className={styles.bookingPayment}>
            <div className={styles.container}>
              <div className={styles.bookingPayment__wrap}>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                    <div
                      className={styles.bookingPayment__method}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
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
                          <table>
                            <tbody>
                              {[...Array(5)].map((_, rowIndex) => {
                                return (
                                  <tr key={rowIndex}>
                                    {["A", "B", "C", "D", "E"].map(
                                      (col, colIndex) => {
                                        const position = `${col}${
                                          rowIndex + 1
                                        }`;
                                        const seat = seats.find(
                                          (seat) => seat.position === position
                                        );

                                        // Kiểm tra nếu ghế bị hủy, đang chờ xử lý hoặc không thể chọn
                                        const isSuccess =
                                          checkSuccessTicket(position);
                                        const isWaiting = waitingSeats.some(
                                          (ticket) =>
                                            ticket.selectedSeat.includes(
                                              position
                                            )
                                        );

                                        let seatClass = "icon-seat-empty";
                                        let cursorStyle = "pointer"; // Mặc định là pointer

                                        if (position === "A1") {
                                          seatClass = "icon-seat-not-sell";
                                          cursorStyle = "not-allowed"; // Ghế A1 không thể chọn
                                        } else if (isSuccess) {
                                          seatClass = "icon-seat-sold"; // Ghế đã hủy
                                          cursorStyle = "not-allowed"; // Không thể chọn ghế đã hủy
                                        } else if (isWaiting) {
                                          seatClass = "icon-seat-booked"; // Ghế đang chờ xử lý
                                          cursorStyle = "not-allowed"; // Không thể chọn ghế đang chờ xử lý
                                        } else if (
                                          selectedSeats.includes(position)
                                        ) {
                                          seatClass = "icon-seat-selected"; // Ghế đang chọn
                                        }

                                        // Nếu không có ghế trong seatList thì hiển thị hidden
                                        if (!seat) {
                                          return (
                                            <td
                                              key={colIndex}
                                              style={{ visibility: "hidden" }}
                                            />
                                          );
                                        }

                                        return (
                                          <>
                                            <td key={colIndex}>
                                              {/* <div style={{ position: "relative", textAlign: "center", width: "80px" }}> */}
                                              <div
                                                style={{
                                                  textAlign: "center",
                                                  position: "relative",
                                                }}
                                              >
                                                <input
                                                  type="button"
                                                  value={
                                                    position === "A1"
                                                      ? "Tài Xế"
                                                      : seat.position
                                                  }
                                                  readOnly
                                                  className={`avicon ${seatClass}`}
                                                  onClick={
                                                    position === "A1" ||
                                                    isSuccess ||
                                                    isWaiting
                                                      ? undefined
                                                      : () =>
                                                          handleSeatClick(
                                                            position
                                                          )
                                                  }
                                                  style={{
                                                    display: "inline-block",
                                                    width: "80px",
                                                    textAlign: "center",
                                                    cursor: cursorStyle, // Cập nhật style con trỏ
                                                  }}
                                                />
                                                {seat &&
                                                  seat.surcharge !== 0 && (
                                                    <div
                                                      style={{
                                                        position: "absolute",
                                                        bottom: "-28px",
                                                        left: "50%",
                                                        transform:
                                                          "translateX(-50%)",
                                                        fontSize: "12px",
                                                        color:
                                                          seat.surcharge > 0
                                                            ? "red"
                                                            : "green",
                                                        whiteSpace: "nowrap",
                                                      }}
                                                    ></div>
                                                  )}
                                              </div>
                                            </td>
                                          </>
                                        );
                                      }
                                    )}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p>
                        <span
                          className="text-big"
                          style={{ fontSize: "1.4em" }}
                        >
                          QUÝ KHÁCH VUI LÒNG THANH TOÁN TRONG VÒNG{" "}
                          <strong>15 PHÚT</strong>, QUÁ THỜI HẠN MÃ VÉ SẼ BỊ
                          HUỶ. CẦN HỖ TRỢ XIN LIÊN HỆ TỔNG ĐÀI:{" "}
                          <strong>1900969671</strong>.
                        </span>
                      </p>
                    </div>

                    <div className={styles.bookingSuccessPage__note}>
                      <h4 style={{ fontSize: "30px" }}>Lưu ý</h4>
                      <p>
                        - Thông tin khách hàng phải chính xác, nếu không sẽ
                        không thực hiện việc hủy/đổi.{" "}
                      </p>
                      <p>
                        - Điểm đón/trả khách phải nằm trong quy định về điểm
                        đón/trả của chúng tôi, nếu nằm ngoài quy định về điểm
                        đón/trả, chúng tôi không đáp ứng.{" "}
                      </p>
                      <p>
                        - Trước khi giao dịch thanh toán thành công, chúng tôi
                        sẽ không đón quý khách hàng tại các điểm theo quy định
                        về điểm đón của .{" "}
                      </p>
                      <p>- Mọi thắc mắc xin vui lòng liên hệ qua tổng đài: </p>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                    <div className={styles.bookingPayment__info}>
                      <div className={styles.bookingPayment__info__title__line}>
                        <h4 className={styles.bookingPayment__info__title} />
                        <span
                          className={styles.bookingPayment__info__title__text}
                        >
                          Thông tin khách hàng
                        </span>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Họ tên</label>
                        <p>{fullName}</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Số điện thoại</label>
                        <p>{phoneNumber}</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Email</label>
                        <p>{email}</p>
                      </div>
                      <div className={styles.bookingPayment__info__title__line}>
                        <h4 className={styles.bookingPayment__info__title} />
                        <span
                          className={styles.bookingPayment__info__title__text}
                        >
                          Thông tin chuyến đi
                        </span>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Mã Vé</label>
                        <p>{ticketId}</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Tuyến</label>
                        <p>
                          {startLocation} - {stopLocation}
                        </p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Giờ xuất bến</label>
                        <p>
                          {new Date(startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Điểm đi</label>
                        <p>{detailAddressToPickUp}</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Điểm đến</label>
                        <p>{detailAddressDropOff}</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Ghi chú</label>
                        <p>{note}</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Ghế</label>
                        <p className="list-seat">
                          <span>
                            {selectedSeat.length > 0
                              ? selectedSeat.join(", ")
                              : "Chưa chọn ghế"}
                          </span>
                        </p>
                      </div>
                      {/* <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Mã khuyến mãi</label>
                        <p>{voucher}</p>
                      </div> */}

                      <div className={styles.bookingPayment__submit}>
                        <button onClick={handlePayment} disabled={isLoading}>
                          {isLoading ? "Processing..." : "Thanh toán"}
                        </button>
                      </div>
                      <div
                        className={styles.bookingPayment__info__item__line}
                      />
                      <div className={styles.bookingPayment__info__item}>
                        <label
                          htmlFor=""
                          style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "#333",
                          }}
                        >
                          Tổng tiền :
                        </label>
                        <p style={{ fontSize: "26px", paddingTop: "7px" }}>
                          {totalPrice.toLocaleString().replace(",", ".")} VNĐ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      {/* <MethodPaymentMobile
        fullName={fullName}
        phoneNumber={phoneNumber}
        email={email}
        note={note}
        detailAddressToPickUp={detailAddressToPickUp}
        selectedSeat={selectedSeat}
        detailAddressDropOff={detailAddressDropOff}
        totalPrice={totalPrice}
        startTime={startTime}
        startLocation={startLocation}
        stopLocation={stopLocation}
        ticketId={ticketId}
      /> */}
    </div>
  );
};

export default MethodPayment;

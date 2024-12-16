import React, { useEffect, useState } from "react";
import styles from "pages/bookingTicket.module.css";
import MethodPaymentMobile from "components/MethodPaymentMobile/MethodPaymentMobile";
import { useLocation, useNavigate } from "react-router-dom";
import { root } from "helper/axiosClient";

const MethodPayment = () => {
  const location = useLocation();
  const { state } = location;
  const {
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

  useEffect(() => {
    console.log(ticketId);
    if (ticketId && detailAddressToPickUp && detailAddressDropOff) {
      const updateCoordinates = async () => {
        if (detailAddressToPickUp) {
          fetchGeocode(detailAddressToPickUp.trim()).then((data) => {
            if (data) {
              console.log(
                "Coordinates:",
                data.results[0].geometry.location.lat
              );
              setPickUpLat(data.results[0].geometry.location.lat);
              setPickUpLon(data.results[0].geometry.location.lng);
            }
          });
        }

        if (detailAddressDropOff) {
          fetchGeocode(detailAddressDropOff.trim()).then((data) => {
            if (data) {
              console.log(
                "Coordinates:",
                data.results[0].geometry.location.lat
              );
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

  const handleSearch = async () => {
    if (!startLocation || !stopLocation || !startTime) {
      alert("Vui lòng chọn đầy đủ thông tin!");
      return;
    }

    try {
      const response = await root.get(`/public/route/search`, {
        params: {
          startLocation,
          stopLocation,
          startTime,
        },
      });
      setSchedules(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không tìm thấy lịch trình phù hợp.");
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await root.get(`/api/v1/payment/pay/${ticketId}`);

      if (response.status === 200) {
        setPaymentUrl(response.data.data.paymentUrl);
      } else {
        setError("Failed to fetch payment URL");
      }
    } catch (err) {
      setError("An error occurred during payment.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check payment ticket

  const checkPayment = async () => {
    if (!ticketId) {
      alert("Vui lòng cung cấp mã vé (ticketId) để kiểm tra thanh toán.");
      return;
    }

    try {
      const response = await root.get(
        `/api/v1/google-sheet/check-ticket/${ticketId}`
      );

      if (response.status === 200) {
        console.log("««««« response.data »»»»»", response.data);
        if (response.data.paid === true) {
          console.log("««««« Vé đã được thanh toán »»»»»");
          navigate("/paymentSuccess");
          return true;
        } else {
          console.log("««««« Vé chưa được thanh toán` »»»»»");
          return false;
        }
      } else {
        setError("Không thể kiểm tra trạng thái thanh toán.");
      }
    } catch (err) {
      console.error("Lỗi khi gọi API kiểm tra thanh toán:", err);
      setError("Đã xảy ra lỗi trong quá trình kiểm tra thanh toán.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!ticketId) return;

    const interval = setInterval(() => {
      checkPayment();
    }, 10000); // Gọi hàm mỗi 5 giây

    return () => clearInterval(interval); // Xóa interval khi component bị unmount
  }, [ticketId, navigate]);

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
                    <select
                      className={styles.pointUp}
                      value={startLocation}
                      id="searchPointUp"
                      // onChange={(e) => setStartLocation(e.target.value)}
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
                      // onChange={(e) => setStopLocation(e.target.value)}
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
                      type="date"
                      value={startTime}
                      // onChange={(e) => setStartTime(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
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
                    <div className={styles.bookingPayment__method}>
                      {paymentUrl && (
                        <div>
                          <h3>Scan để thanh toán:</h3>
                          <img
                            src={paymentUrl}
                            alt="Payment QR Code"
                            style={{
                              width: "500px",
                              height: "500px",
                              marginLeft: "80px",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <p>
                        <span
                          className="text-big"
                          style={{ fontSize: "1.4em" }}
                        >
                          QUÝ KHÁCH VUI LÒNG THANH TOÁN TRONG VÒNG{" "}
                          <strong>3 PHÚT</strong>, QUÁ THỜI HẠN MÃ VÉ SẼ BỊ HUỶ.
                          CẦN HỖ TRỢ XIN LIÊN HỆ TỔNG ĐÀI:{" "}
                          <strong>1900969671</strong>.
                        </span>
                      </p>
                    </div>
                    <div className="d-none check-big-size">
                      <input type="checkbox" id="ckb1" />
                      <label htmlFor="ckb1">
                        Tôi đồng ý với quy định của nhà xe
                      </label>
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
      <MethodPaymentMobile
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
      />
    </div>
  );
};

export default MethodPayment;

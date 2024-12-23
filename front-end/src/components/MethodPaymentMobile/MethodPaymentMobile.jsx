import React, { useEffect, useState } from "react";
import styles from "components/bookingTicket.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { root } from "helper/axiosClient";

const MethodPaymentMobile = () => {
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
  const [message, setMessage] = useState(false);

  const [pickUpLat, setPickUpLat] = useState("");
  const [pickUpLon, setPickUpLon] = useState("");
  const [dropLat, setDropLat] = useState("");
  const [dropLon, setDropLon] = useState("");

  const navigate = useNavigate();

  const handlePayment = async () => {
    setMessage(true);
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
          // alert(`Vé đã được thanh toán`);
          console.log("««««« Vé đã được thanh toán »»»»»");
          navigate("/paymentSuccess");
          return true;
        } else {
          // alert(`Vé chưa được thanh toán`);
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
      const response = await root.get(` public/ticket/check/${ticketId}`);

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

  return (
    <section
      className={`${styles.bookingPage__mobile} ${styles.bookingPayment__mobile}`}
    >
      <div className={styles.bookingPage__banner} />
      <div className="container-fulll">
        <div className={styles.bookingPage__mobile__head}>
          <div className={styles.bookingPage__mobile__head__thumb}>
            <a href="javascript:;" data-action="back">
              <a href="/bookingTicket">
                <i
                  class="fa-solid fa-arrow-left"
                  style={{ paddingRight: "100px" }}
                />
              </a>
            </a>
            <div>
              <h3>
                {startLocation} <span className="avicon icon-arrow-right" />{" "}
                {stopLocation}
              </h3>
              <p>
                <span>{startTime}</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.bookingPage__step__wrap}>
          <div
            className={`${styles.bookingPage__step__item} ${styles.success} ${styles.active}`}
          >
            <span>Chọn chỗ</span>
          </div>
          <div
            className={`${styles.bookingPage__step__item} ${styles.active}`}
            style={{
              backgroundImage:
                'url("/themes/99/public/imgs/booking/arrow-step-y.png")',
              backgroundSize: "cover",
            }}
          >
            <span>Thanh toán</span>
          </div>
          <div className={styles.bookingPage__step__item}>
            <span>Hoàn thành</span>
          </div>
        </div>

        <form target="_self">
          <div className={styles.bookingPayment__info__wrap}>
            <div className={styles.bookingPayment__info}>
              <div className={styles.bookingPayment__info__title__line}>
                <h4 className={styles.bookingPayment__info__title} />
                <span className={styles.bookingPayment__info__title__text}>
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
                <span className={styles.bookingPayment__info__title__text}>
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
                <p />
              </div> */}
              <div className={styles.bookingPayment__info__item}>
                <label htmlFor="">Ghi chú</label>
                <p>{note}</p>
              </div>

              <div className={styles.bookingPayment__info__item__line} />
              <div className={styles.bookingPayment__info__item}>
                <label htmlFor="">Tổng tiền</label>
                <p>{totalPrice.toLocaleString()} đ</p>
              </div>
            </div>
          </div>
          <div className={styles.bookingPayment__method}>
            {paymentUrl && (
              <div>
                <img
                  src={paymentUrl}
                  alt="Payment QR Code"
                  style={{
                    width: "500px",
                    height: "500px",
                    marginLeft: "40px",
                  }}
                />
              </div>
            )}
          </div>
          {message && (
            <div>
              <p>
                <span className="text-big" style={{ fontSize: "1.4em" }}>
                  <strong>
                    NẾU BẠN ĐÃ THANH TOÁN VUI LÒNG KHÔNG CHUYỂN TRANG. XIN CHỜ
                    TRONG GIÂY LÁT
                  </strong>
                </span>
              </p>
            </div>
          )}
          <div>
            <p style={{ padding: "10px" }}>
              <span className="text-big" style={{ fontSize: "1.4em" }}>
                QUÝ KHÁCH VUI LÒNG THANH TOÁN TRONG VÒNG <strong>3 PHÚT</strong>
                , QUÁ THỜI HẠN MÃ VÉ SẼ BỊ HUỶ. CẦN HỖ TRỢ XIN LIÊN HỆ TỔNG ĐÀI:{" "}
                <strong>1900969671</strong>.
              </span>
            </p>
          </div>
          <div className="container">
            <div className={styles.bookingPayment__mobile__submit}>
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className={styles.bookingPayment__mobile__submit_btn}
                style={{ width: "100%" }}
              >
                {isLoading ? "Processing..." : "Thanh toán"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MethodPaymentMobile;

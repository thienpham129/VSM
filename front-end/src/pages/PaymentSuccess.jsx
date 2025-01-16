import React, { useState } from "react";
import styles from "pages/bookingTicket.module.css";
import { root } from "helper/axiosClient";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const { startTime, carDetail, routeDetail } = location.state || {};

  return (
    <div className="no-bottom no-top zebra" id="content">
      <section id="subheader" className="jarallax text-light">
        <img
          src="images/background/subheader.jpg"
          className="jarallax-img"
          alt=""
        />
      </section>

      <section className={styles.bookingSuccessPage}>
        <div className={styles.bookingPage__banner} />
        <div className={styles.bookingPage__search}></div>
        <div className={styles.bookingPage__step}>
          <div className={styles.container}>
            <div className={styles.bookingPage__step__wrap}>
              <div
                className={`${styles.bookingPage__step__item} ${styles.active}`}
              >
                <span>Chọn chỗ</span>
              </div>
              <div
                className={`${styles.bookingPage__step__item} ${styles.active}`}
              >
                <span>Thanh toán</span>
              </div>
              <div
                className={`${styles.bookingPage__step__item} ${styles.active}`}
              >
                <span>Hoàn thành</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bookingSuccessPage__content}>
          <div className={styles.container}>
            <div className={styles.bookingSuccessPage__content}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className={styles.bookingSuccessPage__head}>
                    {/* <span className="avicon icon-booking-success" >
                      </span> */}
                    <h3
                      className="payment_success"
                      style={{ marginTop: "50px", fontSize: "55px" }}
                    >
                      Thanh toán đặt vé thành công
                    </h3>

                    <img src="images_02/ticketSuccess.jpg" />
                    <h3>
                      Bạn có thể xem vé của mình tại{" "}
                      <a href="/accountBooking">
                        lịch sử đặt vé trong trang cá nhân của mình!
                      </a>
                    </h3>
                  </div>
                  {/* <div className={styles.bookingSuccessPage__note}>
                    <h4 style={{ fontSize: "30px" }}>Lưu ý</h4>
                    <p>
                      - Thông tin khách hàng phải chính xác, nếu không sẽ không
                      thực hiện việc hủy/đổi.{" "}
                    </p>
                    <p>
                      - Điểm đón/trả khách phải nằm trong quy định về điểm
                      đón/trả của chúng tôi, nếu nằm ngoài quy định về điểm
                      đón/trả, chúng tôi không đáp ứng.{" "}
                    </p>
                    <p>
                      - Trước khi giao dịch thanh toán thành công, chúng tôi sẽ
                      không đón quý khách hàng tại các điểm theo quy định về
                      điểm đón của .{" "}
                    </p>
                    <p>- Mọi thắc mắc xin vui lòng liên hệ qua tổng đài: </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {`${styles.bookingPage__mobile} ${styles.bookingSuccessPage__mobile}`} */}
      {/* Mobile */}
      <section
        className={`${styles.bookingPage__mobile} ${styles.bookingSuccessPage__mobile}`}
      >
        <div className={styles.bookingPage__banner} />
        <div className="container-fulll">
          <div
            className={styles.bookingPage__step__wrap}
            style={{ background: "#00C48C" }}
          >
            <div
              className={`${styles.bookingPage__step__item} ${styles.active}`}
            >
              <span>Chọn chỗ</span>
            </div>
            <div
              className={`${styles.bookingPage__step__item} ${styles.active}`}
            >
              <span>Thanh toán</span>
            </div>
            <div
              className={`${styles.bookingPage__step__item} ${styles.active}`}
            >
              <span>Hoàn thành</span>
            </div>
          </div>
          <div className={styles.bookingSuccessPage__mobile__content}>
            <div className={styles.bookingSuccessPage__note}>
              <h3 style={{ textAlign: "center", fontSize: "45px" }}>
                Thanh toán đặt vé thành công
              </h3>
              <img
                src="images_02/ticketSuccess.jpg"
                style={{ marginLeft: "200px" }}
              />

              <h3 style={{ textAlign: "center", fontSize: "24px" }}>
                Bạn có thể xem vé của mình tại{" "}
                <a href="/accountBooking">
                  lịch sử đặt vé trong trang cá nhân của mình!
                </a>
              </h3>

              <div style={{ padding: "0 20px" }}>
                <h4 style={{ fontSize: "24px" }}>Lưu ý</h4>
                <p>
                  - Thông tin khách hàng phải chính xác, nếu không sẽ không thực
                  hiện việc hủy/đổi.{" "}
                </p>
                <p>
                  - Điểm đón/trả khách phải nằm trong quy định về điểm đón/trả
                  của chúng tôi, nếu nằm ngoài quy định về điểm đón/trả, chúng
                  tôi không đáp ứng.{" "}
                </p>
                <p>
                  - Trước khi giao dịch thanh toán thành công, chúng tôi sẽ
                  không đón quý khách hàng tại các điểm theo quy định về điểm
                  đón của{" "}
                </p>
                <p>- Mọi thắc mắc xin vui lòng liên hệ qua tổng đài: </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentSuccess;

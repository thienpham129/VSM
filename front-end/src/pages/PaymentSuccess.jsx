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
                  <div className={styles.bookingSuccessPage__note}>
                    <h4 style={{fontSize: '30px'}}>Lưu ý</h4>
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
                  </div>
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

              <div style={{padding : '0 20px'}}>

              <h4 style={{fontSize: "24px"}}>Lưu ý</h4>
              <p>
                - Thông tin khách hàng phải chính xác, nếu không sẽ không thực
                hiện việc hủy/đổi.{" "}
              </p>
              <p>
                - Điểm đón/trả khách phải nằm trong quy định về điểm đón/trả của
                chúng tôi, nếu nằm ngoài quy định về điểm đón/trả, chúng tôi
                không đáp ứng.{" "}
              </p>
              <p>
                - Trước khi giao dịch thanh toán thành công, chúng tôi sẽ không
                đón quý khách hàng tại các điểm theo quy định về điểm đón của{" "}
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

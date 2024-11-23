import React from "react";
import styles from "pages/bookingTicket.module.css";
import MethodPaymentMobile from "components/MethodPaymentMobile/MethodPaymentMobile";

const MethodPayment = () => {
  
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
        <form
          target="_self"
          action="/index.php?mod=datve&page=datve&sub=doBooking"
          method="POST"
        >
          <div className={styles.bookingPayment}>
            <div className={styles.container}>
              <div className={styles.bookingPayment__wrap}>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                    <div className={styles.bookingPayment__method}>
                      {/* <label
                      className="js--toggle__active-item bookingPayment__method__item active"
                      htmlFor="payment_method_ck"
                    >
                      <input
                        type="radio"
                        className="d-none"
                        name="payment_method"
                        data-target="ck"
                        id="payment_method_ck"
                        defaultValue="ck"
                        defaultChecked=""
                      />
                      <span className={styles.bookingPayment__method__item__check} />
                      <p>
                        <span className="avicon icon-payment-card" />
                        <b>
                          Thanh toán bằng thẻ ATM đã đăng ký Internet Banking
                        </b>
                      </p>
                    </label> */}
                    </div>
                    <div>
                      <p>
                        <span
                          className="text-big"
                          style={{ fontSize: "1.4em" }}
                        >
                          QUÝ KHÁCH VUI LÒNG THANH TOÁN TRONG VÒNG{" "}
                          <strong>60 PHÚT</strong>, QUÁ THỜI HẠN MÃ VÉ SẼ BỊ
                          HUỶ. CẦN HỖ TRỢ XIN LIÊN HỆ TỔNG ĐÀI:{" "}
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
                        <p>Nguyễn Xuân Quang</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Số điện thoại</label>
                        <p>0777907831</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Email</label>
                        <p>123@gmail.com</p>
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
                        <label htmlFor="">Tuyến</label>
                        <p>Quy Nhơn - Đà Nẵng (Giường)</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Giờ xuất bến</label>
                        <p>11:00</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Điểm đi</label>
                        <p>QN</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Điểm đến</label>
                        <p>ĐN</p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Ghế</label>
                        <p className="list-seat">
                          <span>A14</span>
                        </p>
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Mã khuyến mãi</label>
                        <p />
                      </div>
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Ghi chú</label>
                        <p />
                      </div>
                      <div className={styles.bookingPayment__submit}>
                        <button
                          type="submit"
                          className={styles.bookingPayment__submit__continue}
                        >
                          Thanh toán{" "}
                        </button>
                        <a
                          href="/index.php?mod=datve&page=datve&sub=cancleBooking"
                          className={styles.bookingPayment__submit__cancle}
                        >
                          Huỷ đặt xe{" "}
                        </a>
                      </div>
                      <div
                        className={styles.bookingPayment__info__item__line}
                      />
                      <div className={styles.bookingPayment__info__item}>
                        <label htmlFor="">Tổng tiền</label>
                        <p>240,000 đ</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      <MethodPaymentMobile />
    </div>
  );
};

export default MethodPayment;

import React from "react";
import styles from "components/bookingTicket.module.css";

const MethodPaymentMobile = () => {
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
                QN: 1 Quy Nhơn <span className="avicon icon-arrow-right" /> ĐN:
                21 Đà Nẵng
              </h3>
              <p>
                <span>16/10/2024 - Từ09:11</span>
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

        <form
          action="/index.php?mod=datve&page=datve&sub=doBooking"
          method="POST"
        >
          <div className={styles.bookingPayment__method}>
            {/* <label
              className="js--toggle__active-item bookingPayment__method__item "
              htmlFor="mbpayment_method_ck"
            >
              <input
                type="radio"
                className="d-none"
                name="payment_method"
                id="mbpayment_method_ck"
                defaultValue="ck"
              />
              <span className="bookingPayment__method__item__check" />
              <p>
                <span className="avicon icon-payment-card" />
                <b>Thanh toán bằng thẻ ATM đã đăng ký Internet Banking</b>
              </p>
            </label> */}
          </div>
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
                <span className={styles.bookingPayment__info__title__text}>
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

              <div className={styles.bookingPayment__info__item__line} />
              <div className={styles.bookingPayment__info__item}>
                <label htmlFor="">Tổng tiền</label>
                <p>240,000 đ</p>
              </div>
            </div>
          </div>
          {/* className={`${styles.bookingPayment__mobile__submit} ${styles.bookingPayment__mobile}`} */}

          <div className={styles.bookingPayment__note}>
            {/* <h4>Lưu ý</h4> */}
            {/* <div data-content="paymentCKInfo">
              <h4>Thông tin thanh toán,</h4>
              <p>
                STK ngân hàng Ngân hàng Thương mại cổ phần Đầu tư và Phát triển
                Việt Nam (BiDV): 58010000842574{" "}
              </p>
              <p>Công ty TNHH KD Vận tải Sơn Tùng</p>
              <p>
                <span>Nội dung chuyển khoản để lại: Sdt đặt.</span>
              </p>
            </div> */}
          </div>
          <div>
            <p style={{padding : '10px'}}>
              <span className="text-big" style={{ fontSize: "1.4em" }}>
                QUÝ KHÁCH VUI LÒNG THANH TOÁN TRONG VÒNG{" "}
                <strong>60 PHÚT</strong>, QUÁ THỜI HẠN MÃ VÉ SẼ BỊ HUỶ. CẦN HỖ
                TRỢ XIN LIÊN HỆ TỔNG ĐÀI: <strong>1900969671</strong>.
              </span>
            </p>
          </div>
          <div className="container">
            <div className={styles.bookingPayment__mobile__submit}>
              <a href="/index.php?mod=datve&page=datve&sub=cancleBooking">
                Huỷ đặt xe
              </a>
              <button
                type="submit"
                className="bookingPayment__mobile__submit-btn"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MethodPaymentMobile;
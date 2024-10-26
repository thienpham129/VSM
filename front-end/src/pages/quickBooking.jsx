import React from "react";

const QuickBooking = () => {
  return (
    <div className="no-bottom no-top" id="content">
      <div id="top" />
      {/* section begin */}
      <section id="subheader" className="jarallax text-light">
        <img src="images/background/16.jpg" className="jarallax-img" alt="" />
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Đặt vé xe nhanh</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      {/* section close */}
      <section
        id="section-hero"
        aria-label="section"
        className="no-top"
        data-bgcolor="#121212"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 mt-80 sm-mt-0">
              <div className="spacer-single sm-hide" />
              <div
                className="padding40 rounded-5 shadow-soft"
                data-bgcolor="#ffffff"
              >
                <form
                  name="contactForm"
                  id="booking_form"
                  className="form-s2 row g-4 on-submit-hide"
                  method="post"
                  action="#"
                >
                  <div className="col-lg-6 d-light">
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <h5>Nhập địa điểm đón</h5>
                        <select
                          name="Pick Up Location"
                          id="pick_up_location"
                          className="form-control opt-1-disable"
                          required=""
                        >
                          <option value="New York">Nhập địa điểm đón</option>
                          <option value="New York">New York</option>
                          <option value="Pennsylvania">Pennsylvania</option>
                          <option value="New Jersey">New Jersey</option>
                          <option value="Connecticut">Connecticut</option>
                          <option value="Massachusetts">Massachusetts</option>
                          <option value="Vermont">Vermont</option>
                          <option value="Rhode Island">Rhode Island</option>
                          <option value="New Hampshire">New Hampshire</option>
                        </select>
                      </div>
                      <div className="col-lg-6">
                        <h5>Nhập địa điểm trả</h5>
                        <select
                          name="Pick Up Location"
                          id="pick_up_location"
                          className="form-control opt-1-disable"
                          required=""
                        >
                          <option value="New York">Nhập địa điểm trả</option>
                          <option value="New York">New York</option>
                          <option value="Pennsylvania">Pennsylvania</option>
                          <option value="New Jersey">New Jersey</option>
                          <option value="Connecticut">Connecticut</option>
                          <option value="Massachusetts">Massachusetts</option>
                          <option value="Vermont">Vermont</option>
                          <option value="Rhode Island">Rhode Island</option>
                          <option value="New Hampshire">New Hampshire</option>
                        </select>
                      </div>

                      {/* <div className="col-lg-6">
                          <h5 for="pickUpTime">Pick Up Date &amp; Time </h5>
                        <div className="date-time-field">
                          <input
                            type="datetime-local"
                            id="pickUpTime"
                            name="pickUpTime"
                          />
                        </div>
                      </div> */}
                      <div className="col-lg-6">
                        <h5>Chọn thời gian đón</h5>
                        <div className="date-time-field">
                          <input
                            type="text"
                            id="date-picker-2"
                            name="Return Date"
                            defaultValue=""
                          />
                          <select name="Return Time" id="collection-time">
                            <option value="00:00">00:00</option>
                            <option value="00:30">00:30</option>
                            <option value="01:00">01:00</option>
                            <option value="01:30">01:30</option>
                            <option value="02:00">02:00</option>
                            <option value="02:30">02:30</option>
                            <option value="03:00">03:00</option>
                            <option value="03:30">03:30</option>
                            <option value="04:00">04:00</option>
                            <option value="04:30">04:30</option>
                            <option value="05:00">05:00</option>
                            <option value="05:30">05:30</option>
                            <option value="06:00">06:00</option>
                            <option value="06:30">06:30</option>
                            <option value="07:00">07:00</option>
                            <option value="07:30">07:30</option>
                            <option value="08:00">08:00</option>
                            <option value="08:30">08:30</option>
                            <option value="09:00">09:00</option>
                            <option value="09:30">09:30</option>
                            <option value="10:00">10:00</option>
                            <option value="10:30">10:30</option>
                            <option value="11:00">11:00</option>
                            <option value="11:30">11:30</option>
                            <option value="12:00">12:00</option>
                            <option value="12:30">12:30</option>
                            <option value="13:00">13:00</option>
                            <option value="13:30">13:30</option>
                            <option value="14:00">14:00</option>
                            <option value="14:30">14:30</option>
                            <option value="15:00">15:00</option>
                            <option value="15:30">15:30</option>
                            <option value="16:00">16:00</option>
                            <option value="16:30">16:30</option>
                            <option value="17:00">17:00</option>
                            <option value="17:30">17:30</option>
                            <option value="18:00">18:00</option>
                            <option value="18:30">18:30</option>
                            <option value="19:00">19:00</option>
                            <option value="19:30">19:30</option>
                            <option value="20:00">20:00</option>
                            <option value="20:30">20:30</option>
                            <option value="21:00">21:00</option>
                            <option value="21:30">21:30</option>
                            <option value="22:00">22:00</option>
                            <option value="22:30">22:30</option>
                            <option value="23:00">23:00</option>
                            <option value="23:30">23:30</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* customer details */}
                  <div className="col-lg-6">
                    <h4>Nhập thông tin chi tiết</h4>
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="field-set">
                          <input
                            type="text"
                            name="Name"
                            id="name"
                            className="form-control"
                            placeholder="Nhập họ và tên"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="field-set">
                          <input
                            type="email"
                            name="Email"
                            id="email"
                            className="form-control"
                            placeholder="Nhập email của bạn"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="field-set">
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="form-control"
                            placeholder="Nhập số điện thoại "
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="field-set">
                          <textarea
                            name="message"
                            id="message"
                            className="form-control"
                            placeholder="Bạn có lời nhắn gì không?"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <input
                      type="submit"
                      id="send_message"
                      defaultValue="Submit"
                      className="btn-main btn-fullwidth"
                    />
                  </div>
                  <div className="col-lg-4">
                    <div
                      className="g-recaptcha"
                      data-sitekey="6LdW03QgAAAAAJko8aINFd1eJUdHlpvT4vNKakj6"
                    />
                  </div>
                </form>
                <div id="success_message" className="success s2">
                  <div className="row">
                    <div className="col-lg-8 offset-lg-2 text-light text-center">
                      <h3 className="mb-2">
                        Congratulations! Your booking has been sent
                        successfully. We will contact you shortly.
                      </h3>
                      Refresh this page if you want to booking again.
                      <div className="spacer-20" />
                      <a
                        className="btn-main btn-black"
                        href="quick-booking.html"
                      >
                        Reload this page
                      </a>
                    </div>
                  </div>
                </div>
                <div id="error_message" className="error">
                  Sorry there was an error sending your form.
                </div>
              </div>
            </div>
          </div>
          <div className="spacer-double" />
          <div className="row text-light">
            <div className="col-lg-12">
              <div className="container-timeline">
                <ul>
                  <li>
                    <h4>Chọn một chiếc xe</h4>
                    <p>
                      Mở ra những cuộc phiêu lưu vô song và những hành trình
                      đáng nhớ với đội xe hùng hậu của chúng tôi được thiết kế
                      riêng để phù hợp với mọi nhu cầu, sở thích và điểm đến.
                    </p>
                  </li>
                  <li>
                    <h4>Chọn địa điểm và ngày</h4>
                    <p>
                      Hãy chọn địa điểm và ngày lý tưởng, và để chúng tôi đưa
                      bạn vào một hành trình đầy tiện lợi, linh hoạt và những
                      trải nghiệm khó quên.
                    </p>
                  </li>
                  <li>
                    <h4>Đặt chỗ</h4>
                    <p>
                      Đảm bảo đặt chỗ của bạn một cách dễ dàng, mở ra một thế
                      giới đầy tiềm năng và tự tin bắt đầu cuộc phiêu lưu tiếp
                      theo của bạn.
                    </p>
                  </li>
                  <li>
                    <h4>Ngồi lại và thư giãn</h4>
                    <p>
                      Sự tiện lợi không rắc rối khi chúng tôi chăm chút từng chi
                      tiết, cho phép bạn thư giãn và tận hưởng sự thoải mái
                      trong suốt chuyến đi.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <>
        <section className="text-light jarallax">
          <img src="images/background/3.jpg" className="jarallax-img" alt="" />
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6 wow fadeInRight">
                <h2>
                  Chúng tôi sẽ cung cấp cho khách hàng nhiều loại{" "}
                  <span className="id-color">khuyến mãi ưu đãi</span> and{" "}
                  <span className="id-color">dịch vụ đặc biệt</span> cho mọi
                  dịp.
                </h2>
              </div>
              <div className="col-lg-6 wow fadeInLeft">
                Tại dịch vụ đặt vé xe trực tuyến của chúng tôi, chúng tôi tin
                rằng ai cũng xứng đáng được trải nghiệm một chuyến đi an toàn và
                thoải mái, bất kể ngân sách là bao nhiêu. Chúng tôi đã hợp tác
                với nhiều hãng xe uy tín và đảm bảo chất lượng, từ xe giường nằm
                cao cấp đến xe ghế ngồi tiện nghi, tất cả đều có mức giá cạnh
                tranh. Với quy trình đặt vé nhanh chóng, bạn có thể dễ dàng lựa
                chọn và đặt chuyến xe phù hợp ngay trên nền tảng của chúng tôi.
                Dù bạn cần một chuyến xe cho công việc, du lịch cùng gia đình
                hay chỉ đơn giản là một chuyến đi ngắn cuối tuần, chúng tôi luôn
                có các tùy chọn linh hoạt để đáp ứng lịch trình và nhu cầu của
                bạn.
              </div>
            </div>
            <div className="spacer-double" />
            <div className="row text-center">
              <div className="col-md-3 col-sm-6 mb-sm-30">
                <div className="de_count transparent text-light wow fadeInUp">
                  <h3 className="timer" data-to={15425} data-speed={3000}>
                    0
                  </h3>
                  Đơn hàng thành công
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-sm-30">
                <div className="de_count transparent text-light wow fadeInUp">
                  <h3 className="timer" data-to={8745} data-speed={3000}>
                    0
                  </h3>
                  Khách hàng hài lòng
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-sm-30">
                <div className="de_count transparent text-light wow fadeInUp">
                  <h3 className="timer" data-to={235} data-speed={3000}>
                    0
                  </h3>
                  Đội ngũ xe
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-sm-30">
                <div className="de_count transparent text-light wow fadeInUp">
                  <h3 className="timer" data-to={15} data-speed={3000}>
                    0
                  </h3>
                  Năm kinh nghiệm
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          aria-label="section"
          className="pt40 pb40 text-light"
          data-bgcolor="#181818"
        >
          <div className="wow fadeInRight d-flex">
            <div className="de-marquee-list">
              <div className="d-item">
                <span className="d-item-txt">SUV</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Hatchback</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Crossover</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Convertible</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Sedan</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Sports Car</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Coupe</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Minivan</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Station Wagon</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Truck</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Minivans</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Exotic Cars</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
              </div>
            </div>
            <div className="de-marquee-list">
              <div className="d-item">
                <span className="d-item-txt">SUV</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Hatchback</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Crossover</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Convertible</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Sedan</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Sports Car</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Coupe</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Minivan</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Station Wagon</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Truck</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Minivans</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
                <span className="d-item-txt">Exotic Cars</span>
                <span className="d-item-display">
                  <i className="d-item-dot" />
                </span>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default QuickBooking;

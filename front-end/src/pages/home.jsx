import React, { useEffect } from "react";

function HomePage(props) {
  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top" />
        <h2>Hhelooooooooooooooooooooooooooooooooooo</h2>
        <section
          id="section-hero"
          aria-label="section"
          className="jarallax no-top no-bottom"
          data-video-src="https://www.youtube.com/watch?v=5qbjKpxfD64"
        >
          <div className="overlay-bg no-top no-bottom">
            <div className="v-center">
              <div className="container position-relative z1000">
                <div className="spacer-double d-lg-none d-sm-block" />
                <div className="spacer-double d-lg-none d-sm-block" />
                <div className="spacer-double d-lg-none d-sm-block" />
                <div className="row align-items-center">
                  <div className="col-lg-6 text-light">
                    <h4>
                      <span className="id-color">
                        Cách nhanh chóng và dễ dàng để đặt được 1 chuyến xe
                      </span>
                    </h4>
                    <div className="spacer-10" />
                    <h1 className="mb-2" style={{ fontSize: "45px" }}>
                      Trải nghiệm với những chiếc xe thoải mái và khám phá với
                      dịch vụ tốt
                    </h1>
                    <div className="spacer-10" />
                    {/* <p className="lead">
                      Embark on unforgettable adventures and discover the world
                      in unparalleled comfort and style with our fleet of
                      exceptionally comfortable cars.
                    </p> */}
                  </div>
                  <div className="col-lg-6">
                    <div className="spacer-single sm-hide" />
                    <div
                      className="p-4 rounded-3 shadow-soft text-light"
                      data-bgcolor="rgba(0, 0, 0, .6)"
                    >
                      <form name="contactForm" id="contact_form" method="post">
                        <h5>Bạn muốn chọn loại xe nào?</h5>
                        <div className="de_form de_radio row g-3">
                          <div className="radio-img col-lg-3 col-sm-3 col-6">
                            <input
                              id="radio-1a"
                              name="Car_Type"
                              type="radio"
                              defaultValue="Residential"
                              defaultChecked="checked"
                            />
                            <label htmlFor="radio-1a">
                              <img src="images/select-form/car.png" alt="" />
                              Car
                            </label>
                          </div>
                          <div className="radio-img col-lg-3 col-sm-3 col-6" >
                            <input
                              id="radio-1b"
                              name="Car_Type"
                              type="radio"
                              defaultValue="Office"
                            />
                            <label htmlFor="radio-1b">
                              <img src="images/select-form/van.png" alt="" />
                              Van
                            </label>
                          </div>
                          <div className="radio-img col-lg-3 col-sm-3 col-6">
                            <input
                              id="radio-1c"
                              name="Car_Type"
                              type="radio"
                              defaultValue="Commercial"
                            />
                            <label htmlFor="radio-1c">
                              <img
                                src="images/select-form/minibus.png"
                                alt=""
                              />
                              Minibus
                            </label>
                          </div>
                          <div className="radio-img col-lg-3 col-sm-3 col-6">
                            <input
                              id="radio-1d"
                              name="Car_Type"
                              type="radio"
                              defaultValue="Retail"
                            />
                            <label htmlFor="radio-1d">
                              <img
                                src="images/select-form/sportscar.png"
                                alt=""
                              />
                              Prestige
                            </label>
                          </div>
                        </div>
                        <div className="spacer-20" />
                        <div className="row">
                          <div className="col-lg-6 mb20">
                            <h5>Địa điểm đi</h5>
                            <input
                              type="text"
                              name="PickupLocation"
                              onfocus="geolocate()"
                              placeholder="Nhập địa điểm đi"
                              id="autocomplete"
                              autoComplete="off"
                              className="form-control"
                            />
                            <div className="jls-address-preview jls-address-preview--hidden">
                              <div className="jls-address-preview__header"></div>
                            </div>
                          </div>
                          <div className="col-lg-6 mb20">
                            <h5>Địa điểm đến</h5>
                            <input
                              type="text"
                              name="DropoffLocation"
                              onfocus="geolocate()"
                              placeholder="Nhập địa điểm trả"
                              id="autocomplete2"
                              autoComplete="off"
                              className="form-control"
                            />
                            <div className="jls-address-preview jls-address-preview--hidden">
                              <div className="jls-address-preview__header"></div>
                            </div>
                          </div>
                          <div className="col-lg-6 mb20">
                            <h5>Thời gian đi</h5>
                            <div className="date-time-field">
                              <input
                                type="text"
                                id="date-picker"
                                name="Pick Up Date"
                                defaultValue=""
                              />
                              <select name="Pick Up Time" id="pickup-time">
                                <option
                                  selected=""
                                  disabled=""
                                  value="Select time"
                                >
                                  Time
                                </option>
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
                          <div className="col-lg-6 mb20">
                            <h5>Thời gian trả</h5>
                            <div className="date-time-field">
                              <input
                                type="text"
                                id="date-picker-2"
                                name="Collection Date"
                                defaultValue=""
                              />
                              <select
                                name="Collection Time"
                                id="collection-time"
                              >
                                <option
                                  selected=""
                                  disabled=""
                                  value="Select time"
                                >
                                  Time
                                </option>
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
                        <input
                          type="submit"
                          id="send_message"
                          defaultValue="Find a Vehicle"
                          className="btn-main pull-right"
                        />
                        <div className="clearfix" />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="spacer-double d-lg-none d-sm-block" />
                <div className="spacer-double d-lg-none d-sm-block" />
              </div>
              <div className="position-absolute d-flex bottom-20">
                <div className="de-marquee-list d-marquee-small">
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
                <div className="de-marquee-list d-marquee-small">
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
            </div>
          </div>
        </section>
        <section aria-label="section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 offset-lg-3 text-center">
                <h2>Lợi ích khi chọn chúng tôi</h2>
                <p>
                  Chúng tôi cam kết giúp bạn trải nghiệm hành trình di chuyển an
                  toàn, thoải mái và tiện lợi nhất. Mỗi chuyến đi đều được đảm
                  bảo bởi các đối tác vận tải uy tín, hệ thống cập nhật liên tục
                  về giá vé, giờ xe chạy và chỗ ngồi trống để bạn có thể lựa
                  chọn linh hoạt theo nhu cầu.
                </p>
                <div className="spacer-20" />
              </div>
              <div className="clearfix" />
              <div className="col-lg-3">
                <div
                  className="box-icon s2 p-small mb20 wow fadeInRight"
                  data-wow-delay=".5s"
                >
                  <i class="fa bg-color fa-couch" />
                  <div className="d-inner">
                    <h4>Chỗ ngồi linh hoạt</h4>
                    Tùy chọn chỗ ngồi theo ý thích của bạn. Dễ dàng xem và chọn
                    ghế ngay trên giao diện đặt vé, cập nhật trạng thái ghế
                    trống và ghế đã được chọn.
                  </div>
                </div>
                <div
                  className="box-icon s2 p-small mb20 wow fadeInL fadeInRight"
                  data-wow-delay=".75s"
                >
                  <i class="fa bg-color fa-headset" />
                  <div className="d-inner">
                    <h4>Hỗ trợ khách hàng 24/7</h4>
                    Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn trước,
                    trong và sau hành trình.
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <img
                  src="images/misc/car-2.png"
                  alt=""
                  className="img-fluid wow fadeInUp"
                />
              </div>
              <div className="col-lg-3">
                <div
                  className="box-icon s2 d-invert p-small mb20 wow fadeInL fadeInLeft"
                >
                  <i class="fa bg-color fa-money-check" />
                  <div className="d-inner">
                    <h4>Thanh toán an toàn</h4>
                    Hỗ trợ thanh toán đa dạng và bảo mật tuyệt đối, mang lại sự
                    an tâm tuyệt đối khi giao dịch trực tuyến.
                  </div>
                </div>
                <div
                  className="box-icon s2 d-invert p-small mb20 wow fadeInL fadeInLeft"
                >
                  <i class="fa bg-color fa-ticket" />
                  <div className="d-inner">
                    <h4>Dễ dàng đặt vé</h4>
                    Hỗ trợ tìm kiếm và đặt vé nhanh chóng qua hệ thống trực
                    tuyến với nhiều lựa chọn tuyến đường, giờ khởi hành và loại
                    xe.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="text-light jarallax">
          <img src="images/background/2.jpg" className="jarallax-img" alt="" />
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
                  <h3 className="timer" data-to={1} data-speed={3000}>
                    0
                  </h3>
                  Năm kinh nghiệm
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="section-img-with-tab" className="bg-dark text-light">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 offset-lg-7">
                <h2>Only Quality For Clients</h2>
                <div className="spacer-20" />
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Luxury
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Comfort
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      Prestige
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <p>
                      We offer a meticulously curated collection of the most
                      sought-after luxury vehicles on the market. Whether you
                      prefer the sporty allure of a high-performance sports car,
                      the sophistication of a sleek and luxurious sedan, or the
                      versatility of a premium SUV, we have the perfect car to
                      match your discerning taste.
                    </p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <p>
                      We prioritize your comfort and convenience throughout your
                      journey. We understand that a comfortable ride can make a
                      world of difference, whether you're embarking on a
                      business trip or enjoying a leisurely vacation. That's why
                      we offer a wide range of well-maintained, comfortable cars
                      that cater to your specific needs.
                    </p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    <p>
                      We understand that prestige goes beyond luxury. It's about
                      making a statement, embracing sophistication, and
                      indulging in the finer things in life. That's why we offer
                      an exclusive selection of prestigious cars that exude
                      elegance, style, and status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="image-container col-md-6 pull-right"
            data-bgimage="url(images/misc/e2.jpg) center"
          />
        </section> */}
        <section id="section-news">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 offset-lg-3 text-center">
                <h2>Tin tức mới nhất</h2>
                <p>
                  Tin tức mới nhất, góc nhìn mới và phạm vi đưa tin chuyên sâu -
                  hãy cập nhật những tin tức, thông tin chuyên sâu và phân tích
                  mới nhất của chúng tôi.
                </p>
                <div className="spacer-20" />
              </div>
              <div className="col-lg-4 mb10">
                <div className="bloglist s2 item">
                  <div className="post-content">
                    <div className="post-image">
                      <div className="date-box">
                        <div className="m">10</div>
                        <div className="d">MAR</div>
                      </div>
                      <img
                        alt=""
                        src="images/news/pic-blog-1.jpg"
                        className="lazy"
                      />
                    </div>
                    <div className="post-text">
                      <h4>
                        <a href="news-single.html">
                        {/* VSM THỐNG NHẤT TỔNG ĐÀI ĐẶT VÉ 24/7 CHO QUÝ KHÁCH */}
                       VSM thống nhất tổng đài đặt vé 24/7 cho quý khách
                          <span />
                        </a>
                      </h4>
                      <p>
                      VSM tuyến Huế-Đà Nẵng thống nhất tổng đài đặt vé qua số điện thoại 1900.90.90.60
                      </p>
                      <a className="btn-main" href="#">
                        Đọc thêm
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb10">
                <div className="bloglist s2 item">
                  <div className="post-content">
                    <div className="post-image">
                      <div className="date-box">
                        <div className="m">12</div>
                        <div className="d">MAR</div>
                      </div>
                      <img
                        alt=""
                        src="images/news/pic-blog-2.jpg"
                        className="lazy"
                      />
                    </div>
                    <div className="post-text">
                      <h4>
                        <a href="news-single.html">
                        Tạm dừng hoạt động một số tuyến do ảnh hưởng của bão Trà Mi
                          <span />
                        </a>
                      </h4>
                      <p>
                        TẠM DỪNG HOẠT ĐỘNG MỘT SỐ TUYẾN DO BÃO SỐ TRÀ MI ĐỔ BỘ ngày 26/10/2024
                      </p>
                      <a className="btn-main" href="#">
                        Đọc thêm
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb10">
                <div className="bloglist s2 item">
                  <div className="post-content">
                    <div className="post-image">
                      <div className="date-box">
                        <div className="m">14</div>
                        <div className="d">MAR</div>
                      </div>
                      <img
                        alt=""
                        src="images/news/pic-blog-3.jpg"
                        className="lazy"
                      />
                    </div>
                    <div className="post-text">
                      <h4>
                        <a href="news-single.html">
                        
                        Khách hàng được sử dụng WIFI miễn phí khi sử dụng dịch vụ VSM
                          <span />
                        </a>
                      </h4>
                      <p>
                      VSM trang bị truy nhập Internet miễn phí qua sóng Wifi cho toàn bộ đội xe
                      </p>
                      <a className="btn-main" href="#">
                        Đọc thêm
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="section-call-to-action"
          className="bg-color-2 pt60 pb60 text-light"
        >
          <div className="container">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 offset-lg-2">
                  <span className="subtitle text-white">
                  Hãy gọi cho chúng tôi để biết thêm thông tin
                  </span>
                  <h2 className="s2">
                  Bộ phận chăm sóc khách hàng của VSM luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào.
                  </h2>
                </div>
                <div className="col-lg-4 text-lg-center text-sm-center">
                  <div className="phone-num-big">
                    <i className="fa fa-phone" />
                    <span className="pnb-text">Gọi cho chúng tôi ngay</span>
                    <span className="pnb-num">1 200 333 800</span>
                  </div>
                  <a href="#" className="btn-main">
                    Liên Hệ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <a href="#" id="back-to-top" />
    </>
  );
}

export default HomePage;

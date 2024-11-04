import React from "react";

const AboutUs = () => {
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
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Giới thiệu về chúng tôi</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      {/* section close */}
      <section>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInRight">
              <h2>
                Chúng tôi sẽ cung cấp cho khách hàng nhiều loại{" "}
                <span className="id-color">khuyến mãi ưu đãi</span> and{" "}
                <span className="id-color">dịch vụ đặc biệt</span> cho mọi dịp.
              </h2>
            </div>
            <div className="col-lg-6 wow fadeInRight" data-wow-delay=".25s">
              Tại dịch vụ đặt vé xe trực tuyến của chúng tôi, chúng tôi tin rằng
              ai cũng xứng đáng được trải nghiệm một chuyến đi an toàn và thoải
              mái, bất kể ngân sách là bao nhiêu. Chúng tôi đã hợp tác với nhiều
              hãng xe uy tín và đảm bảo chất lượng, từ xe giường nằm cao cấp đến
              xe ghế ngồi tiện nghi, tất cả đều có mức giá cạnh tranh. Với quy
              trình đặt vé nhanh chóng, bạn có thể dễ dàng lựa chọn và đặt
              chuyến xe phù hợp ngay trên nền tảng của chúng tôi. Dù bạn cần một
              chuyến xe cho công việc, du lịch cùng gia đình hay chỉ đơn giản là
              một chuyến đi ngắn cuối tuần, chúng tôi luôn có các tùy chọn linh
              hoạt để đáp ứng lịch trình và nhu cầu của bạn.
            </div>
          </div>
          <div className="spacer-double" />
          <div className="row text-center">
            <div className="col-md-3 col-sm-6 mb-sm-30">
              <div className="de_count wow fadeInUp" data-bgcolor="#f5f5f5">
                <h3 className="timer" data-to={15425} data-speed={3000}>
                  0
                </h3>
                Đơn hàng thành công
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-sm-30">
              <div className="de_count wow fadeInUp" data-bgcolor="#f5f5f5">
                <h3 className="timer" data-to={8745} data-speed={3000}>
                  0
                </h3>
                Khách hàng hài lòng
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-sm-30">
              <div className="de_count wow fadeInUp" data-bgcolor="#f5f5f5">
                <h3 className="timer" data-to={235} data-speed={3000}>
                  0
                </h3>
                Đội ngũ xe
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-sm-30">
              <div className="de_count wow fadeInUp" data-bgcolor="#f5f5f5">
                <h3 className="timer" data-to={15} data-speed={3000}>
                  0
                </h3>
                Năm kinh nghiệm
              </div>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="section" className="jarallax text-light">
        <img src="images/background/8.jpg" className="jarallax-img" alt="" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>Các thành viên </h2>
              <div className="spacer-20" />
            </div>
            <div className="col-lg-12 col-md-6 col-sm-6 mb30">
              <div className="f-profile text-center">
                <div className="fp-wrap f-invert">
                  <div className="fpw-overlay">
                    <div className="fpwo-wrap">
                      {/* <div className="fpwow-icons">
                    <a href="#">
                      <i className="fa fa-facebook fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-linkedin fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-pinterest fa-lg" />
                    </a>
                  </div> */}
                    </div>
                  </div>
                  <div className="fpw-overlay-btm" />
                  <img
                    src="images/team/1.jpg"
                    className="fp-image img-fluid"
                    alt=""
                  />
                </div>
                <h4>Phạm Phước Thiện</h4>
                Leader
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mb30">
              <div className="f-profile text-center">
                <div className="fp-wrap f-invert">
                  <div className="fpw-overlay">
                    <div className="fpwo-wrap">
                      {/* <div className="fpwow-icons">
                    <a href="#">
                      <i className="fa fa-facebook fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-linkedin fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-pinterest fa-lg" />
                    </a>
                  </div> */}
                    </div>
                  </div>
                  <div className="fpw-overlay-btm" />
                  <img
                    src="images/team/2.jpg"
                    className="fp-image img-fluid"
                    alt=""
                  />
                </div>
                <h4>Nguyễn Đức Hải Nam</h4>
                {/* Chief Technology Officer */}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mb30">
              <div className="f-profile text-center">
                <div className="fp-wrap f-invert">
                  <div className="fpw-overlay">
                    <div className="fpwo-wrap">
                     
                    </div>
                  </div>
                  <div className="fpw-overlay-btm" />
                  <img
                    src="images/team/3.jpg"
                    className="fp-image img-fluid"
                    alt=""
                  />
                </div>
                <h4>Nguyễn Văn Duy</h4>
                {/* Chief Executive Officer */}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mb30">
              <div className="f-profile text-center">
                <div className="fp-wrap f-invert">
                  <div className="fpw-overlay">
                    <div className="fpwo-wrap">
                      {/* <div className="fpwow-icons">
                    <a href="#">
                      <i className="fa fa-facebook fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-linkedin fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-pinterest fa-lg" />
                    </a>
                  </div> */}
                    </div>
                  </div>
                  <div className="fpw-overlay-btm" />
                  <img
                    src="images/team/3.jpg"
                    className="fp-image img-fluid"
                    alt=""
                  />
                </div>
                <h4>Nguyễn Đình Nhật</h4>
                {/* Chief Executive Officer */}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mb30">
              <div className="f-profile text-center">
                <div className="fp-wrap f-invert">
                  <div className="fpw-overlay">
                    <div className="fpwo-wrap">
                      {/* <div className="fpwow-icons">
                    <a href="#">
                      <i className="fa fa-facebook fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-linkedin fa-lg" />
                    </a>
                    <a href="#">
                      <i className="fa fa-pinterest fa-lg" />
                    </a>
                  </div> */}
                    </div>
                  </div>
                  <div className="fpw-overlay-btm" />
                  <img
                    src="images/team/3.jpg"
                    className="fp-image img-fluid"
                    alt=""
                  />
                </div>
                <h4>Nguyễn Xuân Quang</h4>
                {/* Chief Executive Officer */}
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
      
      <section
        id="section-call-to-action"
        className="bg-color-2 pt60 pb60 text-light"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2 className="s2">
              Hãy gọi cho chúng tôi để biết thêm thông tin. Bộ phận chăm sóc khách hàng của VSM luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào.
              </h2>
            </div>
            <div className="col-lg-4 text-lg-center text-sm-center">
              <div className="phone-num-big">
                <i className="fa fa-phone" />
                <span className="pnb-text">Gọi cho chúng tôi ngay</span>
                <span className="pnb-num">1 200 333 800</span>
              </div>
              <a href="#" className="btn-main">
                Liên hệ với chúng tôi
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

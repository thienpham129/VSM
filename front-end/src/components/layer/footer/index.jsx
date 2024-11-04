import React from "react";

const Footer = () => {
  return (
      <footer className="text-light">
        <div className="container">
          <div className="row g-custom-x">
            <div className="col-lg-3">
              <div className="widget">
                <h5>Giới thiệu về chúng tôi</h5>
                <p>
                Chào mừng bạn đến với nền tảng đặt vé xe trực tuyến của chúng tôi! Chúng tôi tự hào mang đến một giải pháp tiện lợi, nhanh chóng và đáng tin cậy cho nhu cầu di chuyển của bạn. Với dịch vụ đặt vé xe trực tuyến, bạn không cần phải đến tận nơi mua vé hay lo lắng về việc vé xe hết trước ngày khởi hành. Chỉ với vài thao tác đơn giản trên điện thoại hoặc máy tính, bạn có thể dễ dàng đặt vé mọi lúc, mọi nơi.
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="widget">
                <h5>Liên Hệ</h5>
                <address className="s1">
                  <span>
                    <i className="id-color fa fa-map-marker fa-lg" />
                    Đại học FPT
                  </span>
                  <span>
                    <i className="id-color fa fa-phone fa-lg" />
                    07777832143
                  </span>
                  <span>
                    <i className="id-color fa fa-envelope-o fa-lg" />
                    <a href="mailto:contact@example.com">vsm@email.com</a>
                  </span>
                  
                </address>
              </div>
            </div>
            <div className="col-lg-3">
              <h5>Về VSM</h5>
              <div className="row">
                <div className="col-lg-6">
                  <div className="widget">
                    <ul>
                      <li>
                        <a href="/aboutUs">Giới thiệu</a>
                      </li>
                      <li>
                        <a href="/blog">Tin Tức</a>
                      </li>
                      <li>
                        <a href="/contact">Liên hệ</a>
                      </li>
                     
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="widget">
                <h5>Social Network</h5>
                <div className="social-icons">
                  <a href="#">
                    <i class="fa-brands fa-facebook fa-lg" ></i>
                  </a>
                  <a href="#">
                    <i class="fa-brands fa-twitter fa-lg" />
                  </a>
                  <a href="#">
                    <i class="fa-brands fa-linkedin fa-lg"></i>
                  </a>
                  <a href="#">
                    <i class="fa-brands fa-pinterest fa-lg"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-rss fa-lg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </footer>
  );
};

export default Footer;

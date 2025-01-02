import React from "react";

const Contact = () => {
  return (
    <div className="no-bottom no-top" id="content">
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
                <h1>Đánh Giá</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      {/* section close */}
      <section aria-label="section">
        <div className="container">
          <div className="row g-custom-x">
            <div className="col-lg-8 mb-sm-30">
              <h3>Bạn có thắc mắc hay nhận xét gì không?</h3>
              <form
                name="contactForm"
                id="contact_form"
                className="form-border"
                method="post"
                action="#"
              >
                <div className="row">
                  <div className="col-md-6 mb10">
                    <div className="field-set">
                      <input
                        type="text"
                        name="Name"
                        id="name"
                        className="form-control"
                        placeholder="Nhập tên của bạn"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb10">
                    <div className="field-set">
                      <input
                        type="text"
                        name="Email"
                        id="email"
                        className="form-control"
                        placeholder="Nhập email"
                        required=""
                      />
                    </div>
                  </div>
                </div>
                <div className="field-set mb20">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    placeholder="Lời nhắn"
                    required=""
                    defaultValue={""}
                  />
                </div>
                <div
                  className="g-recaptcha"
                  data-sitekey="6LdW03QgAAAAAJko8aINFd1eJUdHlpvT4vNKakj6"
                />
                <div id="submit" className="mt20">
                  <input
                    type="submit"
                    id="send_message"
                    defaultValue="Send Message"
                    className="btn-main"
                  />
                </div>
                <div id="success_message" className="success">
                  Your message has been sent successfully. Refresh this page if
                  you want to send more messages.
                </div>
                <div id="error_message" className="error">
                  Sorry there was an error sending your form.
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="de-box mb30">
                <h4>VSM Office</h4>
                <address className="s1">
                  <span>
                    <i className="id-color fa fa-map-marker fa-lg" />
                    Đại học FPT
                  </span>
                  <span>
                    <i className="id-color fa fa-phone fa-lg" />
                    +1 333 9296
                  </span>
                  <span>
                    <i className="id-color fa fa-envelope-o fa-lg" />
                    <a href="mailto:contact@example.com">vsm@email.com</a>
                  </span>
                  
                </address>
              </div>
              {/* <div className="de-box mb30">
                <h4>AU Office</h4>
                <address className="s1">
                  <span>
                    <i className="fa fa-map-marker fa-lg" />
                    100 Mainstreet Center, Sydney
                  </span>
                  <span>
                    <i className="fa fa-phone fa-lg" />
                    +61 333 9296
                  </span>
                  <span>
                    <i className="fa fa-envelope-o fa-lg" />
                    <a href="mailto:contact@example.com">contact@example.com</a>
                  </span>
                  <span>
                    <i className="fa fa-file-pdf-o fa-lg" />
                    <a href="#">Download Brochure</a>
                  </span>
                </address>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

import React, { useEffect, useState } from "react";
import SellectAddress from "components/SellectAddress";

import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "services/app";
const QuickBooking = () => {
  // Pick-up location state
  const [pickupSpecificAddress, setPickupSpecificAddress] = useState("");
  const [pickupProvinces, setPickupProvinces] = useState([]);
  const [pickupDistricts, setPickupDistricts] = useState([]);
  const [pickupWards, setPickupWards] = useState([]);
  const [pickupProvince, setPickupProvince] = useState("");
  const [pickupDistrict, setPickupDistrict] = useState("");
  const [pickupWard, setPickupWard] = useState("");

  // Drop-off location state
  const [dropoffSpecificAddress, setDropoffSpecificAddress] = useState("");
  const [dropoffProvinces, setDropoffProvinces] = useState([]);
  const [dropoffDistricts, setDropoffDistricts] = useState([]);
  const [dropoffWards, setDropoffWards] = useState([]);
  const [dropoffProvince, setDropoffProvince] = useState("");
  const [dropoffDistrict, setDropoffDistrict] = useState("");
  const [dropoffWard, setDropoffWard] = useState("");

  // Handle change for specific addresses
  const handlePickupSpecificAddressChange = (event) => {
    setPickupSpecificAddress(event.target.value);
  };

  const handleDropoffSpecificAddressChange = (event) => {
    setDropoffSpecificAddress(event.target.value);
  };

  // Fetch provinces once and use them for both pick-up and drop-off
  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setPickupProvinces(response.data.results);
        setDropoffProvinces(response.data.results);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch districts and wards for pick-up location based on province and district selection
  useEffect(() => {
    const fetchPickupDistricts = async () => {
      const response = await apiGetPublicDistrict(pickupProvince);
      if (response.status === 200) {
        setPickupDistricts(response.data.results);
      }
    };
    pickupProvince && fetchPickupDistricts();

    setPickupDistrict("");
    setPickupWards([]);
  }, [pickupProvince]);

  useEffect(() => {
    const fetchPickupWards = async () => {
      const response = await apiGetPublicWard(pickupDistrict);
      if (response.status === 200) {
        setPickupWards(response.data.results);
      }
    };
    pickupDistrict && fetchPickupWards();

    setPickupWard("");
  }, [pickupDistrict]);

  // Fetch districts and wards for drop-off location based on province and district selection
  useEffect(() => {
    const fetchDropoffDistricts = async () => {
      const response = await apiGetPublicDistrict(dropoffProvince);
      if (response.status === 200) {
        setDropoffDistricts(response.data.results);
      }
    };
    dropoffProvince && fetchDropoffDistricts();

    setDropoffDistrict("");
    setDropoffWards([]);
  }, [dropoffProvince]);

  useEffect(() => {
    const fetchDropoffWards = async () => {
      const response = await apiGetPublicWard(dropoffDistrict);
      if (response.status === 200) {
        setDropoffWards(response.data.results);
      }
    };
    dropoffDistrict && fetchDropoffWards();

    setDropoffWard("");
  }, [dropoffDistrict]);

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
                      <div className="col-lg-12">
                        <h5>Nhập địa điểm đón</h5>
                        <div className="row">
                          <div className="col-md-4 form-group">
                            <SellectAddress
                              type="province"
                              value={pickupProvince}
                              setValue={setPickupProvince}
                              options={pickupProvinces}
                              label="Province/City(Tỉnh)"
                            />
                          </div>
                          <div className="col-md-4 form-group">
                            <SellectAddress
                              type="district"
                              value={pickupDistrict}
                              setValue={setPickupDistrict}
                              options={pickupDistricts}
                              label="District(Quận)"
                            />
                          </div>
                          <div className="col-md-4 form-group">
                            <SellectAddress
                              type="ward"
                              value={pickupWard}
                              setValue={setPickupWard}
                              options={pickupWards}
                              label="Wards(phường)"
                            />
                          </div>
                          <div className="col-md-12 form-group">
                            <label style={{ marginRight: "20px" }}>
                              Address:{" "}
                            </label>
                            <input
                              type="text"
                              value={pickupSpecificAddress}
                              onChange={handlePickupSpecificAddressChange}
                              placeholder="Nhập địa chỉ cụ thể"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <h5>Nhập địa điểm trả</h5>
                        <div className="row">
                          <div className="col-md-4 form-group">
                            <SellectAddress
                              type="province"
                              value={dropoffProvince}
                              setValue={setDropoffProvince}
                              options={dropoffProvinces}
                              label="Province/City(Tỉnh)"
                            />
                          </div>
                          <div className="col-md-4 form-group">
                            <SellectAddress
                              type="district"
                              value={dropoffDistrict}
                              setValue={setDropoffDistrict}
                              options={dropoffDistricts}
                              label="District(Quận)"
                            />
                          </div>
                          <div className="col-md-4 form-group">
                            <SellectAddress
                              type="ward"
                              value={dropoffWard}
                              setValue={setDropoffWard}
                              options={dropoffWards}
                              label="Wards(phường)"
                            />
                          </div>
                          <div className="col-md-12 form-group">
                            <label style={{ marginRight: "20px" }}>
                              Address:{" "}
                            </label>
                            <input
                              type="text"
                              value={dropoffSpecificAddress}
                              onChange={handleDropoffSpecificAddressChange}
                              placeholder="Nhập địa chỉ cụ thể"
                            />
                          </div>
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
                  <div className="col-lg-12">
                    <input
                      type="submit"
                      className="btn-main pull-right"
                      value={"Đặt vé ngay"}
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

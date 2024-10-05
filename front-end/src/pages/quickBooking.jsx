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
                <h1>Quick Booking</h1>
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
                    <h4>Booking a Car</h4>
                    <select
                      name="Vehicle Type"
                      id="vehicle_type"
                      className="form-control"
                    >
                      <option
                        value="Jeep Renegade"
                        data-src="images/cars-alt/jeep-renegade.png"
                      >
                        Jeep Renegade - $265
                      </option>
                      <option
                        value="BMW M5"
                        data-src="images/cars-alt/bmw-m5.png"
                      >
                        BMW M5 - $544
                      </option>
                      <option
                        value="Ferrari Enzo"
                        data-src="images/cars-alt/ferrari-enzo.png"
                      >
                        Ferrari Enzo - $167
                      </option>
                      <option
                        value="Ford Raptor"
                        data-src="images/cars-alt/ford-raptor.png"
                      >
                        Ford Raptor - $147
                      </option>
                      <option
                        value="Mini Cooper"
                        data-src="images/cars-alt/mini-cooper.png"
                      >
                        Mini Cooper - $238
                      </option>
                      <option
                        value="Cheverolet Camaro"
                        data-src="images/cars-alt/vw-polo.png"
                      >
                        Cheverolet Camaro - $245
                      </option>
                      <option
                        value="Hyundai Staria"
                        data-src="images/cars-alt/hyundai-staria.png"
                      >
                        Hyundai Staria - $191
                      </option>
                      <option
                        value="Toyota Rav 4"
                        data-src="images/cars-alt/toyota-rav.png"
                      >
                        Toyota Rav 4 - $114
                      </option>
                      <option
                        value="Bentley"
                        data-src="images/cars-alt/bentley.png"
                      >
                        Bentley - $299
                      </option>
                      <option
                        value="Lexus"
                        data-src="images/cars-alt/lexus.png"
                      >
                        Lexus - $131
                      </option>
                      <option
                        value="Range Rover"
                        data-src="images/cars-alt/range-rover.png"
                      >
                        Range Rover - $228
                      </option>
                    </select>
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <h5>Pick Up Location</h5>
                        <select
                          name="Pick Up Location"
                          id="pick_up_location"
                          className="form-control opt-1-disable"
                          required=""
                        >
                          <option value="New York">
                            Enter your pickup location
                          </option>
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
                        <h5>Destination</h5>
                        <select
                          name="Destination"
                          id="destination"
                          className="form-control opt-1-disable"
                          required=""
                        >
                          <option value="New York">
                            Enter your destination
                          </option>
                          <option value="New York">New York</option>
                          <option value="PennsylDvania">Pennsylvania</option>
                          <option value="New Jersey">New Jersey</option>
                          <option value="Connecticut">Connecticut</option>
                          <option value="Massachusetts">Massachusetts</option>
                          <option value="Vermont">Vermont</option>
                          <option value="Rhode Island">Rhode Island</option>
                          <option value="New Hampshire">New Hampshire</option>
                        </select>
                      </div>
                      <div className="col-lg-6">
                        <h5>Pick Up Date &amp; Time</h5>
                        <div className="date-time-field">
                          <input
                            type="text"
                            id="date-picker"
                            name="Pick Up Date"
                            defaultValue=""
                          />
                          <select name="Pick Up Time" id="pickup-time">
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
                      <div className="col-lg-6">
                        <h5>Return Date &amp; Time</h5>
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
                    <h4>Enter Your Details</h4>
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="field-set">
                          <input
                            type="text"
                            name="Name"
                            id="name"
                            className="form-control"
                            placeholder="Your Name"
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
                            placeholder="Your Email"
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
                            placeholder="Your Phone"
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
                            placeholder="Do you have any request?"
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
                    <h4>Choose a vehicle</h4>
                    <p>
                      Unlock unparalleled adventures and memorable journeys with
                      our vast fleet of vehicles tailored to suit every need,
                      taste, and destination.
                    </p>
                  </li>
                  <li>
                    <h4>Pick location &amp; date</h4>
                    <p>
                      Pick your ideal location and date, and let us take you on
                      a journey filled with convenience, flexibility, and
                      unforgettable experiences.
                    </p>
                  </li>
                  <li>
                    <h4>Make a booking</h4>
                    <p>
                      Secure your reservation with ease, unlocking a world of
                      possibilities and embarking on your next adventure with
                      confidence.
                    </p>
                  </li>
                  <li>
                    <h4>Sit back &amp; relax</h4>
                    <p>
                      Hassle-free convenience as we take care of every detail,
                      allowing you to unwind and embrace a journey filled
                      comfort.
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
                  We offer customers a wide range of{" "}
                  <span className="id-color">commercial cars</span> and{" "}
                  <span className="id-color">luxury cars</span> for any
                  occasion.
                </h2>
              </div>
              <div className="col-lg-6 wow fadeInLeft">
                At our car rental agency, we believe that everyone deserves to
                experience the pleasure of driving a reliable and comfortable
                vehicle, regardless of their budget. We have curated a diverse
                fleet of well-maintained cars, ranging from sleek sedans to
                spacious SUVs, all at competitive prices. With our streamlined
                rental process, you can quickly and conveniently reserve your
                desired vehicle. Whether you need transportation for a business
                trip, family vacation, or simply want to enjoy a weekend
                getaway, we have flexible rental options to accommodate your
                schedule.
              </div>
            </div>
            <div className="spacer-double" />
            <div className="row text-center">
              <div className="col-md-3 col-sm-6 mb-sm-30">
                <div className="de_count transparent text-light wow fadeInUp">
                  <h3 className="timer" data-to={15425} data-speed={3000}>
                    0
                  </h3>
                  Completed Orders
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-sm-30">
                <div className="de_count transparent text-light wow fadeInUp">
                  <h3 className="timer" data-to={8745} data-speed={3000}>
                    0
                  </h3>
                  Happy Customers
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-sm-30">
                <div className="de_count transparent text-light wow fadeInUp">
                  <h3 className="timer" data-to={235} data-speed={3000}>
                    0
                  </h3>
                  Vehicles Fleet
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-sm-30">
                <div className="de_count transparent text-light wow fadeInUp">
                  <h3 className="timer" data-to={15} data-speed={3000}>
                    0
                  </h3>
                  Years Experience
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

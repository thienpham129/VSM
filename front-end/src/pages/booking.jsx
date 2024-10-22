import React from 'react'

const Booking = () => {
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
            <h1>Booking</h1>
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
    className="no-top mt-80 sm-mt-0"
  >
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-12">
          <div className="spacer-single sm-hide" />
          <div className="p-4 rounded-3 shadow-soft" data-bgcolor="#ffffff">
            <form name="contactForm" id="contact_form" method="post">
              <div id="step-1" className="row">
                <div className="col-lg-6 mb30">
                  <h5>What is your vehicle type?</h5>
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
                    <div className="radio-img col-lg-3 col-sm-3 col-6">
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
                        <img src="images/select-form/minibus.png" alt="" />
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
                        <img src="images/select-form/sportscar.png" alt="" />
                        Prestige
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-6 mb20">
                      <h5>Pick Up Location</h5>
                      <input
                        type="text"
                        name="PickupLocation"
                        onfocus="geolocate()"
                        placeholder="Enter your pickup location"
                        id="autocomplete"
                        autoComplete="off"
                        className="form-control"
                      />
                      <div className="jls-address-preview jls-address-preview--hidden">
                        <div className="jls-address-preview__header"></div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb20">
                      <h5>Drop Off Location</h5>
                      <input
                        type="text"
                        name="DropoffLocation"
                        onfocus="geolocate()"
                        placeholder="Enter your dropoff location"
                        id="autocomplete2"
                        autoComplete="off"
                        className="form-control"
                      />
                      <div className="jls-address-preview jls-address-preview--hidden">
                        <div className="jls-address-preview__header"></div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb20">
                      <h5>Pick Up Date &amp; Time</h5>
                      <div className="date-time-field">
                        <input
                          type="text"
                          id="date-picker"
                          name="Pick Up Date"
                          defaultValue=""
                        />
                        <select name="Pick Up Time" id="pickup-time">
                          <option selected="" disabled="" value="Select time">
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
                      <h5>Return Date &amp; Time</h5>
                      <div className="date-time-field">
                        <input
                          type="text"
                          id="date-picker-2"
                          name="Collection Date"
                          defaultValue=""
                        />
                        <select name="Collection Time" id="collection-time">
                          <option selected="" disabled="" value="Select time">
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
                </div>
                <div className="col-lg-12">
                  <input
                    type="submit"
                    id="send_message"
                    defaultValue="Find a Vehicle"
                    className="btn-main pull-right"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="spacer-single" />
      <div className="row">
        <div className="col-md-3 wow fadeInRight" data-wow-delay=".2s">
          <div className="feature-box style-4 text-center">
            <a href="#">
              <i className="bg-color text-light i-boxed fa fa-car" />
            </a>
            <div className="text">
              <a href="#">
                <h4>Choose a vehicle</h4>
              </a>
              Unlock unparalleled adventures and memorable journeys with our
              vast fleet of vehicles tailored to suit every need, taste, and
              destination.
            </div>
            <span className="wm">1</span>
          </div>
        </div>
        <div className="col-md-3 wow fadeInRight" data-wow-delay=".4s">
          <div className="feature-box style-4 text-center">
            <a href="#">
              <i className="bg-color text-light i-boxed fa fa-calendar" />
            </a>
            <div className="text">
              <a href="#">
                <h4>Pick location &amp; date</h4>
              </a>
              Pick your ideal location and date, and let us take you on a
              journey filled with convenience, flexibility, and unforgettable
              experiences.
            </div>
            <span className="wm">2</span>
          </div>
        </div>
        <div className="col-md-3 wow fadeInRight" data-wow-delay=".6s">
          <div className="feature-box style-4 text-center">
            <a href="#">
              <i className="bg-color text-light i-boxed fa fa-pencil-square-o" />
            </a>
            <div className="text">
              <a href="#">
                <h4>Make a booking</h4>
              </a>
              Secure your reservation with ease, unlocking a world of
              possibilities and embarking on your next adventure with
              confidence.
            </div>
            <span className="wm">3</span>
          </div>
        </div>
        <div className="col-md-3 wow fadeInRight" data-wow-delay=".6s">
          <div className="feature-box style-4 text-center">
            <a href="#">
              <i className="bg-color text-light i-boxed fa fa-smile-o" />
            </a>
            <div className="text">
              <a href="#">
                <h4>Sit back &amp; relax</h4>
              </a>
              Hassle-free convenience as we take care of every detail, allowing
              you to unwind and embrace a journey filled comfort.
            </div>
            <span className="wm">3</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="text-light jarallax">
    <img src="images/background/3.jpg" className="jarallax-img" alt="" />
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6 wow fadeInRight">
          <h2>
            We offer customers a wide range of{" "}
            <span className="id-color">commercial cars</span> and{" "}
            <span className="id-color">luxury cars</span> for any occasion.
          </h2>
        </div>
        <div className="col-lg-6 wow fadeInLeft">
          At our car rental agency, we believe that everyone deserves to
          experience the pleasure of driving a reliable and comfortable vehicle,
          regardless of their budget. We have curated a diverse fleet of
          well-maintained cars, ranging from sleek sedans to spacious SUVs, all
          at competitive prices. With our streamlined rental process, you can
          quickly and conveniently reserve your desired vehicle. Whether you
          need transportation for a business trip, family vacation, or simply
          want to enjoy a weekend getaway, we have flexible rental options to
          accommodate your schedule.
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
</div>

  )
}

export default Booking
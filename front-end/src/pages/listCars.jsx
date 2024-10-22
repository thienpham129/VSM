import React from "react";

const ListCars = () => {
  return (
    <div className="no-bottom no-top zebra" id="content">
      <div id="top" />
      {/* section begin */}
      <section id="subheader" className="jarallax text-light">
        <img src="images/background/2.jpg" className="jarallax-img" alt="" />
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Cars</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      {/* section close */}
      <section id="section-cars">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="item_filter_group">
                <h4>Vehicle Type</h4>
                <div className="de_form">
                  <div className="de_checkbox">
                    <input
                      id="vehicle_type_1"
                      name="vehicle_type_1"
                      type="checkbox"
                      defaultValue="vehicle_type_1"
                    />
                    <label htmlFor="vehicle_type_1">Car</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="vehicle_type_2"
                      name="vehicle_type_2"
                      type="checkbox"
                      defaultValue="vehicle_type_2"
                    />
                    <label htmlFor="vehicle_type_2">Van</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="vehicle_type_3"
                      name="vehicle_type_3"
                      type="checkbox"
                      defaultValue="vehicle_type_3"
                    />
                    <label htmlFor="vehicle_type_3">Minibus</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="vehicle_type_4"
                      name="vehicle_type_4"
                      type="checkbox"
                      defaultValue="vehicle_type_4"
                    />
                    <label htmlFor="vehicle_type_4">Prestige</label>
                  </div>
                </div>
              </div>
              <div className="item_filter_group">
                <h4>Car Body Type</h4>
                <div className="de_form">
                  <div className="de_checkbox">
                    <input
                      id="car_body_type_1"
                      name="car_body_type_1"
                      type="checkbox"
                      defaultValue="car_body_type_1"
                    />
                    <label htmlFor="car_body_type_1">Convertible</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_body_type_2"
                      name="car_body_type_2"
                      type="checkbox"
                      defaultValue="car_body_type_2"
                    />
                    <label htmlFor="car_body_type_2">Coupe</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_body_type_3"
                      name="car_body_type_3"
                      type="checkbox"
                      defaultValue="car_body_type_3"
                    />
                    <label htmlFor="car_body_type_3">Exotic Cars</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_body_type_4"
                      name="car_body_type_4"
                      type="checkbox"
                      defaultValue="car_body_type_4"
                    />
                    <label htmlFor="car_body_type_4">Hatchback</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_body_type_5"
                      name="car_body_type_5"
                      type="checkbox"
                      defaultValue="car_body_type_5"
                    />
                    <label htmlFor="car_body_type_5">Minivan</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_body_type_6"
                      name="car_body_type_6"
                      type="checkbox"
                      defaultValue="car_body_type_6"
                    />
                    <label htmlFor="car_body_type_6">Truck</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_body_type_7"
                      name="car_body_type_7"
                      type="checkbox"
                      defaultValue="car_body_type_7"
                    />
                    <label htmlFor="car_body_type_7">Sedan</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_body_type_8"
                      name="car_body_type_8"
                      type="checkbox"
                      defaultValue="car_body_type_8"
                    />
                    <label htmlFor="car_body_type_8">Sports Car</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_body_type_9"
                      name="car_body_type_9"
                      type="checkbox"
                      defaultValue="car_body_type_9"
                    />
                    <label htmlFor="car_body_type_9">Station Wagon</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_body_type_10"
                      name="car_body_type_10"
                      type="checkbox"
                      defaultValue="car_body_type_10"
                    />
                    <label htmlFor="car_body_type_10">SUV</label>
                  </div>
                </div>
              </div>
              <div className="item_filter_group">
                <h4>Car Seats</h4>
                <div className="de_form">
                  <div className="de_checkbox">
                    <input
                      id="car_seat_1"
                      name="car_seat_1"
                      type="checkbox"
                      defaultValue="car_seat_1"
                    />
                    <label htmlFor="car_seat_1">2 seats</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_seat_2"
                      name="car_seat_2"
                      type="checkbox"
                      defaultValue="car_seat_2"
                    />
                    <label htmlFor="car_seat_2">4 seats</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_seat_3"
                      name="car_seat_3"
                      type="checkbox"
                      defaultValue="car_seat_3"
                    />
                    <label htmlFor="car_seat_3">6 seats</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_seat_4"
                      name="car_seat_4"
                      type="checkbox"
                      defaultValue="car_seat_4"
                    />
                    <label htmlFor="car_seat_4">6+ seats</label>
                  </div>
                </div>
              </div>
              <div className="item_filter_group">
                <h4>Car Engine Capacity (cc)</h4>
                <div className="de_form">
                  <div className="de_checkbox">
                    <input
                      id="car_engine_1"
                      name="car_engine_1"
                      type="checkbox"
                      defaultValue="car_engine_1"
                    />
                    <label htmlFor="car_engine_1">1000 - 2000</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_engine_2"
                      name="car_engine_2"
                      type="checkbox"
                      defaultValue="car_engine_2"
                    />
                    <label htmlFor="car_engine_2">2000 - 4000</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_engine_3"
                      name="car_engine_3"
                      type="checkbox"
                      defaultValue="car_engine_3"
                    />
                    <label htmlFor="car_engine_3">4000 - 6000</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="car_engine_4"
                      name="car_engine_4"
                      type="checkbox"
                      defaultValue="car_engine_4"
                    />
                    <label htmlFor="car_engine_4">6000+</label>
                  </div>
                </div>
              </div>
              <div className="item_filter_group">
                <h4>Price ($)</h4>
                <div className="price-input">
                  <div className="field">
                    <span>Min</span>
                    <input
                      type="number"
                      className="input-min"
                      defaultValue={0}
                    />
                  </div>
                  <div className="field">
                    <span>Max</span>
                    <input
                      type="number"
                      className="input-max"
                      defaultValue={2000}
                    />
                  </div>
                </div>
                <div className="slider">
                  <div className="progress" />
                </div>
                <div className="range-input">
                  <input
                    type="range"
                    className="range-min"
                    min={0}
                    max={2000}
                    defaultValue={0}
                    step={1}
                  />
                  <input
                    type="range"
                    className="range-max"
                    min={0}
                    max={2000}
                    defaultValue={2000}
                    step={1}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/jeep-renegade.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>Jeep Renegade</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$265</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/bmw-m5.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>Mini Cooper</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$244</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/ferrari-enzo.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>Ferarri Enzo</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$167</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/ford-raptor.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>Ford Raptor</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$147</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/mini-cooper.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>Mini Cooper</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$238</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/vw-polo.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>VW Polo</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$106</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/chevrolet-camaro.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>Chevrolet Camaro</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$245</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/hyundai-staria.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>Hyundai Staria</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$191</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/toyota-rav.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>Toyota Rav 4</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$114</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/bentley.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>Bentley</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$299</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/lexus.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>Lexus</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$131</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="de-item-list mb30">
                    <div className="d-img">
                      <img
                        src="images/cars-alt/range-rover.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-info">
                      <div className="d-text">
                        <h4>Range Rover</h4>
                        <div className="d-atr-group">
                          <ul className="d-atr">
                            <li>
                              <span>Seats:</span>4
                            </li>
                            <li>
                              <span>Luggage:</span>2
                            </li>
                            <li>
                              <span>Doors:</span>4
                            </li>
                            <li>
                              <span>Fuel:</span>Petrol
                            </li>
                            <li>
                              <span>Horsepower:</span>500
                            </li>
                            <li>
                              <span>Engine:</span>3000
                            </li>
                            <li>
                              <span>Drive:</span>4x4
                            </li>
                            <li>
                              <span>Type:</span>Hatchback
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="d-price">
                      Daily rate from <span>$228</span>
                      <a className="btn-main" href="02_dark-car-single.html">
                        Rent Now
                      </a>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListCars;

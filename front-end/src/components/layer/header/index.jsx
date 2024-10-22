import { DEFAULT } from "constants";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
<<<<<<< HEAD
=======
  const [showSubMenu, setShowSubMenu] = useState(false);
>>>>>>> Nam

  useEffect(() => {
    const token = localStorage.getItem(DEFAULT.TOKEN);
    if (token) {
      setIsLoggedIn(true);
      setUserName("Xuan Quang");
    }
  }, []);
<<<<<<< HEAD
=======
  console.log("isLoggedIn:", isLoggedIn);

  const test = () => {
    setShowSubMenu(!showSubMenu);
    console.log(isLoggedIn);
    console.log(typeof isLoggedIn);
  };
>>>>>>> Nam

  return (
    <header className="transparent scroll-light has-topbar">
      <div id="topbar" className="topbar-dark text-light">
        <div className="container">
          <div className="topbar-left xs-hide">
            <div className="topbar-widget">
              <div className="topbar-widget">
                <a href="#">
                  <i className="fa fa-phone" />
                  +208 333 9296
                </a>
              </div>
              <div className="topbar-widget">
                <a href="#">
                  <i className="fa fa-envelope" />
                  contact@rentaly.com
                </a>
              </div>
              <div className="topbar-widget">
                <a href="#">
                  <i className="fa fa-clock-o" />
                  Mon - Fri 08.00 - 18.00
                </a>
              </div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="social-icons">
              <a href="#">
                <i className="fa fa-facebook fa-lg" />
              </a>
              <a href="#">
                <i className="fa fa-twitter fa-lg" />
              </a>
              <a href="#">
                <i className="fa fa-youtube fa-lg" />
              </a>
              <a href="#">
                <i className="fa fa-pinterest fa-lg" />
              </a>
              <a href="#">
                <i className="fa fa-instagram fa-lg" />
              </a>
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex sm-pt10">
              <div className="de-flex-col">
                <div className="de-flex-col">
                  {/* logo begin */}
                  <div id="logo">
                    <a href="/home">
                      <img
                        className="logo-1"
                        src="images/logo-light.png"
                        alt=""
                      />
                      <img className="logo-2" src="images/logo.png" alt="" />
                    </a>
                  </div>
                  {/* logo close */}
                </div>
              </div>
              <div className="de-flex-col header-col-mid">
                <ul id="mainmenu">
                  <li>
                    <a className="menu-item" href="/listCars">
                      Cars
                    </a>
                  </li>
                  <li>
                    <a className="menu-item" href="/booking">
                      Booking
                    </a>
                    <ul>
                      <li>
                        <a className="menu-item new" href="/quickBooking">
                          Quick Booking
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="/booking">
                          Booking
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a className="menu-item" href="/aboutUs">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a className="menu-item" href="/contact">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a className="menu-item" href="/new">
                      News & Blog
                    </a>
                  </li>
                  <li></li>
                </ul>
              </div>

<<<<<<< HEAD
<<<<<<< HEAD
              {/* <div className="de-flex-col">
=======
              <div className="de-flex-col">
>>>>>>> quang167
                <div className="menu_side_area">
                  {isLoggedIn ? (
                    <div className="de-login-menu">
                      <span
                        id="de-click-menu-profile"
                        className="de-menu-profile"
                      >
                        <img
                          src="images/profile/1.jpg"
                          className="img-fluid"
                          alt=""
                        />
                      </span>
                      {/* <div id="de-submenu-profile" className="de-submenu">
                        <div className="d-name">
                          <h4>{userName}</h4>
                          <span className="text-gray">monica@rentaly.com</span>
                        </div>
                        <div className="d-line" />
                        <ul className="menu-col">
                          <li>
                            <a href="account-dashboard.html">
                              <i className="fa fa-home" />
                              Dashboard
                            </a>
                          </li>
                          <li>
                            <a href="account-profile.html">
                              <i className="fa fa-user" />
                              My Profile
                            </a>
                          </li>
                          <li>
                            <a href="account-booking.html">
                              <i className="fa fa-calendar" />
                              My Orders
                            </a>
                          </li>
                          <li>
                            <a href="account-favorite.html">
                              <i className="fa fa-car" />
                              My Favorite Cars
                            </a>
                          </li>
                          <li>
                            <a href="login.html">
                              <i className="fa fa-sign-out" />
                              Sign Out
                            </a>
                          </li>
                        </ul>
                      </div> */}
                      <span id="menu-btn" />
=======
              {/* error : Start */}
              <div className="de-flex-col">
                <div className="menu_side_area">
                  {/* {isLoggedIn ? setTest1(true) : setTest1(false)} */}
                  {isLoggedIn ? (
                    <div className="de-flex-col">
                      <div className="menu_side_area">
                        <div className="de-login-menu">
                          <span
                            id="de-click-menu-profile"
                            className="de-menu-profile"
                            onClick={test}
                          >
                            <img
                              src="images/profile/1.jpg"
                              className="img-fluid"
                              alt=""
                            />
                          </span>
                          {showSubMenu ? (
                            <div id="de-submenu-profile" className="de-submenu">
                              <div className="d-name">
                                <h4>Monica Lucas</h4>
                                <span className="text-gray">
                                  monica@rentaly.com
                                </span>
                              </div>
                              <div className="d-line" />
                              <ul className="menu-col">
                                <li>
                                  <a href="account-dashboard.html">
                                    <i className="fa fa-home" />
                                    Dashboard
                                  </a>
                                </li>
                                <li>
                                  <a href="account-profile.html">
                                    <i className="fa fa-user" />
                                    My Profile
                                  </a>
                                </li>
                                <li>
                                  <a href="account-booking.html">
                                    <i className="fa fa-calendar" />
                                    My Orders
                                  </a>
                                </li>
                                <li>
                                  <a href="account-favorite.html">
                                    <i className="fa fa-car" />
                                    My Favorite Cars
                                  </a>
                                </li>
                                <li>
                                  <a href="login.html">
                                    <i className="fa fa-sign-out" />
                                    Sign Out
                                  </a>
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                          <span id="menu-btn" />
                        </div>
                      </div>
>>>>>>> Nam
                    </div>
                  ) : (
                    <a href="/login" className="btn-main">
                      Sign In
                    </a>
                  )}
                </div>
<<<<<<< HEAD
<<<<<<< HEAD
              </div> */}

              <div className="de-flex-col" >
=======
              </div>

              {/* error: END */}

              {/* <div className="de-flex-col" >
>>>>>>> Nam
=======
              </div>

              {/* <div className="de-flex-col" >
>>>>>>> quang167
                <div className="menu_side_area">
                  <div className="de-login-menu">
                    <span
                      id="de-click-menu-profile"
                      className="de-menu-profile"
                    >
                      <img
                        src="images/profile/1.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </span>
                    <div id="de-submenu-profile" className="de-submenu">
                      <div className="d-name">
                        <h4>Monica Lucas</h4>
                        <span className="text-gray">monica@rentaly.com</span>
                      </div>
                      <div className="d-line" />
                      <ul className="menu-col">
                        <li>
<<<<<<< HEAD
                          <a href="/profile">
=======
                          <a href="account-dashboard.html">
                            <i className="fa fa-home" />
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a href="account-profile.html">
>>>>>>> Nam
                            <i className="fa fa-user" />
                            My Profile
                          </a>
                        </li>
                        <li>
<<<<<<< HEAD
                          <a href="/accountBooking">
=======
                          <a href="account-booking.html">
>>>>>>> Nam
                            <i className="fa fa-calendar" />
                            My Orders
                          </a>
                        </li>
                        <li>
<<<<<<< HEAD
                          <a href="/changePassword">
                            <i className="fa fa-car" />
                            Change Password
                          </a>
                        </li>
                        <li>
                          <a href="/voucher">
                            <i className="fa fa-ticket" />
                            Voucher
                          </a>
                        </li>
                        <li>
                            <a >
                            <i className="fa fa-sign-out" />
                            Sign Out
                            </a>
=======
                          <a href="account-favorite.html">
                            <i className="fa fa-car" />
                            My Favorite Cars
                          </a>
                        </li>
                        <li>
                          <a href="login.html">
                            <i className="fa fa-sign-out" />
                            Sign Out
                          </a>
>>>>>>> Nam
                        </li>
                      </ul>
                    </div>
                    <span id="menu-btn" />
                  </div>
                </div>
<<<<<<< HEAD
<<<<<<< HEAD
              </div>
=======
              </div> */}
>>>>>>> Nam
=======
              </div> */}
>>>>>>> quang167
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

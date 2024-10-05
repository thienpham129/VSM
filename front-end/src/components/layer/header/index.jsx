import React from "react";

const Header = () => {
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
                    <a href="index.html">
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
                    <a className="menu-item" href="index.html">
                      Home
                    </a>
                    <ul>
                      <li>
                        <a
                          className="menu-item new"
                          href="02_dark-index-1.html"
                        >
                          Homepage 1 Dark
                        </a>
                      </li>
                      <li>
                        <a
                          className="menu-item new"
                          href="02_dark-index-2.html"
                        >
                          Homepage 2 Dark
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="index.html">
                          Homepage Main
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="index-2.html">
                          Homepage 2
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="index-3.html">
                          Homepage 3
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="index-4.html">
                          Homepage 4
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="index-5.html">
                          Homepage 5
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="index-6.html">
                          Homepage 6
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="menu-item" href="cars.html">
                      Cars
                    </a>
                    <ul>
                      <li>
                        <a className="menu-item" href="cars.html">
                          Cars List 1
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="02_dark-cars.html">
                          Cars List 1 Dark
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="cars-list.html">
                          Cars List 2
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="02_dark-cars-list.html">
                          Cars List 2 Dark
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="car-single.html">
                          Cars Single
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="02_dark-car-single.html">
                          Cars Single Dark
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="menu-item" href="quick-booking.html">
                      Booking
                    </a>
                    <ul>
                      <li>
                        <a className="menu-item new" href="quick-booking.html">
                          Quick Booking
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="booking.html">
                          Booking
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="menu-item" href="account-dashboard.html">
                      My Account
                    </a>
                    <ul>
                      <li>
                        <a className="menu-item" href="account-dashboard.html">
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="account-profile.html">
                          My Profile
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="account-booking.html">
                          My Orders
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="account-favorite.html">
                          My Favorite Cars
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="menu-item" href="#">
                      Pages
                    </a>
                    <ul>
                      <li>
                        <a className="menu-item" href="about.html">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="contact.html">
                          Contact
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="login.html">
                          Login
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="register.html">
                          Register
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="404.html">
                          Page 404
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="menu-item" href="#">
                      News
                    </a>
                    <ul>
                      <li>
                        <a
                          className="menu-item"
                          href="news-standart-right-sidebar.html"
                        >
                          News Standard
                        </a>
                        <ul>
                          <li>
                            <a
                              className="menu-item"
                              href="news-standart-right-sidebar.html"
                            >
                              Right Sidebar
                            </a>
                          </li>
                          <li>
                            <a
                              className="menu-item"
                              href="news-standart-left-sidebar.html"
                            >
                              Left Sidebar
                            </a>
                          </li>
                          <li>
                            <a
                              className="menu-item"
                              href="news-standart-no-sidebar.html"
                            >
                              No Sidebar
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a
                          className="menu-item"
                          href="news-grid-right-sidebar.html"
                        >
                          News Grid
                        </a>
                        <ul>
                          <li>
                            <a
                              className="menu-item"
                              href="news-grid-right-sidebar.html"
                            >
                              Right Sidebar
                            </a>
                          </li>
                          <li>
                            <a
                              className="menu-item"
                              href="news-grid-left-sidebar.html"
                            >
                              Left Sidebar
                            </a>
                          </li>
                          <li>
                            <a
                              className="menu-item"
                              href="news-grid-no-sidebar.html"
                            >
                              No Sidebar
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="menu-item" href="#">
                      Elements
                    </a>
                    <ul>
                      <li>
                        <a className="menu-item" href="preloader.html">
                          Preloader
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="icon-boxes.html">
                          Icon Boxes
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="badge.html">
                          Badge
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="counters.html">
                          Counters
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="gallery-popup.html">
                          Gallery Popup
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="icons-elegant.html">
                          Icons Elegant
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="icons-etline.html">
                          Icons Etline
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="icons-font-awesome.html">
                          Icons Font Awesome
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="map.html">
                          Map
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="modal.html">
                          Modal
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="popover.html">
                          Popover
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="tabs.html">
                          Tabs
                        </a>
                      </li>
                      <li>
                        <a className="menu-item" href="tooltips.html">
                          Tooltips
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="de-flex-col">
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
                    <span id="menu-btn" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

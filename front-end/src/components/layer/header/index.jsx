import { DEFAULT } from "constants";
import React, { useEffect, useState } from "react";
import { axiosClient, root } from "helper/axiosClient";
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "utils/tokenUtils";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [urlImage, setUrlImage] = useState();


  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        // Decode the token to extract user information
        const decodedToken = jwtDecode(token);
        console.log("««««« decodedToken »»»»»", decodedToken.sub);

        const userId = decodedToken.sub;
        if (userId) {
          setUserId(userId);
          setIsLoggedIn(true);
          getUserById(userId);
        } else {
          console.error("userId not found in token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const test = () => {
    setShowSubMenu(!showSubMenu);
  };

  const getUserById = async (userId) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await root.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response && response.data) {
        setEmail(response.data.email);
        setUrlImage(response.data.urlImage);
        setFullName(
          `${response.data.firstName || ""} ${
            response.data.lastName || ""
          }`.trim()
        );
      } else {
        console.log("Failed to retrieve user data");
      }
    } catch (error) {
      console.log("Failed to retrieve user data:", error);
    }
  };

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    localStorage.removeItem("role");
    window.location.href = "/login";
  };


  return (
    <header className="transparent scroll-light has-topbar">
      <div id="topbar" className="topbar-dark text-light">
        <div className="container">
          <div className="topbar-left xs-hide">
            <div className="topbar-widget">
              <div className="topbar-widget">
                <a href="#">
                  <i className="fa fa-phone" />
                  01237898233
                </a>
              </div>
              <div className="topbar-widget">
                <a href="#">
                  <i className="fa fa-envelope" />
                  vsm@gmail.com
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
                <i class="fa-brands fa-facebook fa-lg"></i>
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
                        // src="images/logo-light.png"
                        src="images/logo_vsm.png"
                        alt=""
                      />
                      <img
                        className="logo-2"
                        src="images/logo_vsm.png"
                        alt=""
                      />
                    </a>
                  </div>
                  {/* logo close */}
                </div>
              </div>
              <div className="de-flex-col header-col-mid">
                <ul id="mainmenu">
                  <li>
                    <a className="menu-item" href="/bookingTicket">
                      Đặt vé
                    </a>
                  </li>
                  <li>
                    <a className="menu-item" href="/aboutUs">
                      Giới Thiệu
                    </a>
                  </li>
                  <li>
                    <a className="menu-item" href="/contact">
                      Đánh Giá
                    </a>
                  </li>
                </ul>
              </div>

              <span id="menu-btn" />
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
                            {urlImage ? (
                              <img
                                src={urlImage}
                                className="img-fluid"
                                alt=""
                              />
                            ) : (
                              <img
                                src="images/avatar_user.png"
                                className="img-fluid"
                                alt=""
                              />
                            )}
                          </span>
                          {showSubMenu ? (
                            <div id="de-submenu-profile" className="de-submenu">
                              <div className="d-name">
                                <h4>{fullName}</h4>
                                <span className="text-gray">{email}</span>
                              </div>
                              <div className="d-line" />
                              <ul className="menu-col">
                                <li>
                                  <a href="/profile">
                                    <i className="fa fa-user" />
                                    Thông tin cá nhân
                                  </a>
                                </li>
                                <li>
                                  <a href="/accountBooking">
                                    <i className="fa fa-calendar" />
                                    Lịch sử đặt vé
                                  </a>
                                </li>
                                <li>
                                  <a href="/changePassword">
                                    <i className="fa fa-car" />
                                    Thay đổi mật khẩu
                                  </a>
                                </li>

                                <li>
                                  <a href="" onClick={handleLogout}>
                                    <i className="fa fa-sign-out" />
                                    Đăng xuất
                                  </a>
                                </li>
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a href="/login" className="btn-main">
                      Đăng Nhập
                    </a>
                  )}
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

import React from "react";
import { useLocation } from "react-router-dom"; // cần react-router-dom cho việc điều hướng

const NavBarProfile = () => {
  const location = useLocation(); // lấy đường dẫn hiện tại

  return (
    <div className="card padding30 rounded-5">
      <div className="profile_avatar">
        <div className="profile_img">
          <img src="images/profile/1.jpg" alt="" />
        </div>
        <div className="profile_name">
          <h4>
            Monica Lucas
            <span className="profile_username text-gray">
              monica@rentaly.com
            </span>
          </h4>
        </div>
      </div>
      <div className="spacer-20" />
      <ul className="menu-col">
        <li>
          <a
            href="/profile"
            className={location.pathname === "/profile" ? "active" : ""}
          >
            <i className="fa fa-user" />
            Thông tin cá nhân
          </a>
        </li>
        <li>
          <a
            href="/accountBooking"
            className={location.pathname === "/accountBooking" ? "active" : ""}
          >
            <i className="fa fa-calendar" />
            Lịch sử đặt vé
          </a>
        </li>
        <li>
          <a
            href="/changePassword"
            className={location.pathname === "/changePassword" ? "active" : ""}
          >
            <i className="fa fa-car" />
            Thay đổi mật khẩu
          </a>
        </li>
        <li>
          <a
            href="/voucher"
            className={location.pathname === "/voucher" ? "active" : ""}
          >
            <i className="fa fa-ticket" />
            Mã giảm giá
          </a>
        </li>
        <li>
          <a href="login.html">
            <i className="fa fa-sign-out" />
            Đăng xuất
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBarProfile;

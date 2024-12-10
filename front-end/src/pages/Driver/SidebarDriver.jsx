import React, { useState, useEffect } from "react";
import boxicons from "boxicons";
import { Outlet } from "react-router-dom";
import profileImage from "./4.jpg";
import logo from "./logo_vsm.png";
function SidebarDriver() {
  return (
    <div>
      <div className="sidebar">
        <div className="logo_content">
          <div className="logo">
            <img
              src={logo}
              alt="logo VSM"
              style={{ cursor: "pointer" }}
              onClick={() => (window.location.href = "/home")}
            />
          </div>
          <box-icon
            name="menu"
            id="btn"
            color="white"
            onClick={() => {
              document.querySelector(".sidebar").classList.toggle("active");
            }}
          ></box-icon>
        </div>
        <ul className="nav_list">
          <li>
            <a
              href="#"
              onClick={() => {
                window.location.href = "/driver/schedule";
              }}
            >
              <box-icon
                name="detail"
                color="white"
                title="Lịch Trình"
              ></box-icon>
              <span className="links_name">Lịch Trình</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                window.location.href = "/driver/parking";
              }}
            >
              <box-icon
                name="parking"
                type="solid"
                color="white"
                title="Bãi Đậu Xe"
              ></box-icon>
              <span className="links_name">Bãi Đậu Xe</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                window.location.href = "/driver/map";
              }}
            >
              <box-icon name="map" color="white" title="Bản Đồ"></box-icon>
              <span className="links_name">Bản Đồ</span>
            </a>
          </li>
        </ul>
        <div className="profile_content">
          <div className="profile">
            <div className="profile_details">
              <img src={profileImage} alt="" />
              <div className="name_job">
                <div className="name">Nguyen Van A</div>
                <div className="job"> Tài Xế xe 7 chỗ</div>
              </div>
            </div>
            <box-icon
              name="log-out"
              id="log_out"
              color="white"
              title="Log Out"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/home";
              }}
            ></box-icon>
          </div>
        </div>
      </div>
      <div className="home_content">
        <Outlet />
      </div>
    </div>
  );
}

export default SidebarDriver;

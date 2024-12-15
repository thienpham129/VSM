import React, { useState, useEffect } from "react";
import boxicons from "boxicons";
import { Outlet } from "react-router-dom";
import profileImage from "./4.jpg";
import logo from "./logo_vsm.png";
import { getTokenFromLocalStorage } from "utils/tokenUtils";
import { root } from "helper/axiosClient";
import { jwtDecode } from "jwt-decode";

function SidebarDriver() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");


  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("««««« decodedToken »»»»»", decodedToken.sub);

        const userId = decodedToken.sub;
        if (userId) {
          setUserId(userId);
          getUserById(userId);
        } else {
          console.error("userId not found in token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

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
                window.location.href = "/driver/profile";
              }}
            >
              <box-icon
                name="user-circle"
                color="white"
                title="Thông tin cá nhân"
              ></box-icon>
              <span className="links_name">Thông tin cá nhân</span>
            </a>
          </li>
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
                <div className="name">{fullName}</div>
                <div className="email">{email}</div>
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

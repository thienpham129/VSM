import { root } from "helper/axiosClient";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from "utils/tokenUtils";
import { jwtDecode } from "jwt-decode";

const NavBarProfile = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [urlImage, setUrlImage] = useState();
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");

  // Image
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // Để hiển thị hình ảnh trước khi upload

  const getFile = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile)); // Tạo URL tạm thời cho ảnh để hiển thị
  };

  const handleUpdateImage = async () => {
    if (!file) {
      alert("Vui lòng chọn ảnh để tải lên.");
      return;
    }

    const token = getTokenFromLocalStorage();
    const formData = new FormData();
    formData.append("urlImage", file); // Đưa tệp vào FormData dưới trường "urlImage"

    try {
      const response = await root.post(`/user/update-my-info`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Cập nhật ảnh đại diện thành công!");
        setUrlImage(filePreview);
        console.log("««««« response »»»»»", response.data);
      }
    } catch (error) {
      console.log("Lỗi khi cập nhật ảnh đại diện:", error);
      alert("Có lỗi xảy ra khi cập nhật ảnh đại diện.");
    }
  };
  //

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    window.location.href = "/home";
  };

  // Lấy ảnh ra
  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        // Decode the token to extract user information
        const decodedToken = jwtDecode(token);

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
        setUrlImage(response.data.urlImage);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);

        setFullName(`${response.data.firstName || ""} ${response.data.lastName || ""}`.trim());
      } else {
        console.log("Failed to retrieve user data");
      }
    } catch (error) {
      console.log("Failed to retrieve user data:", error);
    }
  };
  //

  return (
    <div className="card padding30 rounded-5">
      <div className="profile_avatar">
        <div className="profile_img">
          <input type="file" onChange={getFile} />
          {filePreview ? (
            <img
              src={filePreview}
              alt="Preview"
            />
          ) : urlImage ? (
            <img src={urlImage} alt="Profile" />
          ) : null}
        </div>
        <button type="button" className="btn-main" onClick={handleUpdateImage}>
          Cập nhật ảnh
        </button>
        <div className="profile_name">
          <h4>
            {fullName}
            <span className="profile_username text-gray">
              {email}
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
          <a onClick={handleLogout}>
            <i className="fa fa-sign-out" />
            Đăng xuất
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBarProfile;

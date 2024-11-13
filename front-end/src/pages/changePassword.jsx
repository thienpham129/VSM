import React, { useState } from "react";
import NavBarProfile from "components/NavBarProfile";
import styles from "pages/changePassword.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { root } from "helper/axiosClient";
import { getTokenFromLocalStorage } from "utils/tokenUtils";

const ChangePassword = () => {
  const [oldPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessageNewPassword, setErrorMessageNewPassword] = useState(""); 
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCurrentPasswordToggle = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleNewPasswordToggle = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePass = async (event) => {
    event.preventDefault();

    // Check if new password is the same as the old password
    if (newPassword === oldPassword) {
      setErrorMessageNewPassword("Mật khẩu mới không được trùng với mật khẩu cũ.");
      return; // Prevent form submission if passwords match
    }

    // Check if confirm password matches new password
    if (newPassword !== confirmPassword) {
      setErrorMessageConfirmPassword("Mật khẩu xác nhận không khớp với mật khẩu mới.");
      return; // Prevent form submission if passwords don't match
    }

    // Reset error message if passwords are valid
    setErrorMessageNewPassword("");
    setErrorMessageConfirmPassword("");

    const token = getTokenFromLocalStorage();
    try {
      const response = await root.post(`/user/change-password`, {
        oldPassword,
        newPassword,
        confirmPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Password changed successfully");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        alert("Failed to change password. Please check your input.");
      }
    } catch (error) {
      alert("Mật khẩu cũ nhập không đúng");
      console.error("Change Password error:", error);
    }
  };

  return (
    <div className="no-bottom no-top zebra" id="content">
      <div id="top" />
      <section id="subheader" className="jarallax text-light">
        <img src="images/background/14.jpg" className="jarallax-img" alt="" />
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Thay đổi mật khẩu</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      <section id="section-settings" className="bg-gray-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb30">
              <NavBarProfile />
            </div>
            <div className="col-lg-9">
              <div className="card padding40 rounded-5">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="de_tab tab_simple">
                      <ul className="de_nav">
                        <li className="active">
                          <span>Thay đổi mật khẩu</span>
                        </li>
                      </ul>
                      <div className="de_tab_content">
                        <div className="tab-1">
                          <div className="row">
                            <div className="col-lg-12 mb20">
                              <h5>Mật khẩu hiện tại</h5>
                              <div className={styles.password_input}>
                                <input
                                  type={showCurrentPassword ? "text" : "password"}
                                  value={oldPassword}
                                  className="form-control"
                                  placeholder="Nhập mật khẩu hiện tại"
                                  onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                <div
                                  className={styles.password_toggle}
                                  onClick={handleCurrentPasswordToggle}
                                >
                                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12 mb20">
                              <h5>Mật khẩu mới</h5>
                              <div className={styles.password_input}>
                                <input
                                  className="form-control"
                                  type={showNewPassword ? "text" : "password"}
                                  placeholder="Nhập mật khẩu mới"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <div
                                  className={styles.password_toggle}
                                  onClick={handleNewPasswordToggle}
                                >
                                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                              </div>
                            </div>
                            {errorMessageNewPassword && (
                                  <div className="text-danger mt-2">{errorMessageNewPassword}</div>
                                )}
                            <div className="col-lg-12 mb20">
                              <h5>Nhập lại mật khẩu mới</h5>
                              <div className={styles.password_input}>
                                <input
                                  className="form-control"
                                  type={showConfirmPassword ? "text" : "password"}
                                  placeholder="Nhập lại mật khẩu mới"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div
                                  className={styles.password_toggle}
                                  onClick={handleConfirmPasswordToggle}
                                >
                                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                              </div>
                                {errorMessageConfirmPassword && (
                                  <div className="text-danger mt-2">{errorMessageConfirmPassword}</div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="button"
                      id="submit"
                      className="btn-main"
                      defaultValue="Thay đổi mật khẩu"
                      onClick={handleChangePass}
                    />
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

export default ChangePassword;

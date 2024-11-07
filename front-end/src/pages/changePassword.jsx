import React, { useState } from "react";
import NavBarProfile from "components/NavBarProfile";
import styles from "pages/changePassword.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      {/* section close */}
      <section id="section-settings" className="bg-gray-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb30">
              <NavBarProfile />
            </div>
            <div className="col-lg-9">
              <div className="card padding40  rounded-5">
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
                                  type={
                                    showCurrentPassword ? "text" : "password"
                                  }
                                  value={currentPassword}
                                  className="form-control"
                                  placeholder="Nhập mật khẩu hiện tại"
                                  onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                  }
                                />
                                <div
                                  className={styles.password_toggle}
                                  onClick={handleCurrentPasswordToggle}
                                >
                                  {showCurrentPassword ? (
                                    <FaEyeSlash />
                                  ) : (
                                    <FaEye />
                                  )}
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
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                />
                                <div
                                  className={styles.password_toggle}
                                  onClick={handleNewPasswordToggle}
                                >
                                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12 mb20">
                              <h5>Nhập lại mật khẩu mới</h5>
                              <div className={styles.password_input}>
                                <input
                                  className="form-control"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Nhập lại mật khẩu mới"
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                />
                                <div
                                  className={styles.password_toggle}
                                  onClick={handleConfirmPasswordToggle}
                                >
                                  {showConfirmPassword ? (
                                    <FaEyeSlash />
                                  ) : (
                                    <FaEye />
                                  )}
                                </div>
                              </div>
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

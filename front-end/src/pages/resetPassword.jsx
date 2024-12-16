import { axiosClient } from "helper/axiosClient";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { root } from "helper/axiosClient";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isClickSubmit, setIsClickSubmit] = useState(false);
  const notifyErrorSendEmail = () =>
    toast.error("Email Không Tồn Tại", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const notifyErrorEmptyEmail = () =>
    toast.error("Vui Lòng Nhập Email", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  const handleClickVerify = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await root.get(`/auth/forgot-password?email=${email}`);
        if (response.data === true) {
          window.location.href = "/reset_password";
          setIsClickSubmit(true);
        }
      } catch (error) {
        console.log(error);
        notifyErrorSendEmail();
        setIsClickSubmit(true);
      }
    } else {
      notifyErrorEmptyEmail();
      setIsClickSubmit(true);
    }
  };
  return (
    <div className="identify-email">
      <div className="box">
        <div className="box-content">
          <h3>Thay đổi mật khẩu</h3>
          <p>Hãy nhập mật khẩu mới cho tài khoản của bạn</p>
          <form onSubmit={handleClickVerify}>
            <input
              className="identify-email-input"
              required
              autoFocus
              type="email"
              value={email}
              placeholder="Nhập mật khẩu mới"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ marginBottom: "10px" }}
            />
            <input
              className="identify-email-input"
              required
              autoFocus
              type="email"
              value={email}
              placeholder="Xác nhận mật khẩu mới"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ marginBottom: "10px" }}
            />
            <input
              className="identify-email-input"
              required
              autoFocus
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ marginBottom: "10px" }}
            />
            <br />
            <button
              className="cancel-verify-account"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Hủy
            </button>
            <button
              className="verify-account"
              onClick={(e) => {
                handleClickVerify(e);
                setIsClickSubmit(true);
              }}
            >
              Xác Nhận
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
export default ForgetPassword;

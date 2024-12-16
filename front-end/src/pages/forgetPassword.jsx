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
          <h3>Tìm kiếm tài khoản của bạn</h3>
          <p>
            Hãy nhập email của bạn để chúng tôi có thể tìm kiếm tài khoản của
            bạn
          </p>
          <form onSubmit={handleClickVerify}>
            <input
              className="identify-email-input"
              required
              autoFocus
              type="email"
              value={email}
              placeholder="Nhập địa chỉ email của bạn"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />{" "}
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
              type="submit"
              onClick={(e) => {
                handleClickVerify(e);
                setIsClickSubmit(true);
              }}
              disabled={isClickSubmit}
            >
              Xác nhận
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

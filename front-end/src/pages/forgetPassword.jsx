import { axiosClient } from "helper/axiosClient";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { root } from "helper/axiosClient";
import { request } from "admin/helpers/axios_helper";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setSetConfirmPassword] = useState("");
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
    toast.error("Vui Lòng Nhập nhập đầy đủ thông tin", {
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

  const notifyError = () =>
    toast.error("Đã có lỗi xảy ra", {
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

  const notifyErrorPassword = () =>
    toast.error("Hãy đảm bảo bạn xác nhận mật khẩu thật chính xác!", {
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
    if (email && password && confirmPassword) {
      if (password !== confirmPassword) {
        // setIsClickSubmit(false);
        notifyErrorPassword();
      } else {
        // try {
        //   const response = await root.get(
        //     `/auth/reset-password?email=${email}`,
        //     {
        //       newPassword: password,
        //       newPasswordRepeat: confirmPassword,
        //     }
        //   );
        //   console.log(password + "   " + confirmPassword + "    " + email);
        //   if (response.data) {
        //     window.location.href = "/login";
        //   } else {
        //     // setIsClickSubmit(false);
        //     notifyError();
        //   }
        // } catch (error) {
        //   // setIsClickSubmit(false);
        //   console.log(error);
        // }
        const object = {
          newPassword: password,
          newPasswordRepeat: confirmPassword,
        };
        console.log(`/auth/reset-password?email=${email}`, object);
        try {
          const response = await request(
            "POST",
            `/auth/reset-password?email=${email}`,
            object
          );
          if (response.data) {
            window.location.href = "/login";
          } else {
            notifyError();
          }
        } catch (error) {
          notifyError();
          console.error(error);
        }
      }
    } else {
      notifyErrorEmptyEmail();
      // setIsClickSubmit(false);
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
              placeholder="Nhập email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ marginBottom: "10px" }}
            />
            <input
              className="identify-email-input"
              required
              type="password"
              value={password}
              placeholder="Nhập mật khẩu mới"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{ marginBottom: "10px" }}
            />
            <input
              className="identify-email-input"
              required
              type="password"
              value={confirmPassword}
              placeholder="xác nhận mật khẩu"
              onChange={(e) => {
                setSetConfirmPassword(e.target.value);
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
              type="submit"
              onClick={(e) => {
                handleClickVerify(e);
                // setIsClickSubmit(true);
              }}
              disabled={isClickSubmit}
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

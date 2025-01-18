import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { request } from "admin/helpers/axios_helper";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notifyError = (message) =>
    toast.error(message, {
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

  const notifySuccess = (message) =>
    toast.success(message, {
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

    if (!email) {
      notifyError("Vui lòng nhập email.");
      return;
    }

    setIsSubmitting(true); // Vô hiệu hóa nút gửi khi đang xử lý

    try {
      const response = await request("GET", `http://localhost:8080/auth/forgot-password?email=${email}`);
      if (response.data) {
        notifySuccess("Yêu cầu quên mật khẩu đã được gửi thành công!");
      } else {
        notifyError("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      notifyError("Email không tồn tại hoặc đã xảy ra lỗi.");
      console.error(error);
    } finally {
      setIsSubmitting(false); // Bật lại nút gửi
    }
  };

  return (
    <div className="identify-email">
      <div className="box">
        <div className="box-content">
          <h3>Quên mật khẩu</h3>
          <p>Hãy điền email của bạn ở đây</p>
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
            <button
              className="cancel-verify-account"
              type="button"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Hủy
            </button>
            <button
              className="verify-account"
              type="submit"
              disabled={isSubmitting}
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

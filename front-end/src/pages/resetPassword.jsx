import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { root } from "helper/axiosClient"
import "react-toastify/dist/ReactToastify.css";

function RestPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Khi component mount, lấy email từ query string
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email');
    if (emailParam) {
      setEmail(emailParam); 
    }
  }, [location]);

  const notifyError = (message) =>
    toast.error(message, {
      position: "bottom-right",
      autoClose: 1500,
      theme: "colored",
      transition: Bounce,
    });

  const notifySuccess = (message) =>
    toast.success(message, {
      position: "bottom-right",
      autoClose: 1500,
      theme: "colored",
      transition: Bounce,
    });

  const handleClickVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      notifyError("Email không hợp lệ.");
      return;
    }

    if (!newPassword || !newPasswordRepeat) {
      notifyError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (newPassword !== newPasswordRepeat) {
      notifyError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await root.post(
        `/auth/reset-password?email=${email}`,
        {
          newPassword,
          newPasswordRepeat,
        }
      );

      if (response.data) {
        notifySuccess("Mật khẩu đã được đặt lại thành công!");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      } else {
        notifyError("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error(error);
      notifyError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="identify-email">
      <div className="box">
        <div className="box-content">
          <h3>Đặt lại mật khẩu</h3>
          <p>Hãy nhập mật khẩu mới cho tài khoản của bạn</p>
          <form onSubmit={handleClickVerify}>
            <input
              className="identify-email-input"
              required
              type="password"
              value={newPassword}
              placeholder="Nhập mật khẩu mới"
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <input
              className="identify-email-input"
              required
              type="password"
              value={newPasswordRepeat}
              placeholder="Xác nhận mật khẩu mới"
              onChange={(e) => setNewPasswordRepeat(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <br />
            <button
              className="cancel-verify-account"
              type="button"
              onClick={() => {
                navigate("/login"); // Điều hướng đến trang login khi bấm hủy
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

export default RestPassword;

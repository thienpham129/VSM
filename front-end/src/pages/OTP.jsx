import React, { useEffect, useState } from "react";
import { axiosClient } from "helper/axiosClient";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OTP(props) {
  const [isBtnDisable, setIsBtnDisable] = useState(false);
  const [countDown, setCountDown] = useState(30);
  const notifyScucessResend = () =>
    toast.success("Mã OTP đã được gửi lại", {
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

  const notifyErrorResend = () =>
    toast.error("Lỗi gửi OTP", {
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

  const notifyWrongOTP = () =>
    toast.error("Không đúng mã OTP!", {
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
  const notifyErrorOTP = () =>
    toast.error("Lỗi Xác nhận.", {
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

  const notifyExpriedOTP = () =>
    toast.warn("Mã OTP đã hết hạn! Vui lòng nhấn gửi lại", {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const handleClickVerify = async () => {
    let verificationCode = "";
    const email = props.email;
    document.querySelectorAll("input").forEach((element, index) => {
      verificationCode += element.value;
    });
    console.log(verificationCode);
    const url = "/verify";
    try {
      const response = await axiosClient.post(url, {
        email,
        verificationCode,
      });
      if (response.data === "Account verified successfully") {
        window.location.href = "/login";
      } else {
        // setErrorMessage("Wrong verification code!");
        notifyWrongOTP();
      }
    } catch (error) {
      // setErrorMessage("Error verification.");
      console.log(error);
      notifyErrorOTP();
    }
  };

  const handleResendOTP = async () => {
    setIsBtnDisable(true);
    const url = `/resend?email=${props.email}`;
    try {
      const response = await axiosClient.post(url);
      if (response.data === "Verification code sent") {
        notifyScucessResend();
        setCountDown(30);
        setIsBtnDisable(false);
      } else {
        console(response.data);
        notifyErrorResend();
      }
    } catch (error) {
      notifyErrorResend();
      console.log(error);
    }
  };

  document.querySelectorAll("input[type=number]").forEach((input, index) => {
    input.oninput = () => {
      if (input.value.length > input.maxLength) {
        input.value = input.value.slice(0, input.maxLength);
      }
    };
    input.onkeydown = (key) => {
      if (key.keyCode >= 48 && key.keyCode <= 57) {
        input.onkeyup = () => {
          if (key.keyCode >= 48 && key.keyCode <= 57) {
            if (input.nextSibling === null) {
              document.querySelector(".otp-card-inputs").firstChild.focus();
            } else {
              input.nextSibling.focus();
            }
          }
          input.onkeyup = null;
        };
      }
    };
  });

  useEffect(() => {
    if (countDown > 0) {
      const timerId = setTimeout(() => setCountDown(countDown - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setIsBtnDisable(true);
      notifyExpriedOTP();
    }
  }, [countDown]);

  return (
    <div className="OTP">
      <div className="otp-card">
        <h1 className="otp-title">Xác nhận mã OTP</h1>
        <p>Mã OTP được gửi tới {props.email}</p>
        <div className="otp-card-inputs">
          <input type="number" maxLength="1" autoFocus />
          <input type="number" maxLength="1" />
          <input type="number" maxLength="1" />
          <input type="number" maxLength="1" />
          <input type="number" maxLength="1" />
          <input type="number" maxLength="1" />
        </div>
        <p>
          Không nhận được mã OTP{" "}
          <span className="resend-otp" onClick={handleResendOTP}>
            Gửi lại
          </span>{" "}
          !
        </p>
        <p>
          Mã OTP sẽ hết hạn trong{" "}
          <span className="time-otp"> {countDown} </span>{" "}
        </p>
        <button
          className="verify"
          onClick={handleClickVerify}
          disabled={isBtnDisable}
        >
          Xác nhận
        </button>

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
    </div>
  );
}

export default OTP;

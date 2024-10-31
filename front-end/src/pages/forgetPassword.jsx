import { axiosClient } from "helper/axiosClient";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const notifyErrorSendEmail = () =>
    toast.error("Error Send Email", {
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
    if (email !== "abc@gmail.com") {
      notifyErrorSendEmail();
    } else {
      alert(email);
    }
    // const url = "";
    // const response = await axiosClient.post();
  };
  return (
    <div className="identify-email">
      <div className="box">
        <div className="box-content">
          <h3>Find your account</h3>
          <p>Please enter your email address to search for your account.</p>
          <form onSubmit={handleClickVerify}>
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
            />{" "}
            <br />
            <button
              className="cancel-verify-account"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Cancel
            </button>
            <button type="submit" className="verify-account">
              Verify
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

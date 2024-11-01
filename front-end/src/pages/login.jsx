import React, { useEffect, useState } from "react";
import { axiosClient } from "helper/axiosClient";
import { DEFAULT } from "constants";
import OTP from "./OTP.jsx";
import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;
    return userId;
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassWord] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toogle, setToogle] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const url = "/login";
    try {
      const response = await axiosClient.post(url, {
        email,
        password,
      });

      if (response && response.data.accessToken) {
        localStorage.setItem(DEFAULT.TOKEN, response.data.accessToken);
<<<<<<< HEAD
        // console.log(response.data.accessToken);
        // console.log(response.data + "response neeeeeeeeeeee!!!!");
        const accessToken = response.data.accessToken;
        const userId = getUserIdFromToken(accessToken);
        localStorage.setItem("userId", userId);
=======
>>>>>>> ed650c4ccfd37fbe0c162c5340416e69cd15f1bc
        window.location.href = "/home";
      } else {
        setErrorMessage("Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Error logging in. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Please make sure your passwords match.");
      setIsSubmitting(false);
    } else {
      const url = "/signup";
      try {
        const response = await axiosClient.post(url, {
          email,
          password,
        });
        if (response) {
          setOtp(response.data.verificationCode);
          setShowOTP(true);
        } else {
          setErrorMessage("Sign Up failed.");
        }
      } catch (error) {
        setErrorMessage("Error signing up.");
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClickToggle = () => {
    setToogle(!toogle);
    let aTag = document.querySelectorAll(".mb10");
    setTimeout(() => {
      let buttonSubmit = document.querySelector("button[type=submit]");
      let divTagInForm = document.querySelectorAll(".field-set");
      divTagInForm.forEach((div, index) => {
        div.classList.add("shake");
      });
      buttonSubmit.classList.add("shake");
      aTag.forEach((aTagElement, index) => {
        aTagElement.classList.add("shake");
      });
    }, 10);
    aTag.forEach((aTagElement, index) => {
      aTagElement.classList.remove("shake");
    });
    setEmail("");
    setPassword("");
    setConfirmPassWord("");
  };

  useEffect(() => {
    const token = localStorage.getItem(DEFAULT.TOKEN);
    if (token) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <>
      {!showOTP ? (
        <div className="no-bottom no-top" id="content">
          <div id="top" />
          <section id="section-hero" aria-label="section" className="jarallax">
            <img
              src="images/background/2.jpg"
              className="jarallax-img"
              alt=""
            />
            <div className="v-center">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-4 offset-lg-4">
                    <div
                      className="padding40 rounded-3 shadow-soft"
                      data-bgcolor="#ffffff"
                    >
                      <div className="title">
                        <h4 className="Login-title">Login</h4>
                        <button
                          className={`toggle-btn ${toogle ? "toogled" : ""}`}
                          onClick={handleClickToggle}
                        >
                          <div className="thumb"></div>
                        </button>
                        <h4 className="Signup-title">Sign Up</h4>
                      </div>
                      <div className="spacer-10" />
                      {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                          {errorMessage}
                        </div>
                      )}

                      {toogle ? (
                        <form
                          id="form_register"
                          className="form-border"
                          method="post"
                          onSubmit={onSignUp}
                        >
                          <div className="field-set">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="form-control"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              style={{ marginBottom: "10px" }}
                            />
                          </div>
                          <div className="field-set">
                            <input
                              type="password"
                              name="password"
                              id="password"
                              className="form-control"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                          <div className="field-set">
                            <input
                              type="password"
                              name="ConfirmPassword"
                              id="ConfirmPassword"
                              className="form-control"
                              placeholder="Confirm password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassWord(e.target.value)
                              }
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Creating account..." : "Submit"}
                          </button>
                          <p
                            className="title-forgot-account"
                            onClick={() => {
                              window.location.href = "/identify";
                            }}
                          >
                            Forgotten account?
                          </p>
                        </form>
                      ) : (
                        <form
                          id="form_register"
                          className="form-border"
                          method="post"
                          onSubmit={onLogin}
                        >
                          <div className="field-set ">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="form-control"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              style={{ marginBottom: "10px" }}
                            />
                          </div>
                          <div className="field-set ">
                            <input
                              type="password"
                              name="password"
                              id="password"
                              className="form-control"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary "
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Logging in..." : "Submit"}
                          </button>
                          <p
                            className="title-forgot-account"
                            onClick={() => {
                              window.location.href = "/identify";
                            }}
                          >
                            Forgotten account?
                          </p>
                        </form>
                      )}

                      <div className="title-line">
                        Or&nbsp;sign&nbsp;up&nbsp;with
                      </div>
                      <div className="row g-2">
                        <div className="col-lg-6">
                          <a className="btn-sc btn-fullwidth mb10 " href="#">
                            <img src="images/svg/google_icon.svg" alt="" />
                            Google
                          </a>
                        </div>
                        <div className="col-lg-6">
                          <a className="btn-sc btn-fullwidth mb10 " href="#">
                            <img src="images/svg/facebook_icon.svg" alt="" />
                            Facebook
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <OTP email={email} otp={otp} />
      )}
    </>
  );
};

export default Login;

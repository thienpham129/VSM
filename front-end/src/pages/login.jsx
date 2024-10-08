import React, { useEffect, useState } from "react";
import { axiosClient } from "helper/axiosClient";
import { DEFAULT } from "constants";

const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(""); 

    const url = "/login";
    try {
      // const response = await axiosClient.post(url, user);
      const response = await axiosClient.post(url, {
        email, password
      });

      if (response && response.data.accessToken) {
        localStorage.setItem(DEFAULT.TOKEN, response.data.accessToken);
        
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

  // const onChange = (e, fieldName) => {
  //   setUser((prev) => ({
  //     ...prev,
  //     [fieldName]: e.target.value,
  //   }));
  // };

  useEffect(() => {
    const token = localStorage.getItem(DEFAULT.TOKEN);
    if (token) {
      window.location.href = "/home"; 
    }
  }, []);

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top" />
        <section id="section-hero" aria-label="section" className="jarallax">
          <img src="images/background/2.jpg" className="jarallax-img" alt="" />
          <div className="v-center">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-4 offset-lg-4">
                  <div
                    className="padding40 rounded-3 shadow-soft"
                    data-bgcolor="#ffffff"
                  >
                    <h4>Login</h4>
                    <div className="spacer-10" />
                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}
                    <form
                      id="form_register"
                      className="form-border"
                      method="post"
                      onSubmit={onLogin}
                    >
                      <div className="field-set">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder="Enter your email"
                          // value={user.email}
                          // onChange={(e) => onChange(e, "email")}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{marginBottom :"10px"}}
                        />
                      </div>
                      <div className="field-set">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="form-control"
                          placeholder="Enter your password"
                          // value={user.password}
                          // onChange={(e) => onChange(e, "password")}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Logging in..." : "Submit"}
                      </button>
                    </form>
                    <div className="title-line">
                      Or&nbsp;sign&nbsp;up&nbsp;with
                    </div>
                    <div className="row g-2">
                      <div className="col-lg-6">
                        <a className="btn-sc btn-fullwidth mb10" href="#">
                          <img src="images/svg/google_icon.svg" alt="" />
                          Google
                        </a>
                      </div>
                      <div className="col-lg-6">
                        <a className="btn-sc btn-fullwidth mb10" href="#">
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
    </>
  );
};

export default Login;

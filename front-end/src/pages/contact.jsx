import React, { useState } from "react";
import axios from "axios"; // nếu bạn sử dụng axios
import { getTokenFromLocalStorage } from "utils/tokenUtils";
import { jwtDecode } from "jwt-decode";
import { root } from "helper/axiosClient";
import { useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [urlImage, setUrlImage] = useState();

  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  //
  const fetchUser = async (userId) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await root.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (data) {
        setFullName(
          `${response.data.firstName || ""} ${
            response.data.lastName || ""
          }`.trim()
        );
        setEmail(data.email || "");
        setUrlImage(response.data.urlImage);
      }
    } catch (error) {
      console.error("Failed to retrieve user data:", error);
    }
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;
        if (userId) {
          setUserId(userId);
          fetchUser(userId);
        } else {
          console.error("userId not found in token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      fullName: name,
      email: email,
      content: message,
    };

    try {
      const response = await root.post("/user/create-feedback", feedbackData);

      if (response.status === 200) {
        notifySuccessSend();
        setMessage("");
      }
    } catch (error) {
      notifyErrorSend();
    }
  };

  const fetchAllFeedback = async () => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await root.get("/public/view-feedback", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.status === 200) {
        setFeedbackList(response.data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    }
  };

  useEffect(() => {
    fetchAllFeedback();
  }, [feedbackList]);

  // Notifications
  const notifySuccessSend = () =>
    toast.success("Gửi đánh giá thành công! ", {
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

  const notifyErrorSend = () =>
    toast.error("Gửi đánh giá thất bại!", {
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

  //

  return (
    <div className="no-bottom no-top" id="content">
      <div id="top" />
      <section id="subheader" className="jarallax text-light">
        <img
          src="images/background/subheader.jpg"
          className="jarallax-img"
          alt=""
        />
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Đánh Giá</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="section">
        <div className="container">
          <div className="row g-custom-x">
            <div className="col-lg-8 mb-sm-30">
              <h3>Bạn có thắc mắc hay nhận xét gì không?</h3>
              <form
                name="contactForm"
                id="contact_form"
                className="form-border"
                onSubmit={handleSubmit} 
              >
                <div className="row">
                  <div className="col-md-6 mb10">
                    <div className="field-set">
                      <input
                        type="text"
                        name="Name"
                        id="name"
                        className="form-control"
                        placeholder="Nhập tên của bạn"
                        value={name}
                        onChange={(e) => setFullName(e.target.value)} 
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb10">
                    <div className="field-set">
                      <input
                        type="text"
                        name="Email"
                        id="email"
                        className="form-control"
                        placeholder="Nhập email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="field-set mb20">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    placeholder="Lời nhắn"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} 
                    required
                  />
                </div>
                <div
                  className="g-recaptcha"
                  data-sitekey="6LdW03QgAAAAAJko8aINFd1eJUdHlpvT4vNKakj6"
                />
                <div id="submit" className="mt20">
                  <input
                    type="submit"
                    id="send_message"
                    value="Gửi đánh giá"
                    className="btn-main"
                  />
                </div>
              </form>
              <div className="feedback-container">
                {feedbackList.map((feedback, index) => (
                  <div className="feedback-card" key={index}>
                    <div className="user-avatar">
                      {urlImage ? (
                        <img src={urlImage} className="img-fluid" alt="" />
                      ) : (
                        <img
                          src="images/avatar_user.png"
                          className="img-fluid"
                          alt=""
                        />
                      )}
                    </div>
                    <div className="feedback-content">
                      <h4 className="user-name">{feedback.fullName}</h4>
                      <p className="user-feedback">{feedback.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="de-box mb30">
                <h4>VSM Office</h4>
                <address className="s1">
                  <span>
                    <i className="id-color fa fa-map-marker fa-lg" />
                    Đại học FPT
                  </span>
                  <span>
                    <i className="id-color fa fa-phone fa-lg" />
                    +1 333 9296
                  </span>
                  <span>
                    <i className="id-color fa fa-envelope-o fa-lg" />
                    <a href="mailto:contact@example.com">vsm@email.com</a>
                  </span>
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>
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
};

export default Contact;

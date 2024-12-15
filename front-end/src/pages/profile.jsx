import SellectAddress from "components/SellectAddress";
import NavBarProfile from "components/NavBarProfile";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "services/app";
import { root } from "helper/axiosClient";
import { parseISO, format } from "date-fns";
import { getTokenFromLocalStorage } from "utils/tokenUtils";

import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [specificAddress, setSpecificAddress] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [reset, setReset] = useState(false);
  const [address, setAddress] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [userId, setUserId] = useState("");

  const [showFullAddress, setShowFullAddress] = useState(true);

  const [tickets, setTickets] = useState("");

  const [errors, setErrors] = useState({});

  // Call API
  const handleSpecificAddressChange = (event) => {
    setSpecificAddress(event.target.value);
  };

  const updateAddressValue = () => {
    const newAddress = `${specificAddress} ${
      ward ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},` : ""
    } ${
      district
        ? `${
            districts?.find((item) => item.district_id === district)
              ?.district_name
          },`
        : ""
    } ${
      province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : ""
    }`;
    setAddress(newAddress.trim());
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await apiGetPublicProvinces();
        if (response.status === 200) setProvinces(response.data.results);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (province) {
      setDistrict("");
      setWard("");
      const fetchDistricts = async () => {
        try {
          const response = await apiGetPublicDistrict(province);
          if (response.status === 200) setDistricts(response.data.results);
        } catch (error) {
          console.error("Failed to fetch districts:", error);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [province]);

  useEffect(() => {
    if (district) {
      setWard("");
      const fetchWards = async () => {
        try {
          const response = await apiGetPublicWard(district);
          if (response.status === 200) setWards(response.data.results);
        } catch (error) {
          console.error("Failed to fetch wards:", error);
        }
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [district]);

  useEffect(() => {
    updateAddressValue();
  }, [specificAddress, ward, district, province]);

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
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");
        setDob(data.dob || "");
        setGender(data.gender || "");
        setSpecificAddress(data.address || "");
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

  // Regex patterns
  const emailPattern = /^[^\d][\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^0\d{9,10}$/; // Matches numbers starting with 0 and has 10 or 11 digits
  const namePattern = /^[a-zA-Z]+$/; // Matches only letters and spaces

  const validate = () => {
    const validationErrors = {};

    // Validate email
    if (!emailPattern.test(email)) {
      validationErrors.email = "Email không hợp lệ. Không được bắt đầu bằng số.";
    }

    // Validate phone
    if (!phonePattern.test(phoneNumber)) {
      validationErrors.phoneNumber = "Số điện thoại phải bắt đầu bằng 0 và có độ dài từ 10 đến 11 số.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    
    const formData = new FormData();
    let dobFormatted = "";
    if (dob) {
      try {
        const dobParsed = parseISO(dob);
        dobFormatted = format(dobParsed, "dd/MM/yyyy");
      } catch (error) {
        console.error("Failed to parse DOB:", error);
      }
    }

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("dob", dobFormatted);
    formData.append("gender", gender);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);

    try {
      const token = getTokenFromLocalStorage();
      const response = await root.post(`/user/update-my-info`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('««««« response »»»»»', response.data);
      if (response.status === 200 && validate()) {
        // alert("Lưu thông tin cá nhân thành công!");
        notifySuccessUpdate();
        setShowFullAddress(false);
      }
    } catch (error) {
      console.log("Lỗi khi lưu thông tin cá nhân:", error);
      // alert("Có lỗi xảy ra khi lưu thông tin cá nhân.");
      notifyErrorUpdate();
    }
  };

  // Number of tickets
  
  const getAllTicketOfUser = async () => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await root.get(`/user/view-my-ticket`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTickets(response.data.length);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  useEffect(() => {
    getAllTicketOfUser();
  }, []);

  // 

  // Notifications
  const notifySuccessUpdate = () =>
    toast.success("Lưu thông tin cá nhân thành công! ", {
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

  const notifyErrorUpdate = () =>
    toast.error("Lưu thông tin cá nhân thất bại!", {
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
    
    <div className="no-bottom no-top zebra" id="content">
      <div id="top" />
      <section id="subheader" className="jarallax text-light">
        <img src="images/background/14.jpg" className="jarallax-img" alt="" />
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Thông tin cá nhân</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      <section id="section-settings" className="bg-gray-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb30">
              <NavBarProfile />
            </div>
            <div className="col-lg-9">
              <div className="card padding40 rounded-5">
                <form
                  id="form-create-item"
                  className="form-border"
                  method="post"
                >
                  <div className="de_tab tab_simple">
                    <ul className="de_nav">
                      <li className="active">
                        <span>Thông tin cá nhân</span>
                      </li>
                    </ul>
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          <div className="col-lg-6 mb20">
                            <h5>Họ</h5>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nhập họ vào đây"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
                          </div>
                          <div className="col-lg-6 mb20">
                            <h5>Tên</h5>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nhập tên vào đây"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                             {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
                          </div>

                          <div className="col-lg-6 mb20">
                            <h5>Số điện thoại</h5>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Nhập số điện thoại"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
                          </div>
                          <div className="col-lg-6 mb20">
                            <h5>Email</h5>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Nhập email vào đây"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled
                            />
                          </div>
                          <div className="col-lg-6 mb20">
                            <h5>Ngày sinh</h5>
                            <input
                              type="date"
                              className="form-control"
                              value={dob}
                              onChange={(e) => setDob(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-6 mb20">
                            <h5>Giới tính</h5>
                            <select
                              className="form-control"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="">Chọn giới tính</option>
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                              <option value="Khác">Khác</option>
                            </select>
                          </div>
                          <div className="col-lg-6 mb20">
                            <h5>Số lần mua đặt vé xe</h5>
                            <input type="number" className="form-control" value={tickets} disabled/>
                          </div>
                          <div className="col-lg-6 mb20">
                            <h5>Địa chỉ cụ thể</h5>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Địa chỉ cụ thể"
                              value={specificAddress}
                              onChange={handleSpecificAddressChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12 mb20">
                          <div className="row">
                            <div className="col-md-4 form-group ">
                              <SellectAddress
                                type="province"
                                value={province}
                                setValue={setProvince}
                                options={provinces}
                                label="Province/City(Tỉnh)"
                              />
                            </div>
                            <div className="col-md-4 form-group">
                              <SellectAddress
                                reset={reset}
                                type="district"
                                value={district}
                                setValue={setDistrict}
                                options={districts}
                                label="District(Quận)"
                              />
                            </div>
                            <div className="col-md-4 form-group">
                              <SellectAddress
                                reset={reset}
                                type="ward"
                                value={ward}
                                setValue={setWard}
                                options={wards}
                                label="Wards(phường)"
                              />
                            </div>
                            {/* {showFullAddress && (
                              <div className="col-md-12 form-group">
                                <h5>Địa chỉ nhà đầy đủ</h5>
                                <input
                                  type="text"
                                  readOnly
                                  className="form-control"
                                  value={address}
                                />
                              </div>
                             )} */}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn-main mt-3"
                          onClick={handleFormSubmit}
                        >
                          Lưu thông tin
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
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

export default Profile;
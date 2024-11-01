import axios from "axios";

export const getAuthToken = () => {
    return window.localStorage.getItem("accessToken");
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("accessToken", token);
    } else {
        window.localStorage.removeItem("accessToken");
    }
};

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

// export const request = (method, url, data) => {
//   let headers = {};
//   if (getAuthToken() !== null && getAuthToken() !== "null") {
//     headers = { Authorization: `Bearer ${getAuthToken()}` };
//   }

//   return axios({
//     method: method,
//     url: url,
//     headers: headers,
//     data: data,
//   });
// };

export const request = (method, url, data) => {
    // Gán token trực tiếp
    const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiYSI6WyJST0xFX0FETUlOIl0sImUiOiJ0ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTcyOTg2NTQwOH0.mhUOpCCQKBuB6kVTwPaqFQv9A5BooGhL2o64gQqWIBM";

    // Gán Bearer token vào headers
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    // Gửi yêu cầu HTTP bằng axios
    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data,
    });
};
import axios from "axios";

export const axiosAdmin = axios.create({
    baseURL: "http://localhost:8080/", // Main domain
    headers: {
        "Content-Type": "application/json",
    },
});
// export const axiosAdmin = axios.create({
//     baseURL: "http://localhost:8080/admin", // Main domain
//     headers: {
//         "Content-Type": "application/json",

//     },
// });
import axios from "axios";

export const axiosAdmin = axios.create({
    baseURL: "http://localhost:9000/", // Main domain
    headers: {
        "Content-Type": "application/json",
    },
});
// export const axiosAdmin = axios.create({
//     baseURL: "http://localhost:9000/admin", // Main domain
//     headers: {
//         "Content-Type": "application/json",

//     },
// });
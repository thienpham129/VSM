import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: "http://localhost:9000/auth", // Main domain
    headers: {
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});
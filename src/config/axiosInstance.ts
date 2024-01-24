import axios from "axios";
const API = import.meta.env.VITE_API_URL as string;
export const axiosInstance = axios.create({
    baseURL: API,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

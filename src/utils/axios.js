import axios from "axios";

let BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://192.168.43.93:5000/api/v1"
        : "";

let axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.defaults.headers["Content-Type"] = "application/json";

export default axiosInstance;

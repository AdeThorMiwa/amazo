import Axios from "./axios";

export default (token) => {
    if (token) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete Axios.defaults.headers.common["Authorization"];
    }
};

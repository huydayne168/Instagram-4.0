import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL,
});

// this privateHttp only use when user is AUTHENTICATED
const privateHttp = axios.create({
    baseURL: import.meta.env.VITE_REACT_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // use this so we can work with the header, cookies, ...
});

export default http;
export { privateHttp };

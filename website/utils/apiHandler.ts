import axios from "axios";

const apiHandler = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

const send = async (method, url, data, config) => {
    const response = await apiHandler.request({
        method,
        url,
        data,
        ...config,
    });
    return response.data;
};

export const get = (url, config) => {
    return send("get", url, null, config);
};

export const post = (url, data, config) => {
    return send("post", url, data, config);
};

export const put = (url, data, config) => {
    return send("put", url, data, config);
};

export const patch = (url, data, config) => {
    return send("patch", url, data, config);
};

export const del = (url, config) => {
    return send("delete", url, null, config);
};

export const setToken = (token: never): void => {
    apiHandler.defaults.headers["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
};

export default {
    get,
    post,
    put,
    patch,
    del,
    setToken,
};
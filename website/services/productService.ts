import * as apiHandler from "@/utils/apiHandler";

export const getAll = async () => {
    const response = await apiHandler.get("/products");
    return response;
};

export const getOne = async (id) => {
    const response = await apiHandler.get(`/products/${id}`);
    return response;
};

export const update = async (id, data) => {
    const response = await apiHandler.put(`/products/${id}`, data);
    return response;
};

export const del = async (id) => {
    const response = await apiHandler.del(`/products/${id}`);
    return response;
};

export default {
    getAll,
    getOne,
    update,
    del,
};
import * as apiHandler from "@/utils/apiHandler";

export const getAll = async () => {
    const response = await apiHandler.get("/users");
    return response;
};

export const getOne = async (id) => {
    const response = await apiHandler.get(`/users/${id}`);
    return response;
};

export default {
    getAll,
    getOne,
};
import * as apiHandler from "@/utils/apiHandler";

export const getCurrentUser = async () => {
    const response = await apiHandler.get("/auth/me");
    return response;
};

export const login = async (data) => {
    const response = await apiHandler.post("/auth/login", data);

    return response.data;
};

export const checkEmail = async (email) => {
    const response = await apiHandler.get("/auth/check-email", {
        params: {
            email,
        },
    });
    return response.exists;
};

export default {
    getCurrentUser,
    login,
    checkEmail,
};
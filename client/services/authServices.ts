import axios from "axios";

export interface LoginInput {
  email: string;
  password: string;
}

export async function login(data: LoginInput) {
  // Đảm bảo gửi cookie (credentials)
  return axios.post("/api/auth/login", data, { withCredentials: true });
}

import apiClient from "../utils/apiClient";

export const loginUser = (payload) => {
  return apiClient.post("/auth/login", payload);
};

export const registerUser = (payload) => {
  return apiClient.post("/auth/register", payload);
};

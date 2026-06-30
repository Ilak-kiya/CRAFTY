import api from "./axiosConfig";

export const sellerSignup = (data) => api.post("/insertSeller", data);

// Swap with /sellers/login when backend implements it
export const sellerLogin  = (data) => api.post("/sellers/login", data);

export const getSellerById = (id)      => api.get(`/fetchSeller/${id}`);

export const updateSeller  = (id, data) => api.put(`/updateSeller/${id}`, data);

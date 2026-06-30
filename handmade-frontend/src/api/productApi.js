import api from "./axiosConfig";

export const getProducts = () => api.get("/fetchProduct");

export const createProduct = (data) => api.post("/insertProduct", data);

export const updateProduct = (id, data) => api.put(`/updateProduct/${id}`, data);

export const deleteProduct = (id) => api.delete(`/deleterecordbyProductId/${id}`);

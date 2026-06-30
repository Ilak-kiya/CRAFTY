import api from "./axiosConfig";

export const customerSignup = (data) => api.post("/customers/insert", data);

// Login: use search by email + client-side password check (no dedicated login endpoint yet)
// When backend adds /customers/login, swap this call out
export const customerLogin  = (data) => api.post("/customers/login", data);

export const getCustomerById = (id)   => api.get(`/customers/${id}`);

export const updateCustomer  = (id, data) => api.put(`/customers/update/${id}`, data);

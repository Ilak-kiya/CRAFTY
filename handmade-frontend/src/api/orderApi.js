import api from "./axiosConfig";

// Customer APIs
export const fetchOrders      = ()              => api.get("/fetchOrder");
export const fetchOrderById   = (id)            => api.get(`/fetchOrder/${id}`);
export const insertOrder      = (data)          => api.post("/insertOrder", data);
export const cancelOrder      = (id)            => api.put(`/updateOrder/${id}`, { status: "cancelled" });
export const returnOrder      = (id, reason)    => api.put(`/updateOrder/${id}`, { status: "return_requested", returnReason: reason });

// Seller APIs
export const updateOrderStatus = (id, status)   => api.put(`/updateOrder/${id}`, { status });
export const markShipped       = (id, tracking) => api.put(`/updateOrder/${id}`, { status: "shipped", trackingNo: tracking });
export const markDelivered     = (id)            => api.put(`/updateOrder/${id}`, { status: "delivered" });
export const deleteOrder       = (id)            => api.delete(`/deleterecordbyOrderId/${id}`);

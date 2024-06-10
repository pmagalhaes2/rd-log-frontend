import axios from "axios";

const baseURL = "http://localhost:3001/orders";

const api = axios.create({
  baseURL: baseURL,
});

export const getAllOrders = async () => {
  try {
    const response = await api.get(baseURL);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

// export const updateOrderStatus = async (orderId, newStatus) => {
//   try {
//     const response = await api.patch(`/orders/${orderId}`, { status: newStatus });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to update order status:", error.response || error);
//     throw error;
//   }
// };







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


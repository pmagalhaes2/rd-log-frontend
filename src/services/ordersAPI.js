import axios from "axios";

const baseURL = "http://localhost:3001/orders";

const api = axios.create({
  baseURL: baseURL,
});

export const getAllOrders = async () => {
  try {
    const response = await api.get(baseURL);
    return response.data;
    const response = await api.get(baseURL);
    return response.data;
  } catch (error) {
    throw error.response;
    throw error.response;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await axios.patch(
      `${baseURL}/${orderId}`,
      {
        status: newStatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Status atualizado com sucesso:", response.data);
  } catch (error) {
    console.error(
      "Erro ao atualizar o status:",
      error.response ? error.response.data : error.message
    );
  }
};

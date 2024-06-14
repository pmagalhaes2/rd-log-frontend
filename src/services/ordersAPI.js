import axios from "axios";

const baseURL = `${process.env.REACT_APP_ORDER_API_URL}/orders`;

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

export const updateOrder = async (orderId, logisticCompanyId, newStatus) => {
  try {
    const response = await axios.patch(
      `${baseURL}/${orderId}`,
      {
        id_empresa_logistica: logisticCompanyId,
        status: newStatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

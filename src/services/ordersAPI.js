import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/orders`;

const api = axios.create({
  baseURL: baseURL
})

export const getAllOrders = async () => {
  try {
    const response = await api.get();
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getPendentsOrdersByLogisticId = async (logisticId) => {
  try {
    const response = await api.get(
      `pendents?logisticCompanyId=${logisticId}`
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await api.patch(
      `/${orderId}/status`,
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
    const response = await api.patch(
      `/${orderId}`,
      {
        logistic_company_id: logisticCompanyId,
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

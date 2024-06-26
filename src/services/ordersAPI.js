import axios from "axios";

const localBaseURL = `${process.env.REACT_APP_ORDER_API_URL}/orders`;

const baseURL = `${process.env.REACT_APP_API_URL}/orders`;

const api_local = axios.create({
  baseURL: localBaseURL,
});

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
    const response = await api_local.get(
      `/?id_empresa_logistica=${logisticId}&status=Pendente&status=Em andamento`
    );
    const filtered = response.data.filter(
      (order) => order.status === "Pendente" || order.status === "Em andamento"
    );
    return filtered;
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

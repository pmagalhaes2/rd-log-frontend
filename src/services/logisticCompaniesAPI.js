import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/logistic-companies`;

const api = axios.create({
  baseURL: baseURL,
});

export const getAllLogisticCompanies = async () => {
  try {
    const response = await api.get(baseURL);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getById = async (id) => {
  try {
    const response = await api.get(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const logisticCompanyLogin = async (email, password, role) => {
  try {
    const response = await api.post(
      `${baseURL}/login`,
      {
        email,
        password,
        role,
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

export const registerLogisticCompany = async (formData) => {
  try {
    const response = await api.post(baseURL, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateLogisticCompany = async (id, formData) => {
  try {
    const response = await api.put(`${baseURL}/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

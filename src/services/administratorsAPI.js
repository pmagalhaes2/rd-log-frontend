import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/administrators`;

const api = axios.create({
  baseURL: baseURL,
});

export const getAdministratorById = async (id) => {
  try {
    const response = await api.get(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const administratorLogin = async (email, password, role) => {
  try {
    const response = await api.post(
      `${baseURL}/login`,
      { email, password, role },
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


export const updateAdministrator = async (id, formData) => {
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


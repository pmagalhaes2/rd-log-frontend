import axios from "axios";

const baseURL = "http://localhost:8080/administrators";

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

import axios from "axios";

const baseURL = "https://viacep.com.br/ws";

const api = axios.create({
  baseURL: baseURL,
});

export const getCep = async (cep) => {
  try {
    const response = await api.get(`${baseURL}/${cep}/json`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/distance`;

const api = axios.create({
  baseURL: baseURL,
});

export const calculateDistanceAndDuration = async (origin, destination) => {
  try {
    const response = await api.get(
      `${baseURL}?origins=${origin}&destinations=${destination}&key=${process.env.REACT_APP_CALCULATE_DISTANCE_KEY}`
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

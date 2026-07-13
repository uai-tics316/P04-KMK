import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:5000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCards = async () => {
  const response = await apiClient.get("/cards");
  return response.data;
};

export const searchCards = async (name) => {
  const response = await apiClient.get("/search", {
    params: { name },
  });

  return response.data;
};

export const createCard = async (data) => {
  const response = await apiClient.post("/cards", data);
  return response.data;
};

export const deleteCard = async (id) => {
  const response = await apiClient.delete(`/cards/${id}`);
  return response.data;
};

export const updateCard = async (id, data) => {
  const response = await apiClient.put(`/cards/${id}`, data);
  return response.data;
};
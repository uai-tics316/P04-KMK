import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const getCards = async () => {
  const response = await axios.get(`${API_URL}/cards`);
  return response.data;
};

export const searchCards = async (name) => {
  const response = await axios.get(`${API_URL}/search?name=${name}`);
  return response.data;
};

export const scanCard = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axios.post(`${API_URL}/scan`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};

export const createCard = async (data) => {
  const response = await axios.post(`${API_URL}/cards`, data);
  return response.data;
};

export const deleteCard = async (id) => {
  const response = await axios.delete(`${API_URL}/cards/${id}`);
  return response.data;
};

export const updateCard = async (id, data) => {
  const response = await axios.put(`${API_URL}/cards/${id}`, data);
  return response.data;
};
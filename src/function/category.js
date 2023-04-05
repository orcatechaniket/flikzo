import axios from "axios";
const API = "http://localhost:8000/api/category";

export const createCategory = async (data) => {
  return await axios.post(`${API}`, data);
};

export const getCategory = async () => {
  return await axios.get(`${API}`);
};

export const deleteCategory = async (id) => {
  return await axios.delete(`${API}/${id}`);
};

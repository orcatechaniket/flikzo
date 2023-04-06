import axios from "axios";
const API = "https://www.flikzo.in/api/subcategory";

export const createSubCategory = async (data) => {
  return await axios.post(`${API}`, data);
};

export const getSubCategory = async () => {
  return await axios.get(`${API}`);
};

export const deleteSubCategory = async (id) => {
  return await axios.delete(`${API}/${id}`);
};

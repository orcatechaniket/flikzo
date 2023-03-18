import axios from "axios";
const API = "https://www.flikzo.in/api/product";

export const createProduct = async (data) => {
  return await axios.post(`${API}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProduct = async () => {
  return await axios.get(`${API}`);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${API}/${id}`);
};

export const singleProduct = async (id) => {
  return await axios.get(`${API}/${id}`);
};

export const filterProductOnSubCategory = async (id) => {
  return await axios.get(`${API}/subcategory/${id}`);
};

export const addSize = async (id, data) => {
  return await axios.put(`${API}/${id}`, data);
};

export const deleteSize = async (id, sizeId) => {
  return await axios.delete(`${API}/${id}/${sizeId}`);
};

export const updateSize = async (id, sizeId, data) => {
  return await axios.put(`${API}/${id}/${sizeId}`, data);
};

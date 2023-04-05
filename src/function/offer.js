import axios from "axios";
const API = "https://www.flikzo.in/api/offer";

export const createOffer = async (data) => {
    return await axios.post(`${API}`, data , {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

export const getOffer = async () => {
  return await axios.get(`${API}`);
};

export const deleteOffer = async (id) => {
  return await axios.delete(`${API}/${id}`);
};

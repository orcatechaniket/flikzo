import axios from "axios";
const API = "https://www.flikzo.in/api/todayoffer";

export const createTodayOffer = async (data) => {
  return await axios.post(`${API}`, data);
};

export const getTodayOffer = async () => {
  return await axios.get(`${API}`);
};

export const deleteTodayOffer = async (id) => {
  return await axios.delete(`${API}/${id}`);
};

import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const fetchCategories = () => api.get("/categories").then((r) => r.data);
export const fetchCategory = (slug) => api.get(`/categories/${slug}`).then((r) => r.data);
export const fetchProducts = (params = {}) => api.get("/products", { params }).then((r) => r.data);
export const fetchProduct = (slug) => api.get(`/products/${slug}`).then((r) => r.data);
export const createEnquiry = (payload) => api.post("/enquiries", payload).then((r) => r.data);

export const CONTACT = {
  phone: "+91 7296976875",
  phoneRaw: "917296976875",
  email: "sales@giftxpert.co",
  whatsapp: "917296976875",
  address: "1st Floor, Enkay Tower, Plot No. B&B1, Phase V, Vanijya Nikunj, Gurugram, Haryana 122016",
};

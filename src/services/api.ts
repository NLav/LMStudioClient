import axios from "axios";

const API_BASE_URL = "http://192.168.1.21:1234/v1";

const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const api = axios.create(apiConfig);

import axios from "axios";

const api = axios.create({
  baseURL: "http://200.17.199.250:5004/api"
});

export default api;

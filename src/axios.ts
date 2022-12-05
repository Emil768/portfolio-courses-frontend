import axios from "axios";

const instanse: any = axios.create({
  baseURL: "http://localhost:3001",
});

instanse.interceptors.request.use((config: any) => {
  config.headers!.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instanse;

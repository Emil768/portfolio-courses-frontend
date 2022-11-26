import axios from "axios";

const instanse = axios.create({
  baseURL: "http://localhost:3001",
});

export default instanse;

import axios from "axios";

const baseURL = "http://localhost:3001";
const service = axios.create({ baseURL });

const transactionsAPI = {
  all: () => service.get("/transactions"),
};

export { transactionsAPI };

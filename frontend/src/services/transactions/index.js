import axios from "axios";

const baseURL = "http://localhost:3001";
const service = axios.create({
  baseURL,
  // headers: { Authorization: `Bearer ${token}` },
})

const transactionsAPI = {
  all: () => service.get('/transactions'),
  create: data => service.post('/transactions', data),
  delete: id => service.delete(`/transactions/${id}`),
  update: data => service.put(`/transactions/${data.id}`, data),
}

export { transactionsAPI };

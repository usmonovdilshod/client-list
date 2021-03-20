import axios from "axios";

const API = axios.create({ baseURL: "https://cccr.herokuapp.com" });


API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchClients = () => API.get("/clients");
export const createClient = (newClient) => API.post("/clients", newClient);
export const updateClient = (id, updatedClient) =>
  API.patch(`/clients/${id}`, updatedClient);
export const deleteClient = (id) => API.delete(`/clients/${id}`);

export const signIn = (formData) => API.post("./users/signin", formData);
export const signUp = (formData) => API.post("./users/signup", formData);

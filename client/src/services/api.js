import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-blog-inqk.onrender.com/api",
});

// Attach token to every request
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;
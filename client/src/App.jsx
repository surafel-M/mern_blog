import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import API from "./services/api";

function Home() {
  useEffect(() => {
    API.get("/")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return <h2>Home Page</h2>;
}

function Login() {
  return <h2>Login Page</h2>;
}

function Register() {
  return <h2>Register Page</h2>;
}

function App() {
  return (
    <div>
      <h1>MERN Blog</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
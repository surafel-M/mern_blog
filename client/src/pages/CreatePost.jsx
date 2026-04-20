import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/posts", form);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />

      <textarea
        name="content"
        placeholder="Content"
        onChange={handleChange}
      />

      <button type="submit">Create</button>
    </form>
  );
}

export default CreatePost;
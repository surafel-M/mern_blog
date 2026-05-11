import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [image, setImage] = useState(null);
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
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (image) formData.append("image", image);

    await API.post("/posts", formData);

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
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
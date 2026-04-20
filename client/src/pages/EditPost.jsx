import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await API.get(`/posts/${id}`);
      setForm({
        title: data.title,
        content: data.content,
      });
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/posts/${id}`, form);
      navigate(`/post/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
    </form>
  );
}

export default EditPost;
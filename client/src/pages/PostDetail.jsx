import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await API.get(`/posts/${id}`);
      setPost(data);
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/posts/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) return <p>Loading...</p>;

  const isOwner = user && post.author?._id === user._id;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>By: {post.author?.username}</small>

      {isOwner && (
        <>
          <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default PostDetail;
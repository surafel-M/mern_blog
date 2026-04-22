import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchComments = async () => {
    const { data } = await API.get(`/comments/${id}`);
    setComments(data);
};


  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await API.get(`/posts/${id}`);
      setPost(data);
    };
    

    fetchPost();
    fetchComments();
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

      <form onSubmit={async (e) => {
        e.preventDefault();

        try {
          await API.post(`/comments/${id}`, { text });
          setText("");
          fetchComments();
          
        } catch (error) {
          console.log(error);
        }
      }}
>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Post</button>
      </form>

  <h3>Comments</h3>

  {comments.map((c) => (
    <div key={c._id} className="card">
      <strong>{c.user.username}</strong>
      <p>{c.text}</p>
    </div>
  ))}
    </div>
  );
}

export default PostDetail;
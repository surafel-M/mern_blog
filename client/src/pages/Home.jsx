import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
      const { data } = await API.get("/posts");
      setPosts(data);
    } catch (error) {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h2>All Posts</h2>
      
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div className="card" key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>

            <Link to={`/post/${post._id}`}>Read More</Link>
          </div>
        ))
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Home;
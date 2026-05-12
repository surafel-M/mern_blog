import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");


  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

  useEffect(() => {
    const fetchPosts = async () => {
  setLoading(true);

  try {
    const { data } = await API.get(`/posts?search=${debouncedSearch}`);
    setPosts(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

    fetchPosts();
  }, [debouncedSearch]);

  return (
    <div className="container">
      <h2>All Posts</h2>

      <input
  type="text"
  placeholder="Search posts..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
  }}
/>
      
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div className="card" key={post._id}>
            {post.image && (
  <img src={post.image} alt="" style={{ width: "100%" }} />
)}
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
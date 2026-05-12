import { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyPosts = async () => {
      try {
        const { data } = await API.get("/posts/my-posts");
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyPosts();
  }, [navigate, user]);

  return (
    <div>
      <h2>Profile</h2>

      <div className="card">
        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <h3>My Posts</h3>

      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="card">
            <h4>{post.title}</h4>

            {post.image && (
              <img
                src={post.image}
                alt=""
                style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
              />
            )}

            <p>{post.content.substring(0, 100)}...</p>

            <Link to={`/post/${post._id}`}>
              Read More
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;
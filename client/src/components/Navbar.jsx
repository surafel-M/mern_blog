import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link>

      {user ? (
        <>
          <span style={{ margin: "0 10px" }}>Hello, {user.username}</span>
          <Link to="/create">Create</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: "10px" }}>Login</Link>
          <Link to="/register" style={{ marginLeft: "10px" }}>Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
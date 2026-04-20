import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{
  padding: "15px",
  background: "white",
  borderBottom: "1px solid #ddd",
  display: "flex",
  justifyContent: "space-between"
}}>
  <div>
    <Link to="/">Blogger</Link>
  </div>

  <div>
    {user ? (
      <>
        <span>{user.username}</span>
        <Link to="/create">Create</Link>
        <button onClick={logout}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )}
  </div>
</nav>
  );
}

export default Navbar;
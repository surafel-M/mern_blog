import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
      <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
      <Link to="/create">Create Post</Link>
    </nav>
  );
}

export default Navbar;
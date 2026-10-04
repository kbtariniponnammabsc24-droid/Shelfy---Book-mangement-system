// Functional component with navigation links (React Router NavLink).
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">Shelfly</NavLink>
        <nav className="nav-links">
          <NavLink to="/" end>Books</NavLink>
          <NavLink to="/add">Add Book</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

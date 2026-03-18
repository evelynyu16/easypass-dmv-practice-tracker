import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <span className="navbar-brand">
        EasyPass DMV Practice Tracker
      </span>

      <div className="ms-auto d-flex gap-2">

        {/* Saved Questions */}
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "btn btn-light"
              : "btn btn-outline-light"
          }
        >
          Saved
        </Link>

        {/* Mistake Notebook */}
        <Link
          to="/mistakes"
          className={
            location.pathname === "/mistakes"
              ? "btn btn-danger"
              : "btn btn-outline-light"
          }
        >
          Mistakes
        </Link>

        {/* Favorite Questions */}
        <Link
          to="/favorites"
          className={
            location.pathname === "/favorites"
              ? "btn btn-warning"
              : "btn btn-outline-light"
          }
        >
          Favorites
        </Link>

        {/* Add Question */}
        <Link
          to="/add-question"
          className={
            location.pathname === "/add-question"
              ? "btn btn-success"
              : "btn btn-outline-light"
          }
        >
          Add
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
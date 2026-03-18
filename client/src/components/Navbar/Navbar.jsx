import PropTypes from "prop-types";
import "./Navbar.css";

function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-title">EasyPass DMV Practice Tracker</div>

      <div className="navbar-links">
        <button
          className={currentPage === "saved" ? "nav-button active" : "nav-button"}
          onClick={() => onNavigate("saved")}
        >
          Saved Questions
        </button>

        <button
          className={currentPage === "mistakes" ? "nav-button active" : "nav-button"}
          onClick={() => onNavigate("mistakes")}
        >
          Mistake Notebook
        </button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  currentPage: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default Navbar;
import "./Navbar.css";

import { Link } from "react-router-dom";

import home from "../icons/home-button.png";
import search from "../icons/search.png";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <Link to="/home">
          <img src={home} className="navbar-icon" />
          <div className="label">Home</div>
        </Link>
        <Link to="/search">
          <img src={search} className="navbar-icon" />
          <div className="label">Search</div>
        </Link>
      </div>
      <footer>
        <a href="https://www.flaticon.com/free-icons/pixel" title="pixel icons">
          Pixel icons created by frelayasia - Flaticon
        </a>
        <a
          href="https://www.flaticon.com/free-icons/zoom-in"
          title="zoom in icons"
        >
          Zoom in icons created by Libertyink - Flaticon
        </a>
      </footer>
    </>
  );
}

export default Navbar;

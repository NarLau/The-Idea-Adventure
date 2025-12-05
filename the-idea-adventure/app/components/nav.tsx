import { NavLink } from "react-router-dom";
import React, { useState } from "react";

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="nav-container">
      <NavLink to="/">
        <h2 className="logo">LOGO</h2>
      </NavLink>

      {/* Hamburger Icon */}
      <div
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu */}
      <ul className={`nav-menu ${isOpen ? "show" : ""}`}>
        <li>
          <NavLink
            to="/"
            className={getActiveClass}
            end
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/project-info"
            className={getActiveClass}
            onClick={() => setIsOpen(false)}
          >
            Info
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/navplaygame"
            className={getActiveClass}
            onClick={() => setIsOpen(false)}
          >
            Play Game
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

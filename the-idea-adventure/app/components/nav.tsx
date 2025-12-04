import { NavLink } from "react-router-dom";
import React from "react";


const Nav: React.FC = () => {
  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="nav-container">
      <h2 className="logo">LOGO</h2>

      <ul className="nav-menu">
        <li>
          <NavLink to="/" className={getActiveClass} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={getActiveClass}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={getActiveClass}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;


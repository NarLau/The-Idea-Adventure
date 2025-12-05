import { NavLink } from "react-router-dom";
import React from "react";


const Nav: React.FC = () => {
  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="nav-container">
      <NavLink to="/" ><h2 className="logo">LOGO</h2></NavLink>

      <ul className="nav-menu">
        <li>
          <NavLink to="/" className={getActiveClass} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/project-info" className={getActiveClass}>
            Info
          </NavLink>
        </li>
        <li>
          <NavLink to="/navplaygame" className={getActiveClass}>
            Play Game
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;


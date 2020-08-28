import React from "react";
import { NavLink } from "react-router-dom";
import "styles/Navbar.scss";

function Navbar(props: {}) {
  return (
    <nav className="navbar">
      <NavLink to="/translate/file">Upload File</NavLink>
      <NavLink to="/translate/text">Insert Text</NavLink>
    </nav>
  );
}

export default Navbar;

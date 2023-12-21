// Navbar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <img className="logo" src={logo} alt="Logo" />
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div
        className="menu-items"
        style={{ display: isMenuOpen ? "flex" : "none" }}
      >
        <Link to="/" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/about" onClick={toggleMenu}>
          About
        </Link>
        <Link to="/lend" onClick={toggleMenu}>
          Lend
        </Link>
        <Link to="/rent" onClick={toggleMenu}>
          Rent
        </Link>
        <Link to="/login" onClick={toggleMenu}>
          Login
        </Link>
      </div>
      <div className="search">
        <Search />
      </div>
    </div>
  );
};

export default Navbar;

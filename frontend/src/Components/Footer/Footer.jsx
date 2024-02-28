import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "rgba(100, 26, 56, 0.823)",
        padding: "20px",
        marginTop: "20px",
        color: "white",
        textAlign: "center",
      }}
    >
      <Link
        to="/about"
        style={{
          textDecoration: "none",
          color: "white",
          marginLeft: "30px",
        }}
      >
        About
      </Link>
      <Link
        to="/contact"
        style={{
          textDecoration: "none",
          color: "white",
          marginLeft: "30px",
        }}
      >
        Contact
      </Link>

      <p>
        <b> Email : </b> <i>rentcycle@gmail.com</i>
      </p>
      <p>&copy; 2024 RentCycle</p>
    </footer>
  );
};

export default footer;

import React from "react";
import fashionImage from "../../assets/fashion.webp";

import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div
        className="container"
        // style={{ backgroundColor: "#ffe6e6" }}
      >
        <h1
          style={{ fontWeight: "bold", fontSize: "3rem", marginLeft: "20px" }}
        >
          Welcome to Clothing Rental System
        </h1>
        <img
          className="clothing-image"
          src={fashionImage}
          alt="Clothing Image"
        />
        <div className="quotation">
          <p>
            <b>"Buy Less</b>
          </p>
          <p>
            <b>Wear More </b>
          </p>
          <p>
            <b>Start Renting"</b>
          </p>
        </div>
        <Link to={"/rent"}>
          <button className="rent-button">Rent Now</button>
        </Link>
      </div>
    </>
  );
};

export default Home;

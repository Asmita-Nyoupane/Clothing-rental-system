import React from "react";
import fashionImage from '../../assets/fashion.webp';
// import Navbar  from './Components/Navbar/Navbar'

import "./Home.css";

const Home = () => {
  return (
    <>
      {/* <Navbar/> */}
      <div className="container">
        <h1>Welcome to Clothing Rental System</h1>
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
        <button className="rent-button">Rent Now</button>
      </div>
    </>
  );
};

export default Home;

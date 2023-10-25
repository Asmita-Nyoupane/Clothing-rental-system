import React from 'react'
import Navbar  from './Components/Navbar/Navbar'

import './Home.css'

const Home = () => {
  return (
   <>
    <Navbar/>
    <div class="container">
        <h1>Welcome to Clothing Rental System</h1>
        <img class="clothing-image" src="fashion.webp"alt="Clothing Image"/>
        <p class="quotation">
        <p><b>"Buy Less</b></p>
        <p><b>Wear More </b></p>
        <p><b>Start Renting"</b></p>
        </p>
        <button class="rent-button">Rent Now</button>
    </div>
   </>
  )
}

export default Home
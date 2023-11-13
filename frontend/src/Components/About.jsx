import React from 'react'
import MyImage from '../assets/aboutusimage.jpg'
import { Link } from 'react-router-dom';
const paragraphStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '15px',
  lineHeight: '1.5',
  color: '#333', // Text color
  backgroundColor: '#f9f9f9', // Background color
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};
const buttonStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '-5px'
};

const About = () => {
  return (
    <>
  <div className="container">
    <div className="row">
      <div className="col-md-12">
         
               <img src= {MyImage} alt=""
                className="img-fluid rounded" 
                
           /> 
           <p style={paragraphStyle}>Our platform, the Clothing Rental System, leverages the power of technology to simplify the process of finding and renting clothing. It empowers users to explore and access a diverse range of clothing items, while also enabling individuals to showcase their fashion collections, fostering a community of fashion-conscious users.Also establishes a direct relationship between lenders (those offering clothing for rent) and renters (those seeking stylish attire).We aim to make fashion accessible, sustainable, and convenient for everyone. </p>
       </div>           
    </div>
   </div>
<Link to ="/login">
   <button style={buttonStyle}>Get Started</button>
   </Link>
    </>
    

  )
}

export default About
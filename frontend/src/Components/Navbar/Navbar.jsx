import './Navbar.css'
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import {DataContext} from '../../context/DataProvider'

const Navbar = () => {
  // const { account, setAccount } = useContext(DataContext);

  // Function to handle logout
  // const handleLogout = () => {
  //   // Implement logout logic here, e.g., clear the authentication token
  //   sessionStorage.removeItem('accesstoken');
  //   sessionStorage.removeItem('refreshToken');
  //   setAccount(null);
  // };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/lend">Lend</Link>
      <Link to="/rent">Rent</Link>
      <Link to="/login">Login</Link>
{/* 
      {account ? (
        // Display "Logout" if the user is logged in
        <Link to="/login" onClick={handleLogout}>Logout</Link>
      ) : (
        // Display "Login" if the user is not logged in
        <Link to="/login">Login</Link>
      )} */}
    </div>
  );
};

export default Navbar;

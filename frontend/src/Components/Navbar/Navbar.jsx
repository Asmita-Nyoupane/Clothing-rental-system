import './Navbar.css'
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
//  import logo from '../../assets/logo.png'
// import {DataContext} from '../../context/DataProvider'

const Navbar = () => {
  
  return (
<> 
 <div className="navbar">
    {/* <img src={logo} alt="Logo"/> */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/lend">Lend</Link>
      <Link to="/rent">Rent</Link>
      <Link to="/login">Login</Link>
      <div className='search'>
<Search/>
</div>
  
    </div>

    
    </>
  );
};

export default Navbar;

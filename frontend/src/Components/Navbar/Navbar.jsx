import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
      <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/lend">Lend</Link>
      <Link to="/rent">Rent</Link>
      <Link to="/login">Login</Link>
  </div>
  
    )
  }
  
  export default Navbar
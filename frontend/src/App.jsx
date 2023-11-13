import React from 'react'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import About from './Components/About'
import Getstarted from './Components/About'
 


 const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
         <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={< About />} />
        <Route path="/" element={< Getstarted/>} />
 
      </Routes>
    </BrowserRouter>
      </>
  )
}

export default App 
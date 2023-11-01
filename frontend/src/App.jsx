import React from 'react'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import Lend from './Components/Lend/Lend'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'

 const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
         <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/lend" element={<Lend/>}/>
      </Routes>
    </BrowserRouter>
      </>
  )
}

export default App 
import React from 'react'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Signup from './Components/Signup'

 const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
         <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
      </>
  )
}

export default App 
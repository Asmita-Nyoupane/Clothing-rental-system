import React from 'react'
import Home from './Home'
import Login from './Components/Login'
import Register from './Components/Register'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

 const App = () => {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
      </>
  )
}

export default App 
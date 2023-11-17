import React from 'react'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import Lend from './Components/Lend/Lend'
import {Rent} from './Components/Rent/Rent'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Signup from './Components/Signup'
import DataProvider from './context/DataProvider'
import About from './Components/About'
import Getstarted from './Components/About'
 


 const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <DataProvider>
      <Routes>
         <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/lend" element={<Lend/>}/>
        { <Route path="/rent" element={<Rent/>}/> }
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/about" element={< About />} />
        <Route path="/" element={< Getstarted/>} />
 
      </Routes>
      </DataProvider>
    </BrowserRouter>
      </>
  )
}

export default App 
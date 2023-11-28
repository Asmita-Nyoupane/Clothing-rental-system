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
 import Details from './Components/Details/Details'


 const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <DataProvider>
      <Routes>
         <Route path="/" element={<Home/>}/> 
         <Route path="/lend" element={<Lend/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup />} />
         <Route path="/rent" element={<Rent/>}/> 
         <Route path="/rent/details/:id" element={<Details/>}/> 
       
        
        <Route path="/about" element={< About />} />
        <Route path="/getstarted" element={< Getstarted/>} />
 
      </Routes>
      </DataProvider>
      
    </BrowserRouter>
      </>
  )
}

export default App 
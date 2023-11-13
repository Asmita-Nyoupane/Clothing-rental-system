import React from 'react'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import Lend from './Components/Lend/Lend'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Signup from './Components/Signup'
import DataProvider from './context/DataProvider'

 const App = () => {
  return (
    <>
    <BrowserRouter>
    <DataProvider>
    <Navbar/>
      <Routes>
         <Route path="/" element={<Home/>}/> 
         <Route path="/lend" element={<Lend/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </DataProvider>
    </BrowserRouter>
      </>
  )
}

export default App 
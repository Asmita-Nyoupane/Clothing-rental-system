import React from 'react'
import Home from './Components/Home/Home'
import Login from './Components/Login'
<<<<<<< HEAD
import Register from './Components/Register'
import Lend from './Components/Lend/Lend'
=======
>>>>>>> 7cf110b29d1663c02e0ccb8ae12fca1e3cd8cf33
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Signup from './Components/Signup'
import DataProvider from './context/DataProvider'

 const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <DataProvider>
      <Routes>
         <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
<<<<<<< HEAD
        <Route path="/register" element={<Register />} />
        <Route path="/lend" element={<Lend/>}/>
=======
        <Route path="/signup" element={<Signup />} />
>>>>>>> 7cf110b29d1663c02e0ccb8ae12fca1e3cd8cf33
      </Routes>
      </DataProvider>
    </BrowserRouter>
      </>
  )
}

export default App 
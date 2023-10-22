import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Login from './assets/Component/Login'
import Register from './assets/Component/Register'



function App() {
 

  return (
   
   <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
    </Router>
  )
}

export default App

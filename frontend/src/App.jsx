import React from "react";
import Home from "./Components/Home/Home";
import Login from "./Components/Login";
import Lend from "./Components/Lend/Lend";
import Rent from "./Components/Rent/Rent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup";
import DataProvider from "./context/DataProvider";
import About from "./Components/About";
import Getstarted from "./Components/About";
import Details from "./Components/Details/Details";
import Update from "./Components/Update/Update";
import { LocationProvider } from "./context/LocationProvider";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <DataProvider>
          <LocationProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/lend"
                element={
                  <PrivateRoute>
                    <Lend />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/rent"
                element={
                  <PrivateRoute>
                    <Rent />
                  </PrivateRoute>
                }
              />
              <Route
                path="/rent/details/:id"
                element={
                  <PrivateRoute>
                    <Details />
                  </PrivateRoute>
                }
              />
              <Route
                path="/update/:id"
                element={
                  <PrivateRoute>
                    <Update />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/getstarted" element={<Getstarted />} />
            </Routes>
          </LocationProvider>
        </DataProvider>
      </BrowserRouter>
    </>
  );
};
export default App;

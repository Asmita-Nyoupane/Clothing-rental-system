import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import Lend from "./Components/Lend/Lend";
import Rent from "./Components/Rent/Rent";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Auth/Signup";
import DataProvider from "./context/DataProvider";
import About from "./Components/About";
// import Getstarted from "./Components/About";
import Details from "./Components/Details/Details";
import Update from "./Components/Update/Update";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Chatpage from "./Pages/ChatPage";
import SearchResult from "./Pages/SearchResult";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <DataProvider>
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
            <Route path="/rent" element={<Rent />} />
            <Route path="/:page/details/:id" element={<Details />} />
            <Route
              path="/update/:id"
              element={
                <PrivateRoute>
                  <Update />
                </PrivateRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/searchResult" element={<SearchResult />} />
            <Route path="/chatPage" element={<Chatpage />} />
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </>
  );
};
export default App;

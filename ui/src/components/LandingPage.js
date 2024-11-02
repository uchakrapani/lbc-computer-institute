// src/components/LandingPage.js
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import About from "./About";
import WhyChooseUs from "./WhyChooseUs";
import NewsTicker from "./NewsTicker";

const LandingPage = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <NewsTicker/>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
};

export default LandingPage;

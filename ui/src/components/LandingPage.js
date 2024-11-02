// src/components/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import CarouselLBC from "./CarouselLBC";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Use navigate instead of history.push
  };

  return (
    <>
      <Header />
      <CarouselLBC/>
      <button className="btn btn-primary mt-3" onClick={handleLoginClick}>
        Login
      </button>
    </>
  );
};

export default LandingPage;

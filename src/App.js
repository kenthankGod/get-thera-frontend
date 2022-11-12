import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TherapistBooking from "./components/pages/therapists/TherapistBooking";
import SignUp from "./components/pages/signup/SignUp";
import Home from "./components/pages/home/Home";
import ErrorPage from "./components/pages/error/ErrorPage";
import About from "./components/pages/about/About";
import Footer from "./components/footer/Footer";
import Login from "./components/pages/login/Login";
import MinutesBookings from "./components/pages/bookings/MinutesBookings";
import ConfirmBookings from "./components/pages/bookings/ConfirmBookings";



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="therapistBooking" element={<TherapistBooking />} />
        <Route path="therapistBooking/:therapistId" element={<MinutesBookings />} />
        <Route path="confirm-booking/:therapistId/:fromDate/:toDate/:time" element={<ConfirmBookings />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer /> 
    </Router>
  ); 
}

export default App;






















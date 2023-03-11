import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TherapistBooking from "./components/pages/therapists/TherapistBooking";
import SignUp from "./components/pages/signup/SignUp";
import Home from "./components/pages/home/Home";
import ErrorPage from "./components/pages/error/ErrorPage";
import Footer from "./components/footer/Footer";
import Login from "./components/pages/login/Login";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import BookingsDashboard from "./components/pages/bookings/BookingsDashboard";
import Calendar from "./components/calendar/Calendar";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route
            path="/therapistBooking"
            exact
            element={<ProtectedRoutes Component={TherapistBooking} />}
          />
          <Route
            path="/calendar/:therapistId"
            element={<ProtectedRoutes Component={Calendar} />}
          />
          <Route
            path="/bookings"
            element={<ProtectedRoutes Component={BookingsDashboard} />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer position="top-center" limit={1} />
    </>
  );
}

export default App;

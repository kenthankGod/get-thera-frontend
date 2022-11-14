import React from "react";
import { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import SignUpForm from "./SignUpForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`https://getthera-api.onrender.com/signup`, formData);
      console.log(response.data);
      if (response && response.data) {
        setIsLoading(false);
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (error && error.response) { 
        setIsLoading(false);
        toast.error(error.response.data.message);
        // setIsLoading(false);
        console.log(error.response.data.message);
      }

      if (error.message === "Request failed with status code 404") {
        toast.error("Network Error can't register at the moment!");
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <SignUpForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={setFormData}
        isLoading={isLoading}
        toastError={<ToastContainer position="top-center" limit={1} />}
      />
    </>
  );
};

export default SignUp;

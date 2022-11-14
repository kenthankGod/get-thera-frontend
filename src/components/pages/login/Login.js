import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./Login.css";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [token, setToken] = useState('');

  const navigate = useNavigate();

  const URL = process.env.REACT_APP_API_URL;




  
  useEffect(() => {
    const token = localStorage.getItem("token");

    // setToken(localStorage.getItem("token"))

    try {
      axios
        .get(`https://getthera-api.onrender.com/theapistBooking`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          navigate("/therapistBooking");
        });
    } catch (error) {
      console.log(error);
      if (error) {
        navigate("/login");
        if (error && error.response) {
          // console.log(error.response.data.message);
        }
      }
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(`https://getthera-api.onrender.com/login`, formData);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/therapistBooking");
      if (response && response.data) {
        setIsLoading(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error && error.response) {
        setIsLoading(false);
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      }

      if (error.message === "Request failed with status code 404") {
        toast.error("Network Error can't login at the moment!");
        setIsLoading(false);
      }
    }
  }; 

  return (
    <>
      <LoginForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={setFormData}
        isLoading={isLoading}
        toastError={<ToastContainer position="top-center" limit={1} />}
      />
    
    </>
  );
};

export default Login;

import React from "react";
import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import useAuthContext from "../../../context/auth_context/AuthContext";


const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const { login, isLoading } = useAuthContext();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <>
        <div class="form_container">
          <div className="form_container_text">
          <p className="welcome_back">Welcome back</p>
          <p className="continue">Login to your accout to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="form_label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <label className="form_label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button className="form_button" type="submit" disabled={isLoading}>
            {isLoading ? "submitting..." : "Login"}
          </button>
         <span className="already_have_account">don't have an account? <Link to="/signup" className="link">create account</Link></span> 
        </form>
      </div>
    </>
  );
};

export default Login;

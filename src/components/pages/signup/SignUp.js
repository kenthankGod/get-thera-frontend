import React from "react";
import { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import useAuthContext from "../../../context/auth_context/AuthContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
  });

  const { signup, isLoading } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div class="form_container">
        <div className="form_container_text">
          <p className="welcome_back">Welcome to gethera</p>
          <p className="continue">Let's get you started. Create an account to begin</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="form_label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            value={formData.userName}
            required
          />
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
          <button className="form_button" type="submit">
            {isLoading ? "submitting..." : "Sign up"}
          </button>
         <span className="already_have_account">already have an account? <Link to="/login" className="link">login</Link></span> 
        </form>
      </div>
    </>
  );
};

export default SignUp;

import React from "react";
import { useState, useEffect } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
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
    console.log(formData);
    await signup(formData);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="form_container">
        <div className="form_wrapper">
          <form onSubmit={handleSubmit}>
            <span className="form_text text-center">
              <FaUserPlus className="icon" /> sign up
            </span>

            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="form-control shadow-none"
                type="text"
                name="userName"
                onChange={handleChange}
                value={formData.userName}
              />
              {/* {error} */}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control shadow-none"
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-control shadow-none"
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
              <br />
              <button
                className="btn shadow-none"
                type="submit"
                disabled={isLoading}
              >
                {" "}
                {isLoading ? "submitting" : "Sign up"}
              </button>
              already have an account? <Link to="/login">login</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;

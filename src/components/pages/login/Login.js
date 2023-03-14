import React from "react";
import { useState } from "react";
import "./Login.css";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthContext from "../../../context/auth_context/AuthContext";


const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const { login, success, error, isLoading } = useAuthContext();

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
      <section className="form_container">
        <div className="form_wrapper">
          {/* {success.message === "success" && (
            <div className="alert alert-success" role="alert">
              login successful!
            </div>
          )} */}
         

          <form onSubmit={handleSubmit}>
            <span className="form_text text-center">
              <FaSignInAlt className="icon" /> log in
            </span>

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
                {isLoading ? "submitting..." : "Login"}
              </button>
              <p>
                don't have an account? <Link to="/signup">create account</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;

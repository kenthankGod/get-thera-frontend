import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUpForm = ({
  handleSubmit,
  handleChange,
  formData,
  isLoading,
  toastError,
}) => {
  return (
    <>
      <section className="form_container">
        <div className="form_wrapper">
          <form onSubmit={handleSubmit}>
            <span className="form_text text-center">
              <FaSignInAlt className="icon" /> SIGN UP
            </span>

          

          

            <div className="form-group">
              <label className="form-label" htmlFor="userName">
              Username
              </label>
              <input
                className="form-control shadow-none"
                type="username"
                name="username"
                onChange={handleChange}
                value={formData.userName}
              />
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
                style={{ width: "100%" }}
                className="btn shadow-none"
                disabled={isLoading}
                type="submit"
              >
                {" "}
                {isLoading ? "Submitting..." : "Sign up"}
              </button>
              already have an account? <Link to="/login">login</Link>
              {toastError}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUpForm;

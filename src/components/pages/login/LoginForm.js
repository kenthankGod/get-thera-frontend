import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = ({
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
          <span className="form_text text-center"><FaSignInAlt className="icon" /> LOG IN</span>

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
              {isLoading ? "Submitting..." : "Login"}
            </button>
            <p>
              don't have an account? <Link to="/signup">create account</Link>
            </p>
          </div>
        </form>
        </div>
      </section>
      {toastError}
    </>
  );
};

export default LoginForm;

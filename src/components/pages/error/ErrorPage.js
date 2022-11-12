import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className=" Error_container container">
      <div className="row">
        {/* <div className="col-lg-12 mx-auto"> */}
        <h3>404</h3>
        <h4>Page Not Found</h4>
        <h6>The page you're looking for does not seem to exist</h6>
        <p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Home
          </button>
        </p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Error;

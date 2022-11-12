import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const HeroSections = () => {
  let navigate = useNavigate();
  return (
    <>
      <section className="first_section text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <p className="help_us">
              Hey, Help <span className="us">Us </span> <br /> Help You <br />
              {/* <h4>Speak to a specialist.</h4>  */}
                <button
                type="button"
                className="navigate_btn"
                onClick={() => {
                  navigate("/therapistBooking");
                }}
              >
                See a Therapist{" "}
                <span>
                  <FaArrowCircleRight />
                </span>
              </button>
              </p>
             
            </div>
          </div>
        </div>
      </section>

      <br />
    </>
  );
};

export default HeroSections;

import React from "react";
import { useNavigate } from "react-router-dom";
import therapistImage from "../../heroImage/therapy.jpg";

const HeroSections = () => {
  let navigate = useNavigate();
  return (
    <>
      <section className="home">
        <section class="hero">
          <div class="hero-text">
            <h1>A Simple, Straightfoward, Booking System.</h1>
            <p>
              create an acount, <br /> choose a therpaist, <br /> your'e done!!!
            </p>
            <button
              className="navigate_btn"
              onClick={() => {
                navigate("/therapistBooking");
              }}
            >
              Find Therapist
            </button>
          </div>
          <div class="hero-image">
            <img src={therapistImage} alt="therapistImg" />
          </div>
        </section>
      </section>
    </>
  );
};

export default HeroSections;

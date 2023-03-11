import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSections = () => {
  let navigate = useNavigate();
  return (
    <>
      <section className="first_section text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <motion.p
                className="help_us pb-5"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3 }}
              >
                A simple, supportive approach for mental health <br />
                <button
                  className="navigate_btn"
                  onClick={() => {
                    navigate("/therapistBooking");
                  }}
                >
                  Find a therapist{" "}
                </button>
              </motion.p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSections;

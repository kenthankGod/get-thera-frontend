import React from "react";
import therapistData from "./TherapistData";
import { useState, useEffect } from "react";
import "./Therapist.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TherapistBooking = () => {
  const [searchField, setSearchField] = useState("");
  const [emailFromUser, setEmailFromUser] = useState("");
  const [therapistsList, setTherapistsList] = useState(therapistData);
  const navigate = useNavigate();

  useEffect(() => {
    const userInLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (userInLocalStorage) {
      const extractedName = userInLocalStorage.email.split("@")[0];
      setEmailFromUser(extractedName);
    }
  }, [emailFromUser]);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    const therapistResult = therapistData.filter((therapist) => {
      if (searchField === "") {
        return therapist;
      } else {
        return therapist.name.toLowerCase().includes(searchField.toLowerCase());
      }
    });
    setTherapistsList(therapistResult);
  }, [searchField]);

  return (
    <>
      <motion.section
        className="banner p-5 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="row">
          <div className="col-lg-7 mx-auto"></div>
        </div>
        <div className="welcome_name">
          <h3>Hey, {emailFromUser}</h3>
          <p>Find your desired specialist...</p>
        </div>

        <input
          className="search_input"
          type="search"
          placeholder="search name..."
          onChange={handleChange}
          value={searchField}
        />
      </motion.section>

      <div className="card_container">
        {therapistsList.length === 0 ? (
          <h3 className="error_msg"> No record found!</h3>
        ) : (
          therapistsList.map((therapist) => {
            return (
              <motion.div
                className="card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="card_image">
                  <img className="img" src={therapist.image} alt="" />
                  <div className="card_body">
                    <h3> {therapist.name}</h3>
                    <h3> {therapist.exp}</h3>
                    <h3>₦{therapist.amount} per hr.</h3>
                    {therapist.badge === "not available" ? (
                      <button className="disabled_button">
                        Book a session
                      </button>
                    ) : (
                      <button
                        className="book_button"
                        onClick={() => {
                          navigate(`/calendar/${therapist.id}`);
                        }}
                      >
                        Book a session
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </>
  );
};

export default TherapistBooking;

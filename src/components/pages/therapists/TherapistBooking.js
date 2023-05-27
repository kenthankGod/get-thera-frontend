import React from "react";
import therapistData from "./TherapistData";
import { useState, useEffect } from "react";
import "./Therapist.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMedal, FaRegMoneyBillAlt } from "react-icons/fa";

const TherapistBooking = () => {
  const [searchField, setSearchField] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
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

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    filterTherapists(event.target.value);
  };

  const filterTherapists = (gender) => {
    const filtered = therapistData.filter(({ gender: therapistGender }) => {
      if (gender === "male") {
        return therapistGender === "male";
      } else if (gender === "female") {
        return therapistGender === "female";
      } else {
        return true;
      }
    });
    setTherapistsList(filtered);
  };

  return (
    <>
    <div className="therapist_container">
      
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
          <h3>Hey, {emailFromUser}!</h3>
          <p>search and book your desired therapist...</p>
        </div>

        <input
          className="search_input"
          type="search"
          placeholder="search name..."
          onChange={handleChange}
          value={searchField}
        />
      </motion.section>

      <div className="select_menu_container">
        {" "}
        <span>Filter booking by gender</span>{" "}
        <select value={selectedGender} onChange={handleGenderChange}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="card_container"  
      
      >
        {therapistsList.length === 0 ? (
          <h3 className="error_msg"> No record found!</h3>
        ) : (
          therapistsList.map((therapist) => {
            return (
              <motion.div
                className=""
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div class="card">
                  <div class="img_wrapper">
                    <img className="img" src={therapist.image} alt="" />{" "}
                    <span className="therapist_name">{therapist.name}</span>
                  </div>

                  <div class="card-body">
                    <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                      {" "}
                      {therapist.duration}
                    </h3>
                    <h3>
                      {" "}
                      <FaMedal className="fa-icons" /> {therapist.exp}
                    </h3>
                    <h3>
                      <FaRegMoneyBillAlt className="fa-icons" /> ₦
                      {therapist.amount}
                    </h3>
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
    </div>
    </>
  );
};

export default TherapistBooking;

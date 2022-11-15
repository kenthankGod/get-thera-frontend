import React from "react";
import TherapistsCard from "./TherapistsCard";
import therapistData from "./TherapistData";
import { useState, useEffect } from "react";
import "./Therapist.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TherapistBooking = () => {
  const [searchField, setSearchField] = useState("");
  const [therapistsList, setTherapistsList] = useState(therapistData);
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`https://getthera-api.onrender.com/therapistBooking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        if (error) {       
          if (error && error.response) {
            console.log(error.response.data.message);
            // navigate("/login");
          }
        }
      });
  }, []);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    const therapistResult = therapistData.filter((therapist) => {
      if (searchField === "") {
        return therapist;
      } else {
        return (
          therapist.location
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
          therapist.name.toLowerCase().includes(searchField.toLowerCase())
        );
      }
    });
    setTherapistsList(therapistResult);
  }, [searchField]);

  return (
    <section className="therapist_container">
      <div className="therapist_flexed_wrapper">
        <div>
          <h1 className="heading">
            We offer the <span>best free </span> one on one couselling by credible
            {" "}<span>proffesionals</span> across the country<span>.</span>
          </h1>
          <input
            className="search_input"
            type="search"
            placeholder="search name or location..."
            onChange={handleChange}
            value={searchField}
          />
        </div>

        {therapistsList.length === 0 ? (
          <h3 className="error_msg"> No record found!</h3>
        ) : (
          therapistsList.map((therapist) => {
            return <TherapistsCard key={therapist.id} therapist={therapist} />;
          })
        )}
      </div>
    </section>
  );
};

export default TherapistBooking;

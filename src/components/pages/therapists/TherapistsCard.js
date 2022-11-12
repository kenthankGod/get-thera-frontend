import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const TherapistsCard = ({ therapist }) => {

  const navigate = useNavigate()

  return (
    <>
      <div className="image_container">
        <div className="image">
          <img className="img" src={therapist.image} alt="" />
          <h3> {therapist.name}</h3>
          <h3>{therapist.location}</h3>
          <h3> {therapist.exp}</h3>
          <h3>
            {" "}
           
          </h3>

          {therapist.badge === "not available" ? (
            
             <p>not available </p>
         
          
           ) : (
            <button className="btn" onClick={() => { 
              navigate(`/therapistBooking/${therapist.id}`)
             
            }}>
              Book a session
            </button>
          )}
          {/* <Time /> */}
        </div>
      </div>

      <ToastContainer position="top-center" limit={1} />
    </>
  );
};

export default TherapistsCard;

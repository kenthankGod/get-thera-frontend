import React from "react";
import therapistData from "../therapists/TherapistData";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegCalendar, FaRegClock } from "react-icons/fa";
// import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import "./ConfirmBooking.css";

const ConfirmBookings = () => {
  const { therapistId, fromDate, toDate, time } = useParams();

  const therapist = therapistData.find(
    (therapist) => therapist.id == therapistId
  );

  const { image, name } = therapist;

  const onToken = () => {
    // console.log(tn);
    // if (token) {
    Swal.fire(
      `Successful`,
      `session booked with ${name} an email will be sent to you shortly!`,
      "success"
    );
    // }
    navigate("/therapistBooking");
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="confirm_booking_container">
        <div className="confirm_booking_details">
          <div className="confirm_booking_title">
            <p>
              <span>Booking details</span>
            </p>
          </div>

          <hr />

          <div className="confirm_booking_image_and_time">
            <img src={image} alt="therapist-image" />
            <p>
              meeting <span className="with">with</span> {name}
            </p>
            <p>
              <FaRegCalendar className="fa-cal" /> {fromDate} to {toDate}
            </p>
            <p>
              <FaRegClock className="fa-clock" /> {time}
            </p>

            <hr />

          </div>
          <button onClick={onToken}>Poceed to Book</button>

          <br />
      
        </div>
      </div>
    </>
  );
};

export default ConfirmBookings;

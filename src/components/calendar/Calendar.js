import React, { useState, useEffect } from "react";
import useTherapistContext from "../../context/TherapistContext";
import { useParams } from "react-router-dom";
import Time from "./time/Time";
import "./Calendar.css";
import { motion } from "framer-motion";

const Calendar = () => {
  const { setDate, handleSetTherapist, therapistJson } = useTherapistContext();
  const [showTimeComp, setShowTimeComp] = useState(false);
  const [days, setDays] = useState([]);
  const { therapistId } = useParams();

  const openTimeComponent = () => {
    setShowTimeComp(true);
  };

  useEffect(() => {
    handleSetTherapist(therapistId);
  }, [therapistId]);

  useEffect(() => {
    const today = new Date();
    let next10Days = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = 0; i <= 25; i++) {
      let nextDay = new Date();

      nextDay.setDate(today.getDate() + i);
      next10Days.push({
        date: `${months[nextDay.getUTCMonth()]} ${nextDay.getUTCDate()} `,
        day: daysOfWeek[nextDay.getUTCDay()],
      });
    }
    setDays(next10Days);
  }, [handleSetTherapist]);

  return (
    <>
      <motion.div
        className="calendar_and_time_container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="calendar">
          <h2>Select date: </h2>
          <h6>
            pick a meeting date with{" "}
            <span className="therapist_name">{therapistJson.name}</span> <br />
          </h6>
          <div className="date">
            {/* <span className="day">S</span>
            <span className="day">M</span>
            <span className="day">T</span>
            <span className="day">W</span>
            <span className="day">T</span>
            <span className="day">F</span>
            <span className="day">S</span> */}

            {days.map((day, index) => (
              <span
                className="number"
                onClick={() => {
                  setDate(day.date);
                  openTimeComponent();
                }}
                key={index}
              >
                {day.date}
              </span>
            ))}
          </div>
        </div>
        {showTimeComp && <Time />}
      </motion.div>
    </>
  );
};

export default Calendar;

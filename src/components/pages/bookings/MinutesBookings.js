import React, { useState } from "react";
import "./MinutesBooking.css";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import therapistData from "../therapists/TherapistData";
import "antd/dist/antd.css";
import { TimePicker } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBookings from "./ConfirmBookings";
const { RangePicker } = DatePicker;

const MinutesBookings = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const { therapistId } = useParams();
  const therapist = therapistData.find(
    (therapist) => therapist.id == therapistId
  );
  const { image, name } = therapist;

  console.log(fromDate, toDate);

  // select dates
  const onDateSelect = (value) => {
    setFromDate(moment(value[0]).format("MMM-DD-YYYY"));
    setToDate(moment(value[1]).format("MMM-DD-YYYY"));
    // console.log(
    //   moment(value[0]).format("MMM-DD-YYYY"),
    //   moment(value[1]).format("MMM-DD-YYYY")
    // );
  };

  // select time
  const onTimeSelect = (value) => {
    setTime(moment(value).format("HH:mm"));
    // console.log(moment(value).format("HH:mm"));
  };

  // disable past days
  const disablePastDate = (current) => {
    return current && current < moment().endOf("day");
  };

  // handle empty inputs
  const handleReservation = () => {
    if ((!fromDate && !toDate) || !time) {
      toast.error("Please select an appointment date and time");
    } else {
      navigate(
        `/confirm-booking/${therapist.id}/${fromDate}/${toDate}/${time}`
      );
    }
  };

  return (
    <>
      <div className="calendar_container ">
        <div className="calendar_second_section">
          <img src={image} />
          <p>name: {name}</p>
          <RangePicker
            format="DD-MM-YYYY"
            onChange={onDateSelect}
            disabledDate={disablePastDate}
          />{" "}
          <br /> <br />
          <TimePicker
            format="HH:mm"
            showNow={false}
            minuteStep={30}
            onChange={onTimeSelect}
          />
          <br />
          <br />
          <button
            className="btn"
            onClick={() => {
              handleReservation();
            }}
          >
            Confirm Schedule
          </button>
        </div>
        <ToastContainer position="top-center" limit={1} />
      </div>
    </>
  );
};

export default MinutesBookings;

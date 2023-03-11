import React, { useState } from "react";
import "./Time.css";
import useTherapistContext from "../../../context/TherapistContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaRegCalendar, FaRegClock, FaRegAddressBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartContext } from "../../../context/cart_context/CartContext";

const Time = () => {
  const { handleSetTime, date, time, therapistJson } = useTherapistContext();

  const { addToCart } = useCartContext();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const buttons = [
    {
      time: "1:30 AM",
    },
    {
      time: "2:30 AM",
    },
    {
      time: "3:00 AM",
    },
    {
      time: "4:00 AM",
    },
    {
      time: "5:00 AM",
    },
    {
      time: "6:00 AM",
    },
  ];

  return (
    <motion.div
      className="time_container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h6 className="select_time">select time:</h6>
      {buttons.map((button) => {
        return (
          <button
            className="buttons"
            value={button.time}
            onClick={(e) => {
              handleShow();
              handleSetTime(e.target.value);
            }}
          >
            {button.time}
          </button>
        );
      })}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="minutes_with">
            {" "}
            <FaRegAddressBook /> 30 minutes <span className="with">
              with
            </span>{" "}
            {therapistJson.name}
          </p>
          <p className="month_time_date">
            {" "}
            <FaRegCalendar className="fa-cal" /> {date} 2023, at {time}
          </p>
          <p className="month_time_date">
            {" "}
            <FaRegClock className="fa-clock" /> 30 minutes
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                Please briefly explain in 1-2 sentences, your most pressing
                matter (this helps to explain your situation better.)
              </Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancel_btn" onClick={handleClose}>
            Cancel
          </Button>
          <Link to="/bookings">
            <Button
              className="add_to_cat_btn"
              onClick={() => {
                handleClose();
                addToCart(therapistJson.name, date, time, therapistJson.amount);
              }}
            >
              Book event
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default Time;

import { React, useState, useEffect } from "react";
import "./BookingsDashboard.css";
import { useCartContext } from "../../../context/cart_context/CartContext";
import PaystackPop from "@paystack/inline-js";
import useAuthContext from "../../../context/auth_context/AuthContext";
import useTherapistContext from "../../../context/TherapistContext";

const BookingsDashboard = () => {
  const { user } = useAuthContext();
  const {therapistJson} = useTherapistContext()
  const { cart, removeFromCart } = useCartContext();
  const [paidItems, setPaidItems] = useState(
    JSON.parse(localStorage.getItem("paidItems")) || []
  );
  console.log(cart);


  //  this useEffect makes sue that the paidItems statye isnt lost 
  useEffect(() => {
    localStorage.setItem("paidItems", JSON.stringify(paidItems));
  }, [paidItems]);


  

  // paystack popup function
  const payStackPaymentPopUp = (item) => {
    const handler = PaystackPop.setup({
      key: "pk_test_cc369e9dd30f202254c7bbe50e7f7e63b6195f3d",
      email: user.email,
      amount: item.amount * 100,
      callback: (response) => {
        setPaidItems([...paidItems, item.id]);
      },
    });

    handler.openIframe();
  };

  // check for empty cart
  if (cart.length === 0) {
    return (
      <div className="no_bookings_left">
        <p>You curently have no bookings</p>
      </div>
    );
  }

  return (
    <>
      <div className="table_container">
        <h1>Pending Appointments</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Amount</th>
            <th></th>
            <th></th>
          </tr>

          {cart.map((item) => {
            const isPaid = item.paid || paidItems.includes(item.id);
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.date}, 2023</td>
                <td>{item.time}</td>
                <td>{therapistJson.duration}</td>
                <td>₦{item.amount}</td>
                <td>
                  {isPaid ? (
                  <span class="badge rounded-pill bg-success">Paid</span>
                  ) : (
                    <button
                      class="pay_now_button"
                      onClick={() => payStackPaymentPopUp(item)}
                    >
                      ₦ Pay Now
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="delete_button"
                    onClick={() => {
                      setTimeout(() => {
                        removeFromCart(item.id);
                      }, 2000);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default BookingsDashboard;

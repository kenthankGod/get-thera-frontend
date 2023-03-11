import { React } from "react";
import "./BookingsDashboard.css";
import { useCartContext } from "../../../context/cart_context/CartContext";
import PaystackPop from "@paystack/inline-js";
import useAuthContext from "../../../context/auth_context/AuthContext";

const BookingsDashboard = () => {
  const { user } = useAuthContext();
  const { cart, removeFromCart } = useCartContext();

  // paystack popup function
  const payStackPaymentPopUp = (item) => {
    const handler = PaystackPop.setup({
      key: "pk_test_cc369e9dd30f202254c7bbe50e7f7e63b6195f3d",
      email: user.email,
      amount: item.amount * 100,
      // onClose: () => {
      //   alert("Window closed.");
      // },
      // callback: (response) => {
      //   const message = "Payment complete! Reference: " + response.reference;
      //   alert(message);
      // },
    });

    handler.openIframe();
  };

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
        <h1>Booked Therapist Appointments</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Amount</th>
            <th></th>
            <th></th>
          </tr>

          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.date}, 2023</td>
              <td>{item.time}</td>
              <td>₦{item.amount}</td>
              <td>
                <button
                  class="pay_now_button"
                  onClick={() => payStackPaymentPopUp(item)}
                >
                  ₦ Pay Now
                </button>
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
          ))}
        </table>
      </div>
    </>
  );
};

export default BookingsDashboard;

import { React, useState, useEffect } from "react";
import "./BookingsDashboard.css";
import MoonLoader from "react-spinners/MoonLoader";
import { useCartContext } from "../../../context/cart_context/CartContext";
import PaystackPop from "@paystack/inline-js";
import useAuthContext from "../../../context/auth_context/AuthContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";



const BookingsDashboard = () => {
  const { user } = useAuthContext();
  const { cart, removeFromCart, isLoading } = useCartContext();
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [paidItems, setPaidItems] = useState(
    JSON.parse(localStorage.getItem("paidItems")) || []
  );

  const handleCloseSecondModal = () => {
    setShowSecondModal(false);
    window.location.replace("/bookings");
  };
  const handleShowSecondModal = () => {
    setShowSecondModal(true);
  };

  //  this useEffect makes sure that the paidItems state isnt lost
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

  
    if (isLoading) {
    return (
      <div className="loader">
        <MoonLoader color="blueviolet" size="50px" />
      </div>
    );
  }

  // check for empty cart
  if (cart && cart.length === 0) {
    return (
      <div className="no_bookings_left">
        <p>You currently have no bookings yet</p>
      </div>
    );
  }



  return (
    <>
      <h1 className="pending">Your recent appointments</h1>
      <div className="table_container">
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
          {cart &&
            cart.map((item) => {
              const isPaid = item.paid || paidItems.includes(item.id);
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.date}, 2023</td>
                  <td>{item.time}</td>
                  <td>{item.duration}</td>
                  <td>₦{item.amount}</td>
                  <td>
                    {isPaid ? (
                      <span class="badge rounded-pill bg-success">Paid</span>
                    ) : (
                      <button
                        class="pay_now_button"
                        onClick={() => {
                          payStackPaymentPopUp(item);
                        }}
                      >
                        ₦ Pay Now
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="delete_button"
                      disabled={isLoading}
                      onClick={() => {
                        removeFromCart(item._id);
                        handleShowSecondModal();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>

        <Modal show={showSecondModal} onHide={handleCloseSecondModal}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <p>Item successfully deleted!.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="cancel_btn"
              onClick={() => {
                handleCloseSecondModal();
              }}
            >
              close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default BookingsDashboard;


// {isLoading ? (
//   <div className="loader">
//     <MoonLoader color="blueviolet" size="100px" />
//   </div>
// ) : cart.length === 0 ? (
//   <div className="no_bookings_left">
//     <p>You currently have no bookings yet</p>
//   </div>
// ) : (
//   <div>
//     <h1 className="pending">Your recent appointments</h1>
//     <div className="table_container">
//       <table>
//         <tr>
//           <th>Name</th>
//           <th>Date</th>
//           <th>Time</th>
//           <th>Duration</th>
//           <th>Amount</th>
//           <th></th>
//           <th></th>
//         </tr>
//         {cart.map((item) => {
//           const isPaid = item.paid || paidItems.includes(item.id);
//           return (
//             <tr key={item.id}>
//               <td>{item.name}</td>
//               <td>{item.date}, 2023</td>
//               <td>{item.time}</td>
//               <td>{item.duration}</td>
//               <td>₦{item.amount}</td>
//               <td>
//                 {isPaid ? (
//                   <span class="badge rounded-pill bg-success">Paid</span>
//                 ) : (
//                   <button
//                     class="pay_now_button"
//                     onClick={() => {
//                       payStackPaymentPopUp(item);
//                     }}
//                   >
//                     ₦ Pay Now
//                   </button>
//                 )}
//               </td>
//               <td>
//                 <button
//                   className="delete_button"
//                   onClick={() => {
//                     removeFromCart(item._id);
//                     handleShowSecondModal();
//                   }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           );
//         })}
//       </table>
//     </div>{" "}
//     {/* Closing tag for table_container */}
//     <Modal show={showSecondModal} onHide={handleCloseSecondModal}>
//       <Modal.Header closeButton>
//         {/* <Modal.Title>Item successfully deleted</Modal.Title> */}
//       </Modal.Header>
//       <Modal.Body>
//         <p>Item successfully deleted!.</p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           className="cancel_btn"
//           onClick={() => {
//             handleCloseSecondModal();
//           }}
//         >
//           close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   </div>
// )}
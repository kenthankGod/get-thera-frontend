import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import useTherapistContext from "../TherapistContext";
import reducer from "./CartReducer";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { date, time, therapistJson } = useTherapistContext();
  const [cart, setCart] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    cart:[],
  });


  //  function makes a request to the database to add bookings to cart
  async function addToCart() {
    const userToken = JSON.parse(localStorage.getItem("user"));
    try {
      // setIsLoading(true);
      const response = await axios.post(
        "https://gethera-app-api.onrender.com/addBookings",
        {
          name: therapistJson.name,
          date: date,
          time: time,
          amount: therapistJson.amount,
          duration: therapistJson.duration,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );

      if (!response.status === 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data;
      dispatch({ type: "ADD_TO_CART", payload: data })
      // setIsLoading(false);
    } catch (error) {
      console.error(error);
  }
  }


//  this useEffect fetches data from database when the bookings page loads
  useEffect(() => {
    async function fetchCart() {
      const userToken = JSON.parse(localStorage.getItem("user"));

    
      try {
        setIsLoading(true);
        const response = await axios.get("https://gethera-app-api.onrender.com/allBookings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken.token}`,
          },
        });
        const data = response.data;
        // dispatch({ type: 'FETCH_CART', payload: data });
        setCart(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    } 

    fetchCart();
  }, []);


  //  this function makes a call to the database and removes a booking from cart
  async function removeFromCart(id) {
    const userToken = JSON.parse(localStorage.getItem("user"));
    try {
      setIsLoading(true);
      const response = await axios.delete(`https://gethera-app-api.onrender.com/deleteBooking/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken.token}`,
        },
      });
      const json = response.data;
      if (response.status === 200) {
        dispatch({ type: "REMOVE_FROM_CART", payload: json });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
    const value = {
    ...state,
    addToCart,
    cart,
    isLoading,
    removeFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartContextProvider");
  }

  return context;
};

export { CartProvider, useCartContext };

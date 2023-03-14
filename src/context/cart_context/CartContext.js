import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./CartReducer";

const CartContext = createContext();

const getCartDataFromLocStorage = () => {
  const cartDataFromLocStorage = localStorage.getItem("bookings");
  if (cartDataFromLocStorage === []) {
    return [];
  } else {
    return JSON.parse(cartDataFromLocStorage);
  }
};
// ,
const initialSate = {
  cart: getCartDataFromLocStorage(),
  totalItem: "",
  totalAmount: "",
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSate);

  const addToCart = (id, date, time, amount, duration) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, date, time, amount, duration } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // save items to localstorage
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(state.cart));
  }, [state.cart]);

  const value = {
    ...state,
    addToCart,
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

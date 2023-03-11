import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { TherapistProvider } from "./context/TherapistContext";
import { AuthProvider } from "./context/auth_context/AuthContext";
import { CartProvider } from "./context/cart_context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <TherapistProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </TherapistProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

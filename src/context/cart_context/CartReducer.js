const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { id, time, date, amount, duration } = action.payload;

      const cartItem = { id, date, time, amount, duration};

      return {
        ...state,
        cart: [...(state.cart || []), cartItem],
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = (state.cart || []).filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
















// const CartReducer = (state, action) => {
//   if (action.type === "ADD_TO_CART") {
//     const { id, time, date, amount } = action.payload;


//     const cartItems = {
//       id,
//       date: date,
//       time: time,
//       amount: amount
//     };

//     return {
//       ...state,
//       cart: [...state.cart, cartItems],
//     };

//   }

//   if (action.type === `REMOVE_FROM_CART`) {
//     const updatedCart = state.cart.filter(
//       (cartItem) => cartItem.id !== action.payload
//     );
//     console.log(updatedCart);
//     return {
//       ...state,
//       cart: updatedCart,
//     };
//   }

//   return state;
// };

// export default CartReducer;



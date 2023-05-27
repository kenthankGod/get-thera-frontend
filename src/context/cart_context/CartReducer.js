const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { id, time, date, amount, duration } = action.payload;
      const cartItem = { id, date, time, amount, duration };
      return {
        ...state,
        cart: [...(state.cart || []), cartItem],
      };

    case "REMOVE_FROM_CART": {
      const updatedCart = (state.cart || []).filter(
        (item) => item._id !== action.payload._id
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

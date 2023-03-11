const CartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    const { id, time, date, amount } = action.payload;


    const cartItems = {
      id,
      date: date,
      time: time,
      amount: amount
    };
    console.log(state.cart);
    return {
      ...state,
      cart: [...state.cart, cartItems],
    };

    // let cartProducts;

    // cartProducts = {
    //   id,
    //   time: time,
    //   date: date
    // }
    //       return {
    //       ...state,
    //       cart: [...state.cart, cartProducts],
    //     };
  }

  if (action.type === `REMOVE_FROM_CART`) {
    const updatedCart = state.cart.filter(
      (cartItem) => cartItem.id !== action.payload
    );
    console.log(updatedCart);
    return {
      ...state,
      cart: updatedCart,
    };
  }

  return state;
};

export default CartReducer;

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], paymentMethod: {} },
  { type, payload }
) => {
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;

      const existItem = state.cartItems?.find(
        (x) => x.product_id === item.product_id
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems?.map((x) =>
            x.product_id === existItem ? item : x
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems?.filter((x) => x.product_id !== payload),
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };

    case CART_RESET:
      return {
        ...state,
        cartItems: [],
        paymentMethod: {},
      };

    default:
      return state;
  }
};

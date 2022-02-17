import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
import { BaseURI } from "../utils/BaseURI";

// Add to cart action
export const addToCart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`${BaseURI}/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product_id: data?._id,
      title: data?.title,
      price: data?.price,
      image: data?.image,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove from cart action
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Payment method save to cart action
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

// Cart Reset
export const cartReset = () => (dispatch) => {
  dispatch({ type: CART_RESET });
  localStorage.removeItem("cartItems");
  localStorage.removeItem("paymentMethod");
};

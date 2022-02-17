import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_FAILURE,
  ORDER_MY_REQUEST,
  ORDER_MY_SUCCESS,
} from "../constants/orderConstants";

// Order create reducer
export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: payload };
    case ORDER_CREATE_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

// Order details reducer
export const orderDetailsReducer = (
  state = { orderItems: [] },
  { type, payload }
) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: payload };
    case ORDER_DETAILS_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

// My Order details reducer
export const orderMyReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case ORDER_MY_REQUEST:
      return { loading: true };
    case ORDER_MY_SUCCESS:
      return { loading: false, orders: payload };
    case ORDER_MY_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

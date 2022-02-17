import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Header from "../Components/Header/Header";
import MultiStepNav from "../Components/MultiStepNav/MultiStepNav";
import OrderSummery from "../Components/OrderSummery/OrderSummery";
import { cartReset } from "../Redux/actions/cartActions";
import { orderCreate } from "../Redux/actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { paymentMethod, cartItems } = cart;
  cart.totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const createOrder = useSelector((state) => state.createOrder);
  const { loading, success, error, order } = createOrder;

  //  Toast notification
  const { addToast } = useToasts();

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch(cartReset());
    }
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    if (cartItems?.length === 0) {
      history.push("/");
    }
  }, [success, order, history, error, addToast, cartItems, dispatch]);

  const handlePlaceOrder = () => {
    const orderItems = cartItems;
    dispatch(
      orderCreate(orderItems, paymentMethod.paymentMethod, cart.totalPrice)
    );
  };

  return (
    <>
      <Header />
      <MultiStepNav step1 step2 step3 />
      <div className="placeOrder container">
        <div className="placeOrder__1st-half">
          <div className="placeOrder__paymentMethod">
            <div className="title">Payment Method</div>
            <div className="method">
              Method : <span>{paymentMethod?.paymentMethod}</span>
            </div>
          </div>
          <div className="placeOrder__orderItems">
            <div className="title">Order Items</div>
            <div className="orderItems">
              <table className="orderItems__table">
                {cartItems?.map((item) => (
                  <tr key={item.product_id}>
                    <td>
                      <img src={item.image.secure_url} alt="item img" />
                    </td>
                    <td>{item.title}</td>
                    <td>
                      1 x {item.price} = {1 * item.price}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
        <div className="placeOrder__2nd-half">
          <OrderSummery
            cartItems={cartItems}
            handlePlaceOrder={handlePlaceOrder}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;

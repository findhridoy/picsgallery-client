import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Header from "../Components/Header/Header";
import PaypalPaymentForm from "../Components/PaypalPaymentForm/PaypalPaymentForm";
import StripeCheckoutForm from "../Components/StripeCheckoutForm/StripeCheckoutForm";
import { getOrderDetails } from "../Redux/actions/orderActions";
import Loading from "../Utils/Loading&Error/Loading";

const OrderScreen = ({ match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  //  Toast notification
  const { addToast } = useToasts();

  useEffect(() => {
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      dispatch(getOrderDetails(productId));
    }
  }, [error, addToast, dispatch, productId]);

  return (
    <>
      <Header />

      {loading ? (
        <Loading type="BallTriangle" color="#1185ed" />
      ) : error ? (
        <div className="error_page container">{error}</div>
      ) : (
        <div className="order container">
          <div className="order__1st-half">
            <div className="order__orderId">Order {order?._id}</div>
            <div className="order__paymentMethod">
              <div className="title">Payment Method</div>
              <div className="method">
                Method : <span>{order?.paymentMethod}</span>
              </div>
              {order?.isPaid ? (
                <div className="success_paid">Paid on {order?.paidAt}</div>
              ) : (
                <div className="not_paid">Not Paid</div>
              )}
            </div>
            <div className="order__orderItems">
              <div className="title">Order Items</div>
              <div className="orderItems">
                <table className="orderItems__table">
                  {order?.orderItems.map((item) => (
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
          <div className="order__2nd-half">
            <div className="order__orderSummery">
              <div className="order__orderSummery__title">Order Summery</div>
              <div className="order__orderSummery__items">
                <p className="items__order-total">Items:</p>
                <div>
                  <p className="items__length">{order?.orderItems.length}</p>
                </div>
              </div>

              <div className="order__orderSummery__amount">
                <p className="amount__order-total">Total:</p>
                <div>
                  <p className="amount__price">{order?.totalPrice} USD</p>
                  <p>All taxes & customs included</p>
                </div>
              </div>
            </div>

            {order?.paymentMethod === "Stripe" && (
              <StripeCheckoutForm order={order} />
            )}
            {order?.paymentMethod === "PayPal" && <PaypalPaymentForm />}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderScreen;

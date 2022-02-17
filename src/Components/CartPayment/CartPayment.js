import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const CartPayment = ({ cartItems }) => {
  // Coupon field show/hide
  const [fieldHide, setFieldHide] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const handleShowHide = () => {
    setFieldHide(!fieldHide);
  };

  //  Toast notification
  const { addToast } = useToasts();

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (couponCode === "") {
      addToast("Coupon field is empty.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      addToast("This code doesn't exist.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  const history = useHistory();

  const handleCheckout = () => {
    history.push("/login?redirect=paymentMethod");
  };
  return (
    <>
      <div className="cartPayment">
        <div className="cartPayment__title">Order details</div>
        <div className="cartPayment__amount">
          <p className="amount__order-total">Order total:</p>
          <div>
            <p className="amount__price">
              {cartItems.reduce((acc, item) => acc + item.price, 0)} USD
            </p>
            <p>All taxes & customs included</p>
          </div>
        </div>
        <div className="cartPayment__coupon">
          {fieldHide ? (
            <div>
              <p className="coupon__field-label">Coupon code:</p>
              <div className="coupon__field">
                <form onSubmit={handleCouponSubmit}>
                  <input
                    type="text"
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="submit">Apply</button>
                </form>
              </div>
            </div>
          ) : (
            <ul>
              <li className="coupon__title" onClick={handleShowHide}>
                I have a coupon code
              </li>
            </ul>
          )}
        </div>
        <div className="cartPayment__button">
          <button type="button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPayment;

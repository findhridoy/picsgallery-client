import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import MultiStepNav from "../Components/MultiStepNav/MultiStepNav";
import cardImage from "../Data/images/payment/payment_process-card.png";
import paypalImage from "../Data/images/payment/payment_process-paypal.png";
import { savePaymentMethod } from "../Redux/actions/cartActions";

const PaymentMethodScreen = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const onSubmit = (data) => {
    dispatch(savePaymentMethod(data));
    history.push("/placeOrder");
  };
  useEffect(() => {
    if (cartItems?.length === 0) {
      history.push("/");
    }
  }, [cartItems, history]);
  return (
    <>
      <Header />
      <MultiStepNav step1 step2 />
      <div className="paymentMethod container">
        <div className="paymentMethod__title">Payment Selection</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className={
              errors.paymentMethod
                ? "paymentMethod__radio error__radio"
                : "paymentMethod__radio"
            }
          >
            <input
              {...register("paymentMethod", { required: true })}
              type="radio"
              value="Stripe"
            />
            <div className="paymentMethod__radio-label">
              <div className="paymentMethod__radio-divider">
                Stripe
                <img src={cardImage} alt="Card Img" />
              </div>
              <div className="paymentMethod__label-description">
                Safe money transfer using your bank account. Visa, Maestro,
                Discover, American Express.
              </div>
            </div>
          </label>

          <label
            className={
              errors.paymentMethod
                ? "paymentMethod__radio error__radio"
                : "paymentMethod__radio"
            }
          >
            <input
              {...register("paymentMethod", { required: true })}
              type="radio"
              value="PayPal"
            />
            <div className="paymentMethod__radio-label">
              <div className="paymentMethod__radio-divider">
                PayPal
                <img
                  className="paypal__image"
                  src={paypalImage}
                  alt="Paypal Img"
                />
              </div>
              <div className="paymentMethod__label-description">
                You will be redirected to PayPal website to complete your
                purchase securely.
              </div>
            </div>
          </label>

          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default PaymentMethodScreen;

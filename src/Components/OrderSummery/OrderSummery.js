import React from "react";
import Loader from "react-loader-spinner";

const OrderSummery = ({ cartItems, handlePlaceOrder, loading }) => {
  return (
    <>
      <div className="orderSummery">
        <div className="orderSummery__title">Order Summery</div>
        <div className="orderSummery__items">
          <p className="items__order-total">Items:</p>
          <div>
            <p className="items__length">{cartItems?.length}</p>
          </div>
        </div>

        <div className="orderSummery__amount">
          <p className="amount__order-total">Total:</p>
          <div>
            <p className="amount__price">
              {cartItems.reduce((acc, item) => acc + item.price, 0)} USD
            </p>
            <p>All taxes & customs included</p>
          </div>
        </div>

        <div className="orderSummery__button">
          <button type="button" onClick={handlePlaceOrder}>
            {loading ? (
              <Loader
                type="ThreeDots"
                color="#FFFFFF"
                height={13}
                width={100}
              />
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSummery;

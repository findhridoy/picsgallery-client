import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

const PaypalPaymentForm = () => {
  const handlePaymentSubmit = (details, data) => {
    alert("Transaction completed by " + details.payer.name.given_name);

    // OPTIONAL: Call your server to save the transaction
    // return fetch("/paypal-transaction-complete", {
    //   method: "post",
    //   body: JSON.stringify({
    //     orderID: data.orderID,
    //   }),
    // });
  };
  return <PayPalButton amount="0.01" onSuccess={handlePaymentSubmit} />;
};

export default PaypalPaymentForm;

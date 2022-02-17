import React from "react";
import { NavLink } from "react-router-dom";

const MultiStepNav = ({ step1, step2, step3 }) => (
  <div className="multiStepNav container">
    {step1 ? (
      <button type="button">1. Login</button>
    ) : (
      <button type="button" disabled>
        1. Login
      </button>
    )}

    {step2 ? (
      <NavLink className="multiStepNav__link" to="/paymentMethod">
        2. Payment Method
      </NavLink>
    ) : (
      <button type="button" disabled>
        2. Payment Method
      </button>
    )}

    {step3 ? (
      <NavLink className="multiStepNav__link" to="/placeOrder">
        3. Place Order
      </NavLink>
    ) : (
      <button type="button" disabled>
        3. Place Order
      </button>
    )}
  </div>
);
export default MultiStepNav;

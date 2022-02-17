import React from "react";
import {
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { CgMenuGridO, CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const MobileNav = ({ logoutHandler, cartItems, showMobileNav, userInfo }) => {
  return (
    <nav className={showMobileNav ? "mobileNav openNav" : "mobileNav"}>
      <ul className="mobileNav__list">
        <li className="mobileNav__item">
          <NavLink className="mobileNav__link" to="/cart">
            <AiOutlineShoppingCart />
            {cartItems?.length > 0 && (
              <input
                className="mobileNav__cart"
                value={cartItems?.length}
                disabled
                type="text"
              />
            )}

            <span>Cart</span>
          </NavLink>
        </li>
        {userInfo ? (
          <>
            {userInfo.isAdmin && (
              <li className="mobileNav__item">
                <NavLink className="mobileNav__link" to="/dashboard/dashboard">
                  <CgMenuGridO />
                  <span>Dashboard</span>
                </NavLink>
              </li>
            )}

            <li className="mobileNav__item">
              <NavLink className="mobileNav__link" to="/profile">
                <CgProfile />
                <span>Profile</span>
              </NavLink>
            </li>

            <li className="mobileNav__item">
              <div className="mobileNav__link" onClick={logoutHandler}>
                <AiOutlineLogout />
                <span>Logout</span>
              </div>
            </li>
          </>
        ) : (
          <li className="mobileNav__item">
            <NavLink className="mobileNav__link" to="/login">
              <AiOutlineUser />
              <span>Login</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MobileNav;

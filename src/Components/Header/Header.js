import React, { useState } from "react";
import {
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { CgClose, CgMenuGridO, CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import userImg from "../../Data/images/user.png";
import { logout } from "../../Redux/actions/userActions";
import MobileNav from "../MobileNav/MobileNav";

const Header = () => {
  // Dropdown State
  const [dropdown, setDropdown] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  // User Information
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };
  const handleShowMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };
  return (
    <header>
      <div className="header__area container">
        <div className="header__logo">
          <NavLink to="/" className="logo">
            PicsGallery
          </NavLink>
        </div>
        <div className="header__search">
          <input
            type="search"
            placeholder="Search Here...."
            autoComplete="false"
            spellCheck="false"
          />
          <FiSearch />
        </div>
        <div>
          <nav className="header__nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink className="nav__link" to="/cart">
                  <AiOutlineShoppingCart />
                  {cartItems?.length > 0 && (
                    <input
                      className="nav__cart"
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
                  <li className="nav__item">
                    <div
                      className={
                        dropdown ? "dropdown activeDropdown" : "dropdown"
                      }
                      onClick={() => setDropdown(!dropdown)}
                    >
                      <img src={userImg} alt="userImg" />
                      <div
                        className={
                          dropdown
                            ? "dropdown__username activeUsername"
                            : "dropdown__username"
                        }
                      >
                        {userInfo.fullName?.slice(0, 6)}...
                      </div>
                    </div>
                    {dropdown ? (
                      <div className="dropdown__menu">
                        {userInfo.isAdmin && (
                          <NavLink
                            className="dropdown__link"
                            to="/dashboard/dashboard"
                            onClick={() => setDropdown(!dropdown)}
                          >
                            <CgMenuGridO />
                            <span>Dashboard</span>
                          </NavLink>
                        )}
                        <NavLink
                          className="dropdown__link"
                          to="/profile"
                          onClick={() => setDropdown(!dropdown)}
                        >
                          <CgProfile />
                          <span>Profile</span>
                        </NavLink>
                        <div className="dropdown__link" onClick={logoutHandler}>
                          <AiOutlineLogout />
                          <span>Logout</span>
                        </div>
                      </div>
                    ) : null}
                  </li>
                </>
              ) : (
                <li className="nav__item">
                  <NavLink className="nav__link" to="/login">
                    <AiOutlineUser />
                    <span>Login</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="header__mobile--nav">
          <div onClick={handleShowMobileNav}>
            {showMobileNav ? <CgClose /> : <GoThreeBars />}
          </div>
          <MobileNav
            cartItems={cartItems}
            logoutHandler={logoutHandler}
            showMobileNav={showMobileNav}
            userInfo={userInfo}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

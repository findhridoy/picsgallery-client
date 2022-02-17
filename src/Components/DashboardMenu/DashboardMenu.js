import React from "react";
import {
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { BsListUl } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const DashboardMenu = () => (
  <div className="dashboardMenu">
    <nav>
      <ul>
        <li>
          <NavLink
            className="nav__item"
            activeClassName="nav__item-active"
            to="/dashboard/dashboard"
          >
            <CgMenuGridO />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav__item"
            activeClassName="nav__item-active"
            to="/dashboard/orders"
          >
            <AiOutlineShoppingCart />
            <span>Order List</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav__item"
            activeClassName="nav__item-active"
            to="/dashboard/addProduct"
          >
            <AiOutlinePlus />
            <span>Add Product</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav__item"
            activeClassName="nav__item-active"
            to="/dashboard/products"
          >
            <BsListUl />
            <span>Product List</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav__item"
            activeClassName="nav__item-active"
            to="/dashboard/users"
          >
            <FiUsers />
            <span>User List</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav__item"
            activeClassName="nav__item-active"
            to="/dashboard/admin"
          >
            <AiOutlineUser />
            <span>Admin</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
);

export default DashboardMenu;

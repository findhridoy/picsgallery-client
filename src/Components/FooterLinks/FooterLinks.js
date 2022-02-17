import React from "react";
import { NavLink } from "react-router-dom";

const FooterLinks = ({ data, title }) => (
  <div className="footerLinks">
    <div className="footerLinks__title">
      <p>{title}</p>
    </div>
    <ul>
      {data.map((dt, index) => (
        <li key={index}>
          <NavLink className="footerLinks__items" to={dt.link}>
            {dt.item}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterLinks;

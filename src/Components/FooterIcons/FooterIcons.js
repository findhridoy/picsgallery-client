import React from "react";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { ImPinterest2 } from "react-icons/im";
import { NavLink } from "react-router-dom";

const FooterIcons = () => (
  <div className="footerIcons">
    <ul>
      <li>
        <NavLink className="footerIcons__item" to="/facebook">
          <FiFacebook />
        </NavLink>
      </li>
      <li>
        <NavLink className="footerIcons__item" to="/facebook">
          <ImPinterest2 />
        </NavLink>
      </li>
      <li>
        <NavLink className="footerIcons__item" to="/facebook">
          <FiInstagram />
        </NavLink>
      </li>
      <li>
        <NavLink className="footerIcons__item" to="/facebook">
          <FiTwitter />
        </NavLink>
      </li>
      <li>
        <NavLink className="footerIcons__item" to="/facebook">
          <FiLinkedin />
        </NavLink>
      </li>
    </ul>
  </div>
);

export default FooterIcons;

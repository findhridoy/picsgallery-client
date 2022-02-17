import React from "react";
import { NavLink } from "react-router-dom";
import { aboutData, mediaData, supportData } from "../../Data/FooterLinksData";
import FooterCounter from "../FooterCounter/FooterCounter";
import FooterIcons from "../FooterIcons/FooterIcons";
import FooterLinks from "../FooterLinks/FooterLinks";

const Footer = () => (
  <footer>
    <div className="footer__area">
      <div className="footer__part1">
        <div className="footer__logo">
          <NavLink to="/" className="logo">
            PicsGallery
          </NavLink>
        </div>
        <div className="footer__slogan">
          High quality items created by global community.
        </div>
        <div className="footer__product-count">
          <FooterCounter />
        </div>
        <div className="footer__contact">
          <FooterIcons />
        </div>
      </div>
      <div className="footer__all-links">
        <div className="footer__part2">
          <div className="footer__about">
            <FooterLinks title="About" data={aboutData} />
          </div>
        </div>
        <div className="footer__part3">
          <div className="footer__media">
            <FooterLinks title="Media" data={mediaData} />
          </div>
        </div>
        <div className="footer__part4">
          <div className="footer__legal&support">
            <FooterLinks title="Legal & Support" data={supportData} />
          </div>
        </div>
      </div>
    </div>
    <p className="footer__copyrights">
      Copyrights &copy; PicsGallery. All Rights Reserved.
    </p>
  </footer>
);

export default Footer;

import React from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";

const FooterCounter = () => {
  // redux element
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  return (
    <div className="footerCounter">
      <CountUp start={0} end={products?.length + 1200} delay={0}>
        {({ countUpRef }) => (
          <div className="footerCounter__item">
            <span className="footerCounter__counter" ref={countUpRef} />
            <span className="footerCounter__text"> Products</span>
          </div>
        )}
      </CountUp>
      <CountUp start={0} end={users?.length + 1000} delay={0}>
        {({ countUpRef }) => (
          <div className="footerCounter__item">
            <span className="footerCounter__counter" ref={countUpRef} />
            <span className="footerCounter__text"> Members</span>
          </div>
        )}
      </CountUp>
      <CountUp start={0} end={1700} delay={0}>
        {({ countUpRef }) => (
          <div className="footerCounter__item">
            <span className="footerCounter__counter" ref={countUpRef} />
            <span className="footerCounter__text"> Vendors</span>
          </div>
        )}
      </CountUp>
    </div>
  );
};

export default FooterCounter;

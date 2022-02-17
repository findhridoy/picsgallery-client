import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { listProduct } from "../../Redux/actions/productActions";
import Loading from "../../Utils/Loading&Error/Loading";

const BannerMarquee = () => {
  //  Toast notification
  const { addToast } = useToasts();

  // redux element
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    if (error) {
      addToast("Something was wrong.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      dispatch(listProduct());
    }
  }, [dispatch, error, addToast]);

  return (
    <div className="banner__marquee">
      <div className="bannerMarquee__free">
        <p>Free Photos</p>
        {loading ? (
          <Loading type="BallTriangle" color="#1185ed" />
        ) : (
          <Marquee pauseOnHover="true" speed="60" gradientWidth="0px">
            {products?.map(
              (product) =>
                product.category === "Free" &&
                product.subCategory === "Free" && (
                  <div className="banner__marquee-image" key={product._id}>
                    <NavLink to={`/items/${product._id}`}>
                      <img src={product.image.secure_url} alt={product._id} />
                    </NavLink>
                  </div>
                )
            )}
          </Marquee>
        )}
      </div>

      <div className="bannerMarquee__premium">
        <p>Premium Photos</p>
        {loading ? (
          <Loading type="BallTriangle" color="#1185ed" />
        ) : (
          <Marquee
            pauseOnHover="true"
            speed="60"
            gradientWidth="0px"
            direction="right"
          >
            {products?.map(
              (product) =>
                product.category === "Premium" && (
                  <div className="banner__marquee-image" key={product._id}>
                    <NavLink to={`/items/${product._id}`}>
                      <img src={product.image.secure_url} alt={product._id} />
                    </NavLink>
                  </div>
                )
            )}
          </Marquee>
        )}
      </div>
    </div>
  );
};

export default BannerMarquee;

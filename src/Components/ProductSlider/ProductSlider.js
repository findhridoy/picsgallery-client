import React from "react";
import { NavLink } from "react-router-dom";
// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";
import "swiper/components/navigation/navigation.scss";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";

// install Swiper modules
SwiperCore.use([Navigation]);

const ProductSlider = ({ products, headline }) => (
  <div className="productSlider">
    <p>{headline}</p>
    <div className="productSlider-slider">
      <Swiper
        spaceBetween={-60}
        slidesPerView={5}
        navigation
        breakpoints={{
          // when window width is >= 640px
          340: {
            slidesPerView: 1,
          },
          // when window width is >= 576px
          576: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
          // when window width is >= 992px
          992: {
            slidesPerView: 4,
          },
          // when window width is >= 1200px
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {products?.map(
          (product) =>
            product.category === "Premium" &&
            product.subCategory === headline && (
              <SwiperSlide key={product._id}>
                <NavLink to={`/items/${product._id}`}>
                  <img src={product.image.secure_url} alt={product._id} />
                </NavLink>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  </div>
);
export default ProductSlider;

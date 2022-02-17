import React from "react";
import { useSelector } from "react-redux";
import ProductSlider from "../ProductSlider/ProductSlider";

const Products = () => {
  // redux element
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  return (
    <div className="products">
      <ProductSlider products={products} headline="Nature" />
      <ProductSlider products={products} headline="Marvel" />
      <ProductSlider products={products} headline="DC" />
      <ProductSlider products={products} headline="GOT" />
      <ProductSlider products={products} headline="Vector" />
      <ProductSlider products={products} headline="Mobile View" />
    </div>
  );
};

export default Products;

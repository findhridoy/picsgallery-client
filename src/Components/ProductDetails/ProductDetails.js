import axios from "axios";
import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/actions/cartActions";

const ProductDetails = ({ product }) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const itemExist = cartItems.find((x) => x.product_id === product?._id);

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };
  useEffect(() => {
    if (itemExist) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [itemExist, setBtnDisabled]);
  const handleDownload = async (url, filename) => {
    const res = await axios.get(url, {
      responseType: "blob",
    });
    fileDownload(res.data, filename);
  };
  return (
    <>
      <div className="productDetails">
        <div className="productDetails__title">{product?.title}</div>
        <div className="productDetails__author">
          by <span>Pinterest</span>
        </div>
        <div className="productDetails__description">
          {product?.description}
        </div>
        <div className="productDetails__size">
          Original size:{" "}
          <span>{(product?.image.bytes / 1024).toFixed(1)} KB</span>
        </div>
        <div className="productDetails__dimensions">
          Dimensions:{" "}
          <span>
            {product?.image.width} x {product?.image.height}
          </span>
        </div>
        <div className="productDetails__type">
          Items type:
          <span> {product?.image.format}</span>
        </div>
        <div className="productDetails__category">
          Category: <span>{product?.category}</span>
        </div>
        <div className="productDetails__button">
          {product?.category === "Free" && product?.subCategory === "Free" ? (
            <button
              type="button"
              onClick={() =>
                handleDownload(
                  product?.image.url,
                  `PicsGallery - ${product?.image.original_filename}.${product?.image.format}`
                )
              }
            >
              Download
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleAddToCart(product?._id)}
              disabled={btnDisabled}
            >
              ${product?.price} • Add to cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

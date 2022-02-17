import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../Redux/actions/cartActions";

const CartDetails = ({ item }) => {
  const dispatch = useDispatch();
  // Remove from cart
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      <div className="cartDetails">
        <div className="cartDetails__image">
          <img src={item?.image.secure_url} alt={item?.title} />
        </div>
        <div className="cartDetails__area">
          <div className="cartDetails__details">
            <div className="details__title">{item?.title}</div>
            <div className="details">
              Original Size :{" "}
              <span>{(item?.image.bytes / 1024).toFixed(1)} KB</span>
            </div>
            <div className="details">
              Dimensions :{" "}
              <span>
                {item?.image.width} x {item?.image.height}
              </span>
            </div>
            <div className="details">
              Format : <span>{item?.image.format}</span>
            </div>
            <div className="details">
              Price : <span>${item?.price}</span>
            </div>
          </div>
          <div className="cartDetails__remove">
            <button
              type="button"
              onClick={() => handleRemoveFromCart(item.product_id)}
            >
              <TiDeleteOutline />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;

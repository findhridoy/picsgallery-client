import React, { useEffect } from "react";
import Zoom from "react-img-zoom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Layout from "../Components/Layout/Layout";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import { detailsProduct } from "../Redux/actions/productActions";
import Loading from "../Utils/Loading&Error/Loading";

const ProductScreen = () => {
  const { id } = useParams();

  // Toast notification
  const { addToast } = useToasts();

  // redux element
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      dispatch(detailsProduct(id));
    }
  }, [dispatch, error, addToast, id]);

  return (
    <Layout>
      {loading ? (
        <Loading type="BallTriangle" color="#1185ed" />
      ) : (
        <div className="productScreen container">
          <div className="productScreen__area">
            <div className="productScreen__image">
              <Zoom
                img={product?.image.secure_url}
                zoomScale={3}
                height={400}
                width={220}
              />
            </div>
            <div className="productScreen__details">
              <ProductDetails product={product} />
            </div>
          </div>
          {/* <div className="productScreen__description" /> */}
        </div>
      )}
    </Layout>
  );
};

export default ProductScreen;

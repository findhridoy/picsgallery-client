import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import { deleteProduct, listProduct } from "../Redux/actions/productActions";
import Loading from "../Utils/Loading&Error/Loading";

const ProductListScreen = ({ history }) => {
  //  Toast notification
  const { addToast } = useToasts();

  // redux element
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      dispatch(listProduct());
    }
  }, [dispatch, history, userInfo, error, successDelete, addToast]);

  //    Delete product function
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <DashboardLayout>
      <div className="productList">
        <div className="productList__title">Product List</div>
        <div className="productList__list">
          {loadingDelete || loading ? (
            <Loading type="BallTriangle" color="#1185ed" />
          ) : (
            <table className="productList__table">
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Price</th>
                <th>Date</th>
                <th>Action</th>
              </tr>

              {products?.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product._id}
                    <div className="id__image-hover">
                      <img src={product.image.secure_url} alt={product._id} />
                    </div>
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>{product.subCategory}</td>
                  <td>{product.price}</td>
                  <td>
                    <Moment format="DD - MMM - YYYY">
                      {product.createdAt}
                    </Moment>
                  </td>
                  <td>
                    <div className="productList__table-button">
                      <button type="button">
                        <AiOutlineEdit />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>
        {errorDelete &&
          addToast(errorDelete, {
            appearance: "error",
            autoDismiss: true,
          })}
      </div>
    </DashboardLayout>
  );
};

export default ProductListScreen;

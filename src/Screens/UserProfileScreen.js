import React, { useEffect } from "react";
import { HiCheck } from "react-icons/hi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import { getMyOrderDetails } from "../Redux/actions/orderActions";
import Loading from "../Utils/Loading&Error/Loading";

const UserProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  // const orderMyDetails = useSelector((state) => state.orderMyDetails);
  const orderMyDetails = useSelector((state) => state.orderMyDetails);
  const { loading, orders } = orderMyDetails;

  useEffect(() => {
    dispatch(getMyOrderDetails());
  }, [dispatch]);

  const handleRouteChange = (id) => {
    history.push(`/order/${id}`);
  };

  return (
    <>
      {loading ? (
        <Loading type="BallTriangle" color="#1185ed" />
      ) : (
        <>
          <Header />
          <div className="container">
            <div className="userProfile">
              <div className="userProfile__profile-details">
                <div className="profile__image"></div>
                <div className="profile__name">Name</div>
                <div className="profile__username">username</div>
                <div className="profile__email">email@gmail.com</div>
                <div className="profile__edit-btn">
                  <button type="button">Edit Profile</button>
                </div>
              </div>
              <div className="userProfile__order-details">
                <div className="order__orderTitle">My Orders</div>
                <table className="orderList__table">
                  <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Action</th>
                  </tr>
                  {orders?.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>
                        <Moment format="DD - MMM - YYYY">
                          {order.createdAt}
                        </Moment>
                      </td>
                      <td>{order.totalPrice}</td>
                      <td>
                        <div className="userList__checkPaid">
                          {order.isAdmin ? <HiCheck /> : <RiDeleteBack2Fill />}
                        </div>
                      </td>
                      <td>Delivered</td>
                      <td>
                        <div className="orderList__table-btn">
                          <button
                            type="button"
                            onClick={() => handleRouteChange(order._id)}
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfileScreen;

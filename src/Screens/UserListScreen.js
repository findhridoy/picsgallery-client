import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { HiCheck } from "react-icons/hi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import { deleteUser, listUsers } from "../Redux/actions/userActions";
import Loading from "../Utils/Loading&Error/Loading";

const UserListScreen = ({ history }) => {
  //  Toast notification
  const { addToast } = useToasts();

  // redux element
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

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
      dispatch(listUsers());
    }
  }, [dispatch, history, userInfo, error, successDelete, addToast]);

  //    Delete user function
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };
  return (
    <DashboardLayout>
      <div className="userList">
        <div className="userList__title">User List</div>
        <div className="userList__list">
          {loadingDelete || loading ? (
            <Loading type="BallTriangle" color="#1185ed" />
          ) : (
            <table className="userList__table">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Date</th>
                <th>Action</th>
              </tr>

              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="userList__checkAdmin">
                      {user.isAdmin ? <HiCheck /> : <RiDeleteBack2Fill />}
                    </div>
                  </td>
                  <td>
                    <Moment format="DD - MMM - YYYY">{user.createdAt}</Moment>
                  </td>
                  <td>
                    <div className="userList__table-button">
                      <button type="button">
                        <AiOutlineEdit />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user._id)}
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

export default UserListScreen;

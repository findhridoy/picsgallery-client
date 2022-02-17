import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Header from "../Components/Header/Header";
import { login } from "../Redux/actions/userActions";
import { loginSchema } from "../Utils/Validation/ValidationSchema";

const LoginScreen = ({ location, history }) => {
  // React hook form own state
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  // Redirect
  const redirect = location.search ? location.search.split("=")[1] : "/";

  //  Toast notification
  const { addToast } = useToasts();

  // react redux property
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [addToast, error, history, redirect, userInfo]);

  // React hook form data submit
  const onSubmit = async (data) => {
    const { username, password } = data;

    // dispatch login
    dispatch(login(username, password));
  };
  // Password hide/show state
  const [showPass, setShowPass] = useState(false);
  const handleShowPassword = () => {
    setShowPass(!showPass);
  };
  return (
    <>
      <Header />
      <div className="login">
        <div className="login__title">Login</div>
        <div className="login__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login__field">
              <span className="login__label">Username</span>
              <input type="text" {...register("username")} />
              {errors.username && (
                <span className="login__">{errors.username.message}</span>
              )}
            </div>

            <div className="login__field">
              <span className="login__label">Password</span>
              <input
                type={showPass ? "text" : "password"}
                {...register("password")}
              />
              {errors.password && (
                <span className="login__">{errors.password.message}</span>
              )}
            </div>

            <div className="login__forgot-check">
              <div className="login__checkbox">
                <input
                  type="checkbox"
                  id="showPassword"
                  name="showPassword"
                  onClick={handleShowPassword}
                />
                <label htmlFor="showPassword">Show password</label>
              </div>
              <NavLink className="login__forgot" to="/forgot-password">
                Forgotten password?
              </NavLink>
            </div>

            <button type="submit" className="login__button">
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color="#FFFFFF"
                  height={13}
                  width={100}
                />
              ) : (
                "Login"
              )}
            </button>
            <div className="login__field">
              <span className="login__create">
                Don't have an account?{" "}
                <NavLink
                  className="login__link"
                  to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
                >
                  Create a new account.
                </NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;

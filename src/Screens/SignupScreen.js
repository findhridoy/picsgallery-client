import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Header from "../Components/Header/Header";
import { registerUser } from "../Redux/actions/userActions";
import { signUpSchema } from "../Utils/Validation/ValidationSchema";

const SignupScreen = ({ location, history }) => {
  // React hook form own state
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signUpSchema),
  });

  // Redirect
  const redirect = location.search ? location.search.split("=")[1] : "/";

  //  Toast notification
  const { addToast } = useToasts();

  // react redux property
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

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
  const onSubmit = (data) => {
    const { fullName, email, username, password } = data;

    // dispatch register
    dispatch(registerUser(fullName, email, username, password));
  };

  // Password hide/show state
  const [showPass, setShowPass] = useState(false);
  const handleShowPassword = () => {
    setShowPass(!showPass);
  };
  return (
    <>
      <Header />
      <div className="signup">
        <div className="signup__title">Sign Up</div>
        <div className="signup__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="signup__field">
              <span className="signup__label">Full Name</span>
              <input type="text" {...register("fullName")} />
              {errors.fullName && (
                <span className="signup__">{errors.fullName.message}</span>
              )}
            </div>

            <div className="signup__field">
              <span className="signup__label">Email</span>
              <input type="email" {...register("email")} />
              {errors.email && (
                <span className="signup__">{errors.email.message}</span>
              )}
            </div>

            <div className="signup__field">
              <span className="signup__label">Username</span>
              <input type="text" {...register("username")} />
              {errors.username && (
                <span className="signup__">{errors.username.message}</span>
              )}
            </div>

            <div className="signup__field">
              <span className="signup__label">Password</span>
              <input
                type={showPass ? "text" : "password"}
                {...register("password")}
              />
              {errors.password && (
                <span className="signup__">{errors.password.message}</span>
              )}
            </div>

            <div className="signup__field">
              <span className="signup__label">Confirm Password</span>
              <input
                type={showPass ? "text" : "password"}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="signup__">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="signup__checkbox">
              <input
                type="checkbox"
                id="showPassword"
                name="showPassword"
                onClick={handleShowPassword}
              />
              <label htmlFor="showPassword">Show password</label>
            </div>

            <button type="submit" className="signup__button">
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color="#FFFFFF"
                  height={13}
                  width={100}
                />
              ) : (
                "Sign Up"
              )}
            </button>
            <div className="signup__field">
              <span className="signup__create">
                Already have an account?{" "}
                <NavLink
                  className="signup__link"
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                >
                  Login
                </NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupScreen;

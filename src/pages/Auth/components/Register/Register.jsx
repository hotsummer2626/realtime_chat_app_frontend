import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../../store/apis/auth";
import {
  ToastContainer,
  toast,
  toastOptions,
} from "../../../../components/Toast";
import { login } from "../../../../store/slices/auth";

const Register = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const [register, { isLoading }] = useRegisterMutation();
  console.log(auth);

  const inputChangeHandler = (inputName) => (e) =>
    setFormData({
      ...formData,
      [inputName]: e.target.value,
    });

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = formData;
    const emailRegex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "i"
    );
    if (username.length <= 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    }
    if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Email is invalid", toastOptions);
      return false;
    }
    if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters",
        toastOptions
      );
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same", toastOptions);
      return false;
    }
    return true;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      register(formData)
        .then((res) => {
          if (res.error) {
            toast.error(res.error.error, toastOptions);
            return;
          }
          if (!res.data.status) {
            toast.error(res.data.msg, toastOptions);
            return;
          }
          dispatch(login(res.data.user));
          navigate("/chat", { replace: true });
        })
        .catch((err) => alert(err));
    }
  };
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <h2>Register</h2>
        <input
          type="text"
          value={formData.username}
          placeholder="Username"
          onChange={inputChangeHandler("username")}
        />
        <input
          type="text"
          value={formData.email}
          placeholder="Email"
          onChange={inputChangeHandler("email")}
        />
        <input
          type="password"
          value={formData.password}
          placeholder="Password"
          onChange={inputChangeHandler("password")}
        />
        <input
          type="password"
          value={formData.confirmPassword}
          placeholder="Confirm password"
          onChange={inputChangeHandler("confirmPassword")}
        />
        <button>Register</button>
        <div className="reminder">
          Already has an account?&nbsp;
          <span onClick={switchToLogin}>Login</span>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Register;

import React, { useState } from "react";
import {
  ToastContainer,
  toast,
  toastOptions,
} from "../../../../components/Toast";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../../store/apis/auth";
import { login } from "../../../../store/slices/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ switchToRegister }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginFn] = useLoginMutation();

  const inputChangeHandler = (inputName) => (e) =>
    setFormData({
      ...formData,
      [inputName]: e.target.value,
    });

  const handleValidation = () => {
    const { usernameOrEmail, password } = formData;
    if (usernameOrEmail === "") {
      toast.error("Username or email is required", toastOptions);
      return false;
    }
    if (password === "") {
      toast.error("Password is required".toastOptions);
      return false;
    }
    return true;
  };

  const onSubmitHanlder = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      loginFn(formData)
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
          navigate("/avatar", { replace: true });
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHanlder}>
        <h2>Login</h2>
        <input
          type="text"
          value={formData.usernameOrEmail}
          placeholder="Username or Email"
          onChange={inputChangeHandler("usernameOrEmail")}
        />
        <input
          type="password"
          value={formData.password}
          placeholder="Password"
          onChange={inputChangeHandler("password")}
        />
        <button>Login</button>
        <div className="reminder">
          Don't have an account?&nbsp;
          <span onClick={switchToRegister}>Register</span>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;

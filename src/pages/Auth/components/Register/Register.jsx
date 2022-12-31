import React, { useState } from "react";
import styles from "./Register.module.scss";

const Register = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChangeHandler = (inputName) => (e) =>
    setFormData({
      ...formData,
      [inputName]: e.target.value,
    });
  return (
    <form>
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
      <div className={styles.reminder}>
        Already has an account?&nbsp;
        <span onClick={switchToLogin}>Login</span>
      </div>
    </form>
  );
};

export default Register;

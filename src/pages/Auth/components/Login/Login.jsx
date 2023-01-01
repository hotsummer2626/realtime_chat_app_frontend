import React, { useState } from "react";

const Login = ({ switchToRegister }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const inputChangeHandler = (inputName) => (e) =>
    setFormData({
      ...formData,
      [inputName]: e.target.value,
    });
  return (
    <form>
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
      <div className='reminder'>
        Don't have an account?&nbsp;
        <span onClick={switchToRegister}>Register</span>
      </div>
    </form>
  );
};

export default Login;

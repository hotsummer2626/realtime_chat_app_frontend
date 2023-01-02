import React, { useState, useEffect } from "react";
import styles from "./Auth.module.scss";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user?.token) {
      navigate("/avatar", { replace: true });
    }
  }, [auth]);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>LET'S CHAT</h1>
      </div>
      {isLoginForm ? (
        <Login switchToRegister={() => setIsLoginForm(false)} />
      ) : (
        <Register switchToLogin={() => setIsLoginForm(true)} />
      )}
    </div>
  );
};

export default Auth;

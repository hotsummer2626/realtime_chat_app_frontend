import React, { useState } from "react";
import styles from "./Auth.module.scss";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>LET'S CHAT</h1>
      </div>
      {isLoginForm ? (
        <Login switchToRegister={() => setIsLoginForm(false)} />
      ) : (
        <Register switchToLogin={()=>setIsLoginForm(true)}/>
      )}
    </div>
  );
};

export default Auth;

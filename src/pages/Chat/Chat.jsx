import React from "react";
import styles from "./Chat.module.scss";
import Contact from "./components/Contact/Contact";
import DialogBox from "./components/DialogBox/DialogBox";
import UserInfo from "./components/UserInfo/UserInfo";

const Chat = () => {
  return (
    <div className={styles.container}>
      <Contact />
      <DialogBox />
      <UserInfo />
    </div>
  );
};

export default Chat;

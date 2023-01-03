import React, { useState } from "react";
import styles from "./DialogBox.module.scss";
import Img from "../../../../components/Img";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Picker from "emoji-picker-react";

const messages = [
  "hello",
  "how are you",
  "i am fine thank you and you?",
  "i am good",
];

const DialogBox = () => {
  const [isEmojiPickerShow, setIsEmojiPickerShow] = useState(false);
  const [message, setMessage] = useState("");
  const {
    user: { selectedDialogUser },
  } = useSelector((state) => state);

  const handleEmojiClick = (emoji, e) => {
    e.stopPropagation();
    let msg = message;
    msg += emoji.emoji;
    setMessage(msg);
  };
  return (
    <div className={styles.container}>
      {/* {selectedDialogUser && (
        <div className={styles.header}>
          <Img avatar={selectedDialogUser.avatar} />
          <h3>{selectedDialogUser.username}</h3>
        </div>
      )} */}
      <div className={styles.header}>
        {/* <Img avatar={selectedDialogUser.avatar} /> */}
        <h3>username</h3>
      </div>
      <div className={styles.dialog}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            {message}
          </div>
        ))}
      </div>
      <form>
        <div className={styles.emoji}>
          <FontAwesomeIcon
            icon={faFaceSmile}
            onClick={() => setIsEmojiPickerShow(!isEmojiPickerShow)}
          />
          {isEmojiPickerShow && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
        <input
          type="text"
          value={message}
          placeholder="Type a message here"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default DialogBox;

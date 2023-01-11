import React, { useState, useEffect, useRef } from "react";
import styles from "./DialogBox.module.scss";
import Img from "../../../../components/Img";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Picker from "emoji-picker-react";
import {
    useAddMessageMutation,
    useGetAllMessagesMutation,
} from "../../../../store/apis/message";
import { io } from "socket.io-client";

const DialogBox = () => {
    const [isEmojiPickerShow, setIsEmojiPickerShow] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [arriveMessage, setArriveMessage] = useState({});
    const {
        auth: { user: currentUser },
        user: { selectedDialogUser },
    } = useSelector((state) => state);
    const [addMessageFn] = useAddMessageMutation();
    const [getAllMessagesFn] = useGetAllMessagesMutation();
    const scrollElement = useRef();
    const socket = useRef();

    useEffect(() => {
        if (currentUser && selectedDialogUser) {
            getAllMessagesFn({
                senderId: currentUser._id,
                receiverId: selectedDialogUser._id,
            })
                .then((res) => setMessages(res.data))
                .catch((err) => alert(err));
        }
    }, [currentUser, selectedDialogUser]);

    useEffect(() => {
        socket.current = io("http://localhost:5000");
        socket.current.emit("add-user", currentUser._id);
        socket.current.on("receive-msg", (msg) => {
            setArriveMessage({ message: msg, fromSelf: false });
        });
    }, []);

    useEffect(() => {
        arriveMessage && setMessages([...messages, arriveMessage]);
    }, [arriveMessage]);

    useEffect(() => {
        if (scrollElement.current) {
            scrollElement.current.scrollTop =
                scrollElement.current.scrollHeight;
        }
    }, [messages]);

    const handleEmojiClick = (emoji, e) => {
        e.stopPropagation();
        let msg = message;
        msg += emoji.emoji;
        setMessage(msg);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setMessage("");
        addMessageFn({
            from: currentUser._id,
            to: selectedDialogUser._id,
            message,
        })
            .then((res) => {
                if (res.data.status) {
                    setMessages([
                        ...messages,
                        { message: res.data.msg.text, fromSelf: true },
                    ]);
                    socket.current.emit("send-msg", {
                        to: selectedDialogUser._id,
                        message,
                    });
                }
            })
            .catch((err) => alert(err));
    };
    return (
        <div className={styles.container}>
            {selectedDialogUser ? (
                <>
                    <div className={styles.header}>
                        <Img avatar={selectedDialogUser.avatar} />
                        <h3>{selectedDialogUser.username}</h3>
                    </div>
                    <div className={styles.dialog} ref={scrollElement}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`${styles.message} ${
                                    message.fromSelf
                                        ? styles.sender
                                        : styles.receiver
                                }`}
                            >
                                {message.message}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <div className={styles.emoji}>
                            <FontAwesomeIcon
                                icon={faFaceSmile}
                                onClick={() =>
                                    setIsEmojiPickerShow(!isEmojiPickerShow)
                                }
                            />
                            {isEmojiPickerShow && (
                                <Picker onEmojiClick={handleEmojiClick} />
                            )}
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
                </>
            ) : (
                <div className={styles.initial}>
                    <h3>Please select a chat to start messaging</h3>
                </div>
            )}
        </div>
    );
};

export default DialogBox;

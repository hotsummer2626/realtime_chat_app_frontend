import React, { useState, useEffect } from "react";
import styles from "./Chat.module.scss";
import Contact from "./components/Contact/Contact";
import DialogBox from "./components/DialogBox/DialogBox";
import UserInfo from "./components/UserInfo/UserInfo";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedDialogUser } from "../../store/slices/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
    const [currentShowPart, setCurrentShowPart] = useState("dialog");
    const {
        auth: { user },
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSelectedDialogUser(null));
    }, []);

    useEffect(() => {
        if (!user) {
            navigate("/", { replace: true });
        }
    }, [user]);

    return (
        <div className={styles.container}>
            {user && (
                <>
                    <Contact
                        currentShowPart={currentShowPart}
                        setCurrentShowPart={setCurrentShowPart}
                    />
                    <DialogBox currentShowPart={currentShowPart} />
                    <UserInfo currentShowPart={currentShowPart} />
                    {currentShowPart !== "contacts" && (
                        <div
                            className={`${styles.switchButton} ${styles.left}`}
                            onClick={() =>
                                setCurrentShowPart(
                                    currentShowPart === "dialog"
                                        ? "contacts"
                                        : "dialog"
                                )
                            }
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            {currentShowPart === "dialog"
                                ? "Contacts"
                                : "Dialog"}
                        </div>
                    )}
                    {currentShowPart !== "userInfo" && (
                        <div
                            className={`${styles.switchButton} ${styles.right}`}
                            onClick={() =>
                                setCurrentShowPart(
                                    currentShowPart === "dialog"
                                        ? "userInfo"
                                        : "dialog"
                                )
                            }
                        >
                            {currentShowPart === "dialog"
                                ? "User Information"
                                : "Dialog"}
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Chat;

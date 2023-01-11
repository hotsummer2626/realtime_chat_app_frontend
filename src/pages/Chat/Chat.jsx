import React, { useEffect } from "react";
import styles from "./Chat.module.scss";
import Contact from "./components/Contact/Contact";
import DialogBox from "./components/DialogBox/DialogBox";
import UserInfo from "./components/UserInfo/UserInfo";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedDialogUser } from "../../store/slices/user";

const Chat = () => {
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
                    <Contact />
                    <DialogBox />
                    <UserInfo />
                </>
            )}
        </div>
    );
};

export default Chat;

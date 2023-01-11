import React from "react";
import styles from "./UserInfo.module.scss";
import Img from "../../../../components/Img";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../store/slices/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const UserInfo = ({ currentShowPart }) => {
    const {
        auth: { user },
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div
            className={`${styles.container} ${
                currentShowPart === "userInfo" ? styles.show : ""
            }`}
        >
            <div className={styles.imgWrapper}>
                <Img avatar={user.avatar} />
            </div>
            <h3>{user.username}</h3>
            <div className={styles.email}>{user.email}</div>
            <div className={styles.logout} onClick={() => dispatch(logout())}>
                Logout
                <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
        </div>
    );
};

export default UserInfo;

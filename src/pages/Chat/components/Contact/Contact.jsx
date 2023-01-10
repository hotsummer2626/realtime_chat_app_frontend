import React, { useState, useEffect } from "react";
import styles from "./Contact.module.scss";
import Img from "../../../../components/Img";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllUsersQuery } from "../../../../store/apis/user";
import { setSelectedDialogUser } from "../../../../store/slices/user";

const Contact = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const { data } = useGetAllUsersQuery();
    const {
        auth: { user: currentUser },
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data && currentUser) {
            const newData = data.filter((user) => user._id !== currentUser._id);
            setUsers(newData);
            setSelectedUsers(newData);
        }
    }, [data, currentUser]);

    useEffect(() => {
        if (users.length) {
            setSelectedUsers(
                users.filter((user) => user.username.indexOf(searchText) !== -1)
            );
        }
    }, [searchText]);

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div className={styles.userListContainer}>
                <div className={styles.userListWrapper}>
                    {selectedUsers &&
                        selectedUsers.map((user) => (
                            <div
                                key={user._id}
                                className={styles.userItem}
                                onClick={() =>
                                    dispatch(setSelectedDialogUser(user))
                                }
                            >
                                <Img avatar={user.avatar} />
                                <h3>{user.username}</h3>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;

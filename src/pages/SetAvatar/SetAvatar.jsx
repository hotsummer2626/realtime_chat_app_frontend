import React, { useState, useEffect } from "react";
import styles from "./SetAvatar.module.scss";
import { avatars as avatarSvgs } from "../../assets/avatars";
import { Buffer } from "buffer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetAvatarMutation } from "../../store/apis/user";
import { setUserAvatar, logout } from "../../store/slices/auth";
import { ToastContainer, toast, toastOptions } from "../../components/Toast";
import Img from "../../components/Img";

const SetAvatar = () => {
  const [avatars, setAvatars] = useState(null);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [setAvatarFn] = useSetAvatarMutation();

  useEffect(() => {
    if (!auth?.user?.token) {
      navigate("/", { replace: true });
    }
    if (auth?.user?.avatar) {
      navigate("/chat", { replace: true });
    }
  }, [auth]);

  useEffect(() => {
    const avatarsBase64 = avatarSvgs.map((avatar) => {
      const buffer = Buffer.from(avatar, "utf-8");
      return buffer.toString("base64");
    });
    setAvatars(avatarsBase64);
  }, []);

  const setAvatarHanlder = () => {
    setAvatarFn({ userId: auth.user._id, avatar: avatars[selectedAvatarIndex] })
      .then((res) => {
        if (res.error) {
          toast.error(res.error.error, toastOptions);
          dispatch(logout());
          return;
        }
        if (!res.data.status) {
          toast.error(res.data.msg, toastOptions);
          dispatch(logout());
          return;
        }
        dispatch(setUserAvatar({ avatar: avatars[selectedAvatarIndex] }));
        navigate("/chat", { replace: true });
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Pick an avatar as your profile picture</h3>
        <div className={styles.avatarsWrapper}>
          {avatars &&
            avatars.map((avatar, index) => (
              <div
                key={index}
                className={`${styles.avatar} ${
                  selectedAvatarIndex === index ? styles.selected : ""
                }`}
                onClick={() => setSelectedAvatarIndex(index)}
              >
                <Img avatar={avatar} />
              </div>
            ))}
        </div>
        <div className={styles.button} onClick={setAvatarHanlder}>
          SET AS PROFILE PICTURE
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SetAvatar;

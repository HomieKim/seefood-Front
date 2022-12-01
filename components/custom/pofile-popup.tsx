import { useEffect } from "react";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import styles from "styles/custom/pop-up.module.scss";
import ProfileImage from "./profile-image";
const ProfilePopUp = ({
  setPopup,
  setModal,
}: {
  setPopup: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const logoutHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setModal(true);
    setPopup((prev) => !prev);
  }, []);
  const [nickname, setNickName] = useState("");
  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) {
      setNickName(name);
    }
  }, []);
  return (
    <div
      onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      className={styles.wrapper}
    >
      <section>
        <ProfileImage size={20} />
        <h4>{nickname}</h4>
      </section>
      <hr />
      <button onClick={() => router.push("/profile")}>프로필 보기</button>
      <button onClick={logoutHandler}>로그 아웃</button>
    </div>
  );
};

export default ProfilePopUp;

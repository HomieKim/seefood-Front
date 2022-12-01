import { useRouter } from "next/router";
import React, { useCallback } from "react";
import ModalLayout from "./modal-layout";
import LogoutIcon from "public/icons/logout.svg";
import styles from "styles/modal/logout-modal.module.scss";
import { deleteCookie } from "cookies-next";

const LogoutModal = ({ show, close }: { show: boolean; close: () => void }) => {
  const router = useRouter();
  const logoutRequest = useCallback(() => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    localStorage.removeItem("userId");
    console.log("로그아웃 벡엔드에 요청");
    close();
    router.push("/login");
  }, []);
  return (
    <ModalLayout show={show} close={close}>
      <section className={styles.icon}>
        <div>
          <LogoutIcon width={50} height={50} />
        </div>
      </section>
      <h3>로그 아웃 하시겠습니까?</h3>
      <section className={styles["button-section"]}>
        <button onClick={logoutRequest}>YES</button>
        <button onClick={close}>NO</button>
      </section>
    </ModalLayout>
  );
};

export default LogoutModal;

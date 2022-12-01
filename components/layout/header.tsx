import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import styles from "styles/layout.module.scss";
import { LayoutHeader } from "types/common";
import Image from "next/image";
import ProfileImage from "components/custom/profile-image";
import ProfilePopUp from "components/custom/pofile-popup";
import useModal from "hooks/use-modal";
import LogoutModal from "components/modal/logout-modal";
import { getCookie } from "cookies-next";

const Header = ({ title, noProfile }: LayoutHeader) => {
  const router = useRouter();
  const isLogin = getCookie("accessToken");
  const [showPopup, setShowPopup] = useState(false);
  const { isOpen, onClose, setIsOpen } = useModal();

  return (
    <header className={styles.header}>
      {title ? (
        title === "search" ? (
          <h2>#{router.query.keyword} 검색 결과</h2>
        ) : (
          <h2>{title}</h2>
        )
      ) : (
        <div className={styles.t1}>
          <Image
            src="/logo/seefood-logo-color.png"
            alt="logo"
            width={120}
            height={25}
          />
        </div>
      )}
      {!noProfile && (
        <div
          onClick={() => setShowPopup((prev) => !prev)}
          className={styles.profile}
        >
          {isLogin ? (
            <div>
              <ProfileImage size={36} />
              {showPopup && (
                <ProfilePopUp setPopup={setShowPopup} setModal={setIsOpen} />
              )}
              <LogoutModal show={isOpen} close={onClose} />
            </div>
          ) : (
            <button onClick={() => router.replace("/login")}>LogIn</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

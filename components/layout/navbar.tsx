import React, { useMemo } from "react";
import styles from "styles/layout.module.scss";
import HomeIcon from "public/icons/home.svg";
import ProfileIcon from "public/icons/profile.svg";
import LikeIcon from "public/icons/heart.svg";
import FlagIcon from "public/icons/flag.svg";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const userId = localStorage.getItem("userId");
  const router = useRouter();

  const NavItem = useMemo(
    () => [
      {
        path: "/",
        icon: (
          <HomeIcon fill={router.pathname === "/" ? "#00ac77" : "#dadada"} />
        ),
        title: "HOME",
        active: router.pathname === "/",
      },
      {
        path: "/challenge",
        icon: (
          <FlagIcon
            fill={/challenge/.test(router.pathname) ? "#00ac77" : "#dadada"}
          />
        ),
        title: "MAIN",
        active: /challenge/.test(router.pathname),
      },
      {
        path: "/like",
        icon: (
          <LikeIcon
            fill={/like/.test(router.pathname) ? "#00ac77" : "#dadada"}
          />
        ),
        title: "LIKE",
        active: /like/.test(router.pathname),
      },
      {
        path: "/profile",
        icon: (
          <ProfileIcon
            fill={
              router.pathname === "/profile" || router.query.id === userId
                ? "#00ac77"
                : "#dadada"
            }
          />
        ),
        title: "MY",
        active: router.pathname === "/profile" || router.query.id === userId,
      },
    ],
    [router]
  );

  console.log("t", router.pathname);

  return (
    <nav className={styles.nav}>
      <ul>
        {NavItem.map((v, i) => (
          <Link key={i} href={v.path}>
            <div className={styles["nav-item"]}>
              <li>{v.icon}</li>
              <span className={v.active ? styles.active : styles["non-active"]}>
                {v.title}
              </span>
            </div>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

import { ReactNode, useState, useEffect } from "react";
import styles from "styles/layout.module.scss";
import { LayoutHeader } from "types/common";
import BackButton from "./back";
import Header from "./header";
import NavBar from "./navbar";
import { getCookie } from "cookies-next";
import Splash from "components/custom/splash";

interface Props {
  children: ReactNode;
  layoutHeader?: LayoutHeader;
  noNav?: boolean;
  noPadding?: boolean;
  hasBack?: { has: boolean; color: string };
}

const AppLayout = ({
  children,
  layoutHeader,
  noNav,
  noPadding,
  hasBack = { has: true, color: "grey" },
}: Props) => {
  const isLogin = getCookie("accessToken");
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    if (!splash && !isLogin) return;
    setTimeout(() => {
      setSplash(false);
    }, 1500);
  }, []);

  if (!isLogin && splash) return <Splash />;
  return (
    <div className={styles.wrapper}>
      {layoutHeader && <Header {...layoutHeader} />}
      {hasBack.has && <BackButton color={hasBack.color} />}
      <main
        style={{
          paddingTop: layoutHeader && "60px",
          paddingBottom: !noNav ? "60px" : "0",
          paddingRight: !noPadding ? "8px" : "0",
          paddingLeft: !noPadding ? "8px" : "0",
          height: "100%",
        }}
      >
        {children}
      </main>
      {!noNav && isLogin && <NavBar />}
    </div>
  );
};

export default AppLayout;

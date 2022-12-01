import Image from "next/image";
import React from "react";
import styles from "styles/custom/splash.module.scss";
const Splash = () => {
  return (
    <div className={styles.wrapper}>
      <Image src="/logo/seefood-logo.png" alt="logo" width={120} height={25} />
    </div>
  );
};

export default Splash;

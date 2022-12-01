import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "styles/custom/splash.module.scss";
const Splash: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 1500);
  }, []);
  return (
    <div className={styles.wrapper}>
      <Image src="/logo/seefood-logo.png" alt="logo" width={120} height={25} />
    </div>
  );
};

export default Splash;

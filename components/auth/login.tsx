import { signInAPI } from "apis/user";
import CustomInput from "components/custom/input";
import { setCookie } from "cookies-next";
import useInput from "hooks/use-input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useQueryClient } from "react-query";
import styles from "styles/auth.module.scss";

const LoginForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      signInAPI({ email: email, password: password }).then((res) => {
        const { data } = res;
        localStorage.setItem("userId", data.userId);
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        queryClient.invalidateQueries(["boardList"]);
        router.replace("/");
      });
    },
    [email, password]
  );
  return (
    <>
      <form>
        <CustomInput
          inputType="text"
          value={email}
          onChange={onChangeEmail}
          placeHolderMessage="이메일 입력"
        />
        <CustomInput
          inputType="password"
          value={password}
          onChange={onChangePassword}
          placeHolderMessage="비밀 번호 입력"
        />
        <button
          type="submit"
          onClick={onSubmit}
          className={styles["login-button"]}
        >
          로그인
        </button>
      </form>
      <section className={styles.Outh}>
        <div className={styles.title}>
          <span>sns로 로그인 하기</span>
        </div>
        <section className={styles["logo-section"]}>
          <div className={styles["Outh-login"]}>
            <div className={styles.img}>
              <Image src="/icons/google.svg" width={20} height={20} />
            </div>
            <div>구글로 로그인 하기</div>
          </div>
          <div className={styles["Outh-login"]}>
            <div className={styles.img}>
              <Image src="/icons/naver.svg" width={22} height={22} />
            </div>
            <div>네이버로 로그인 하기</div>
          </div>
          <div className={styles["Outh-login"]}>
            <div className={styles.img}>
              <Image src="/icons/kakao.svg" width={22} height={22} />
            </div>
            <div>카카오로 로그인 하기</div>
          </div>
        </section>
        <section className={styles.signup_section}>
          <span>회원이 아니신가요? </span>
          <Link href="/sign-up">
            <a className={styles.signup}>회원가입</a>
          </Link>
        </section>
      </section>
    </>
  );
};

export default LoginForm;

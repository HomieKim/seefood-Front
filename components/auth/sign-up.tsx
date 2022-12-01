import { signUpAPI } from "apis/user";
import CustomInput from "components/custom/input";
import useInput from "hooks/use-input";
import { useRouter } from "next/router";
import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "styles/auth.module.scss";

const SignUpForm = () => {
  const router = useRouter();
  const [email, onChangeEmail] = useInput<string>("");
  const [nickname, onChangeNickname] = useInput<string>("");
  const [password, onChangePassword] = useInput<string>("");
  const [height, onChangeHeight] = useInput<string>("");
  const [weight, onChangeWeight] = useInput<string>("");

  const [passwordChk, setPasswordChk] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChangePasswordChk = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordChk(e.target.value);
      setPasswordError(e.target.value !== password);
      if (e.target.value === "") {
        setPasswordError(false);
      }
    },
    [passwordChk]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      signUpAPI({
        email,
        password,
        username: nickname,
        height: parseInt(height),
        weight: parseInt(weight),
      }).then((res) => {
        console.log(res);
        router.replace("/login");
      });
    },
    [email, password, height, weight, passwordChk, nickname]
  );
  return (
    <>
      <form>
        <CustomInput
          inputType="text"
          value={email}
          onChange={onChangeEmail}
          placeHolderMessage="이메일 입력"
          error={{
            isError: emailError,
            message: errorMessage,
          }}
        />
        <CustomInput
          inputType="password"
          value={password}
          onChange={onChangePassword}
          placeHolderMessage="비밀 번호 입력"
        />
        <CustomInput
          inputType="password"
          value={passwordChk}
          onChange={onChangePasswordChk}
          error={{
            isError: passwordError,
            message: "비밀번호가 일치하지 않습니다.",
          }}
          placeHolderMessage="비밀 번호 확인"
          isSuccess={!passwordError && passwordChk !== ""}
        />
        <CustomInput
          inputType="text"
          value={nickname}
          onChange={onChangeNickname}
          placeHolderMessage="닉네임 입력"
          error={{
            isError: nicknameError,
            message: errorMessage,
          }}
        />
        <div className={styles.user}>
          <CustomInput
            inputType="text"
            value={height}
            onChange={onChangeHeight}
            placeHolderMessage="키 입력"
          />
          <span>cm</span>
          <CustomInput
            inputType="text"
            value={weight}
            onChange={onChangeWeight}
            placeHolderMessage="몸무게 입력"
          />
          <span>kg</span>
        </div>
        <button
          className={`${styles.button} ${
            !passwordError &&
            nickname !== "" &&
            email !== "" &&
            passwordChk !== ""
              ? styles.color
              : styles.grey
          } `}
          type="submit"
          onClick={onSubmit}
          disabled={
            passwordError || nickname == "" || email == "" || passwordChk == ""
          }
        >
          회원가입 하기
        </button>
      </form>
    </>
  );
};

export default SignUpForm;

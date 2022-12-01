import React, { MouseEvent } from "react";
import styles from "styles/custom/complete-button.module.scss";

interface Props {
  onClickHandler: (e: MouseEvent<HTMLButtonElement>) => void;
  isActive: boolean;
}

const CompleteButton = ({ onClickHandler, isActive }: Props) => {
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={isActive ? styles.color : ""}
        onClick={onClickHandler}
        disabled={!isActive}
      >
        완료
      </button>
    </div>
  );
};

export default CompleteButton;

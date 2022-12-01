import React, { SyntheticEvent } from "react";
import styles from "styles/post/post.module.scss";
import HeartIcon from "public/icons/heartColored.svg";
import BlankHeartIcon from "public/icons/heart.svg";
interface Props {
  isLike: boolean;
  isActive: boolean;
  toggleLike: (e: SyntheticEvent) => void;
}

const LikeButton = ({ isLike, isActive, toggleLike }: Props) => {
  return isLike ? (
    <div className={styles.heart} onClick={toggleLike}>
      <HeartIcon className={isActive ? styles.active : ""} />
    </div>
  ) : (
    <div className={styles.heart} onClick={toggleLike}>
      <BlankHeartIcon
        className={isActive ? styles.active : ""}
        fill="#dadada"
      />
    </div>
  );
};

export default LikeButton;

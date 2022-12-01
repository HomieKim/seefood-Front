import Image from "next/image";
import React, { MouseEvent, useCallback, useState } from "react";
import styles from "styles/post/post.module.scss";
import { Calorie } from "types/post";

interface Props {
  imageUrl: string;
}

const PostImage = ({ imageUrl }: Props) => {
  const [showCalorie, setShowCalorie] = useState(false);
  const toggleShow = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowCalorie((prev) => !prev);
  }, []);
  return (
    <div className={styles["image-wrapper"]} onClick={toggleShow}>
      <Image src={imageUrl} alt="food" layout="fill" />
      {showCalorie && (
        <div className={styles.background}>
          <span style={{ top: `100px`, left: `150px` }}>
            514
            <div>cal</div>
          </span>
        </div>
      )}
    </div>
  );
};

export default PostImage;

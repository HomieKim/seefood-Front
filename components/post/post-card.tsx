import React, { useCallback, useState } from "react";
import styles from "styles/post/post.module.scss";
import { Post, PostResponse } from "types/post";
import PostImage from "./post-image";
import HeartIcon from "public/icons/heartColored.svg";
import BlankHeartIcon from "public/icons/heart.svg";
import ProfileImage from "components/custom/profile-image";
import { getCookie } from "cookies-next";
import LikeButton from "components/custom/like-button";
import { useRouter } from "next/router";
import useLike from "hooks/use-like";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Props {
  postData: PostResponse;
  showLike?: boolean;
}

const PostCard = ({ postData, showLike = true }: Props) => {
  const router = useRouter();
  const isLogin = getCookie("accessToken");
  const [isLike, setIsLike] = useState(postData.isLike);
  const [isActive, setIsActive] = useState(postData.isLike);

  const { likeMutation, unLikeMutation } = useLike({ setIsLike });

  const toggleLike = useCallback(
    (e) => {
      e.stopPropagation();
      if (isLike) {
        unLikeMutation.mutate(postData.boardId);
      } else {
        likeMutation.mutate(postData.boardId);
      }
      if (!isActive) setIsActive(true);
    },
    [isLike]
  );

  return (
    <div className={styles.card}>
      <header>
        <section className={styles["user-info"]}>
          <ProfileImage size={40} />
          <div className={styles.nickname}>{postData.username}</div>
        </section>
      </header>
      <section>
        <PostImage imageUrl={postData.foodImageUrl} />
      </section>
      <section className={styles["descript-section"]}>
        <div className={styles["post-info"]}>
          <div className={styles.icons}>
            {isLogin && showLike && (
              <LikeButton
                isLike={isLike}
                isActive={isActive}
                toggleLike={toggleLike}
              />
            )}
            {isLogin && showLike && <span>•</span>}
            <span>{dayjs(postData.createdAt).fromNow()}</span>
          </div>
          <div className={styles.calorie}>
            <span>총</span>
            <h1>{postData.kcal}</h1> <span>Cal</span>
          </div>
        </div>
        <div className={styles.hr} />
        <div className={styles.hashtags}>
          {postData.hashTag.map((v, i) => (
            <span key={i} onClick={() => router.push(`/search/${v}`)}>
              #{v}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PostCard;

/* 내가 좋아요 한 식단인지 아닌지 판단해야함, 
서버에서 해서 줘도 되고 프론트에서 해도되고 */

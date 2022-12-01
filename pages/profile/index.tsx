import React from "react";
import { NextPageWithLayout } from "types/common";
import styles from "styles/profile/profile.module.scss";
import CustomCalendar from "components/custom/calendar";
import EditIcon from "public/icons/edit.svg";
import ProfileImage from "components/custom/profile-image";
import CustomLink from "components/custom/link";
import useUserId from "hooks/use-user-id";
import useUserDetail from "hooks/use-user-detail";

const ProfilePage: NextPageWithLayout = () => {
  const { userId } = useUserId();
  // 벡엔드에서 유저정보 가져옴
  const { data: userData } = useUserDetail({ id: userId });

  return (
    <div className={styles.wrapper}>
      <section className={styles["profile-section"]}>
        <div className={styles.user}>
          <div className={styles["user-wrapper"]}>
            <ProfileImage size={50} />
            <span className={styles.nickname}>{userData?.username}</span>
          </div>
          <CustomLink path="/profile/edit">
            <EditIcon width={16} height={16} fill="#ffffff" />
          </CustomLink>
        </div>
      </section>
      <div className={styles["post-info"]}>
        <CustomLink path={`/profile/${userId}`}>
          <span>나의 전체 식단 : {userData?.myDiet}</span>
        </CustomLink>
        <CustomLink path="/like">
          <span>나의 관심 식단 : {userData?.myLikeDiet}</span>
        </CustomLink>
      </div>
      <section className={styles["calendar-section"]}>
        <header>식단 일기</header>
        <hr />
        <CustomCalendar />
        <CustomLink path={`/profile/${userId}`}>
          <button className={styles["my-feed"]}>전체 식단 보기</button>
        </CustomLink>
      </section>
    </div>
  );
};
ProfilePage.noPadding = true;
ProfilePage.back = {
  has: true,
  color: "white",
};

export default ProfilePage;

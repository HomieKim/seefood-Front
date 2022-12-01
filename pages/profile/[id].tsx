import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NextPageWithLayout } from "types/common";
import styles from "styles/profile/profile-detail.module.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import CustomProgress from "components/custom/progress";
import CustomUserPost from "components/custom/user-post";
import ProfileImage from "components/custom/profile-image";
import CategorySection from "components/custom/category-section";
import useFoodDetail from "hooks/use-food-detail";
import { useInView } from "react-intersection-observer";
import useUserDetail from "hooks/use-user-detail";

const ProfileDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const [ref, inView] = useInView();
  const userId = router.query.id;
  // user id로 user의 업로드 리스트 벡엔드에서 받아옴
  const {
    dietList,
    readToLoad,
    isLoading: dietLoading,
  } = useFoodDetail({
    inView,
    id: parseInt(userId as string),
  });
  // 유저정보
  const { data: userData, isLoading: userLoading } = useUserDetail({
    id: parseInt(userId as string),
  });
  const [caution, setCaution] = useState(false);

  useEffect(() => {
    if (
      parseInt(userData?.userKcal as string) < (userData?.todayKcal as number)
    ) {
      setCaution(true);
    }
  }, [userData]);
  if (dietLoading && userLoading && !userData) return null;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{userData?.username} 님의 식단</div>
      <section className={styles["profile-section"]}>
        <div className={styles["profile-wrapper"]}>
          <div>
            <ProfileImage size={50} />
            <div className={styles.nickname}>{userData?.username}</div>
          </div>
          <div className={styles["user-info"]}>
            <div>식단</div>
            <div>관심 식단</div>
            <div>챌린지</div>
            <span>{userData?.myDiet}</span>
            <span>{userData?.myLikeDiet}</span>
            <span>0</span>
          </div>
        </div>
        <div className={styles["chart-section"]}>
          <div>today</div>
          <div className={styles.chart}>
            <CustomProgress
              valueStart={10}
              valueEnd={userData?.todayKcal as number}
            >
              {(value) => (
                <CircularProgressbar
                  value={value}
                  maxValue={parseInt(userData?.userKcal as string)}
                  text={`${userData?.todayKcal as number} Cal`}
                  styles={buildStyles({
                    textColor: caution ? "#E95733" : "var(--primary)",
                    pathColor: caution ? "#E95733" : "var(--primary)",
                  })}
                />
              )}
            </CustomProgress>
          </div>
          <div>{`${userData?.todayKcal as number} / ${parseInt(
            userData?.userKcal as string
          )} Cal`}</div>
        </div>
      </section>
      <CategorySection />
      <section className={styles["post-section"]}>
        <div className={styles["post-wrapper"]}>
          <CustomUserPost userPost={dietList!} />
          <div ref={readToLoad ? ref : undefined} style={{ height: 10 }} />
        </div>
      </section>
    </div>
  );
};

ProfileDetail.noPadding = true;

export default ProfileDetail;

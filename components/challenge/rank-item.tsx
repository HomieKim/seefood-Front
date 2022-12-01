import React, { useCallback } from "react";
import { RankUser } from "types/user";
import styles from "styles/challenge/rank.module.scss";
import Image from "next/image";
import { useRecoilState } from 'recoil';
import { selectedId } from 'recoils/selectId';

interface Props {
  userData: RankUser;
}
const RankItem = ({ userData }: Props) => {
  const [selectedRankId, setSelectedRankId] = useRecoilState(selectedId);
  
  console.log(userData);
  const onSelectBox = useCallback(() => {
    setSelectedRankId(userData.id);
  }, [setSelectedRankId]);
  return (
    <div
      className={
        userData.id === selectedRankId
          ? `${styles.box} ${styles.selected}`
          : styles.box
      }
      onClick={onSelectBox}
    >
      {userData.profileURL ? (
        <div>프로필 사진</div>
      ) : (
        <Image
          src="/images/default-profile.png"
          width={40}
          height={40}
          alt="profile"
        />
      )}
      <h4>{userData.nickname}</h4>
      <span className={styles.cal}>
        <span>총</span>
        <span> {userData.total} Kcal</span>
      </span>
    </div>
  );
};

export default RankItem;

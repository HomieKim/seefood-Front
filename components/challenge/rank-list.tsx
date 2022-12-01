import { rankList } from "dummy";
import React, { useEffect } from "react";
import RankItem from "./rank-item";
import styles from "styles/challenge/rank.module.scss";
import { useSetRecoilState } from 'recoil';
import { selectedId } from 'recoils/selectId';

const RankList = () => {
  // 랭크 리스트 벡엔드에서 받아옴
  const RankList = rankList;
  
  const setSelectRankId = useSetRecoilState(selectedId);

  useEffect(() => {
    setSelectRankId(RankList[0].id);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <article className={styles.wrapper}>
        {RankList.map((v, i) => (
          <RankItem key={i} userData={v} />
        ))}
      </article>
    </div>
  );
};

export default RankList;

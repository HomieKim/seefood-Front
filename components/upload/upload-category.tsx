import React, { useMemo, useState } from "react";

import styles from "styles/upload/upload-category.module.scss";
import {useRecoilState} from 'recoil'
import { nowCategoryAtom } from 'recoils/upload';
const UploadCategory = () => {
  const category = useMemo(() => ["아침", "점심", "저녁"], []);
  const [nowCategory, setNowCategory] = useRecoilState(nowCategoryAtom);
  //const { nowCategory } = useSelector((state: RootState) => state.upload);
  return (
    <ul className={styles.list}>
      {category.map((v, i) => (
        <li
          key={i}
          className={nowCategory === v ? styles.active : ""}
          onClick={() => setNowCategory(v)}
        >
          {v}
        </li>
      ))}
    </ul>
  );
};

export default UploadCategory;

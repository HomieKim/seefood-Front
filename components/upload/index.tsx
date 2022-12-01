import CompleteButton from "components/custom/complete-button";
import { useRouter } from "next/router";
import React, { FormEvent, MouseEvent, useCallback, useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  nowCategoryAtom,
  preViewUrlAtom,
  tagsAtom,
  uploadImageAtom,
} from "recoils/upload";
import styles from "styles/upload/upload.module.scss";
import Hashtags from "./hashtags";
import ImageUploadModule from "./image-upload";
import UploadCategory from "./upload-category";
import RightArrow from "public/icons/right-arrow.svg";
import { selectedFoodAtom } from "recoils/food-search";
import { useMutation, useQueryClient } from "react-query";
import { postBoardAPI } from "apis/board";

const UploadForm = () => {
  const router = useRouter();
  /* Recoil Reset */
  const imageInit = useResetRecoilState(uploadImageAtom);
  const nowCategoryInit = useResetRecoilState(nowCategoryAtom);
  const tagsInit = useResetRecoilState(tagsAtom);
  const foodInit = useResetRecoilState(selectedFoodAtom);
  const preViewInit = useResetRecoilState(preViewUrlAtom);
  /* Recoil Value */
  const imgValue = useRecoilValue(uploadImageAtom);
  const categoryValue = useRecoilValue(nowCategoryAtom);
  const tagsValue = useRecoilValue(tagsAtom);
  const selectFoods = useRecoilValue(selectedFoodAtom);
  /* mutation */
  const { mutate: uploadMutation } = useMutation(postBoardAPI);

  const queryClient = useQueryClient();

  const uploadSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const formData = new FormData();
      const uploadData = {
        foodNames: selectFoods,
        hashTag: tagsValue,
        mealTime: categoryValue,
      };
      formData.append("file", imgValue as File);
      formData.append(
        "dto",
        new Blob([JSON.stringify(uploadData)], { type: "application/json" })
      );
      uploadMutation(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries(["board"]);
          router.push("/");
        },
      });
    },
    [tagsValue]
  );

  useEffect(() => {
    return () => {
      if (selectFoods.length !== 0) {
        imageInit();
        nowCategoryInit();
        tagsInit();
        foodInit();
        preViewInit();
      }
    };
  }, []);
  console.log("tag value : ", tagsValue);
  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
      className={styles.form}
    >
      <CompleteButton
        onClickHandler={uploadSubmit}
        isActive={
          imgValue !== null && categoryValue !== "" && tagsValue.length !== 0
        }
      />
      <h4>식단 사진</h4>
      <ImageUploadModule />
      <hr />
      <h4>식사 시간</h4>
      <UploadCategory />
      <hr />
      {/* <h4 className={styles.select}>
        <span>음식 선택</span>
        <section>
          {selectFoods.map((v, i) => {
            if (i === selectFoods.length - 1) {
              return <span key={v}>{v}</span>;
            } else {
              return <span key={v}>{v + ", "}</span>;
            }
          })}
        </section>
        <span onClick={() => router.push("upload/food-search")}>
          <RightArrow />
        </span>
      </h4>
      <hr /> */}
      <h4>
        해쉬태그 등록 <span className={styles.caution}>(최대 8글자)</span>
      </h4>
      <Hashtags />
    </form>
  );
};

export default UploadForm;

import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import NoImage from "public/icons/no-image.svg";
import UploadIcon from "public/icons/upload.svg";
import DeleteIcon from "public/icons/delete.svg";
import CheckedIcon from "public/icons/checked.svg";
import styles from "styles/upload/upload.module.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { preViewUrlAtom, uploadImageAtom } from "recoils/upload";
import Image from "next/image";

const DefaultImage = () => {
  return (
    <div className={styles.img}>
      <NoImage />
      <pre>이미지를 업로드 해주세요</pre>
    </div>
  );
};

const ImageUploadModule = () => {
  const [previewUrl, setPreviewUrl] = useRecoilState(preViewUrlAtom);
  const setImageUrl = useSetRecoilState(uploadImageAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const Images = e.target.files;
    const img = (Images as FileList)[0];
    setImageUrl(img);
    // 업로드 이미지 미리보기
    if ((e.target.files as FileList).length) {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = function (e) {
        setPreviewUrl(e.target!.result as string);
      };
    }
  }, []);

  const imageUploadHandler = useCallback(() => {
    inputRef.current!.click();
  }, [inputRef.current]);

  return (
    <div className={styles.container}>
      <div className={styles["img-wrapper"]}>
        {previewUrl ? (
          <Image src={previewUrl} layout="fill" alt="upload-meal" />
        ) : (
          <DefaultImage />
        )}
      </div>
      <ul>
        <li>
          <UploadIcon onClick={imageUploadHandler} />
        </li>
        <li>
          <DeleteIcon
            className={previewUrl ? styles.delete : ""}
            onClick={() => {
              if (!previewUrl) return;
              setPreviewUrl(null);
            }}
          />
        </li>
        <li>
          <CheckedIcon
            width={20}
            height={20}
            className={previewUrl ? styles.check : ""}
          />
        </li>
      </ul>
      <input
        type="file"
        name="file"
        ref={inputRef}
        onChange={onChangeImage}
        hidden
      />
    </div>
  );
};

export default ImageUploadModule;

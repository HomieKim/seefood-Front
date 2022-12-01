import UploadForm from "components/upload";
import React from "react";
import { NextPageWithLayout } from "types/common";
import styles from "styles/upload/upload.module.scss";

const UploadPage: NextPageWithLayout = () => {
  return (
    <div className={styles.wrapper}>
      <UploadForm />
    </div>
  );
};
UploadPage.header = { title: "식단 업로드", noProfile: true };
UploadPage.noNav = true;
UploadPage.noPadding = true;

export default UploadPage;

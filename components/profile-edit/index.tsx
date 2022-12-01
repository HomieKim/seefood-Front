import CompleteButton from "components/custom/complete-button";
import { dummyUser } from "dummy";
import Image from "next/image";
import React, { FormEvent, MouseEvent, useCallback, useEffect } from "react";
import styles from "styles/profile/profile-edit.module.scss";
import EditIcon from "public/icons/edit.svg";
import CameraIcon from "public/icons/camera.svg";
import useModal from 'hooks/use-modal';
import ProfileEditModal from 'components/modal/profile-edit';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { heightAtom, nickNameAtom, weightAtom } from 'recoils/profile';
const ProfileEditForm = () => {
  const uploadSubmit = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    console.log("업로드 버튼 클릭");
  }, []);
  const {isOpen, onClose, setIsOpen}= useModal()
  // react-query 로 유저 정보 요청
  const userData = dummyUser;

  const [weight, setWeight] = useRecoilState(weightAtom);
  const [height, setHeight] = useRecoilState(heightAtom);
  const [nickname, setNickName] = useRecoilState(nickNameAtom);

  useEffect(()=>{
    setWeight(userData.weight);
    setHeight(userData.height);
    setNickName(userData.nickname);
  },[]);
  
  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
      className={styles.form}
    >
      <CompleteButton onClickHandler={uploadSubmit} isActive={false} />
      <section className={styles["img-wrapper"]}>
        {userData.profileURL ? (
          <Image src={userData.profileURL} alt="profile-image" />
        ) : (
          <Image
            src="/images/default-profile.png"
            width={120}
            height={120}
            alt="profile"
          />
        )}
        <button>
          <CameraIcon width={20} hieght={20} fill="#00ac78" />
        </button>
      </section>
      <hr />
      <h4>기본 정보 수정</h4>
      <span onClick={()=> setIsOpen(true)} className={styles.edit}>
        <EditIcon width={16} height={16} fill="#00ac78" />
      </span>
      <div style={{ marginTop: 16 }} className={styles.box}>
        <span>연결된 이메일</span>
        <p>{userData.email}</p>
      </div>
      <div className={`${styles.box}`}>
        <div>
          <span>닉네임 수정</span>
          <p>{nickname}</p>
        </div>
      </div>
      <div className={styles["flex-box"]}>
        <div className={styles.box}>
          <span>키</span>
          <p>{height}</p>
        </div>
        <span className={styles.cm}>cm</span>
        <div className={styles.box}>
          <div />
          <span>몸무게</span>
          <p>{weight}</p>
        </div>
        <span className={styles.kg}>kg</span>
      </div>
      <ProfileEditModal show={isOpen} close={onClose} />
    </form>
  );
};

export default ProfileEditForm;

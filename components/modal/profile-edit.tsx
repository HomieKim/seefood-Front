import React from "react";
import ModalLayout from "./modal-layout";
import styles from "styles/modal/profile-edit.module.scss";
import CustomInput from "components/custom/input";
import useInput from 'hooks/use-input';
import { useRecoilState, useRecoilValue } from 'recoil';
import { heightAtom, nickNameAtom, weightAtom } from 'recoils/profile';

const ProfileEditModal = ({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) => {
  if (!show) return null;
  const [nickname, setNickname] = useRecoilState(nickNameAtom);
  const [weight, setWeight] = useRecoilState(weightAtom);
  const [height, setHeight] = useRecoilState(heightAtom);
  
  const [editNickName, onChangeNickname] = useInput(nickname);
  const [editHeight, onChangeHeight] = useInput(height.toString());
  const [editWeight, onChangeWeight] = useInput(weight.toString());
  const onEdit = () => {
    setNickname(editNickName);
    setHeight(Number(editHeight));
    setWeight(Number(editWeight));
    close();
  }
  return (
    <ModalLayout show={show} close={close}>
      <div className={styles.wrapper}>
        <h4>닉네임 수정</h4>
        <CustomInput inputType='text' value={editNickName} onChange={onChangeNickname} />
        <h4>신체 정보 수정</h4>
        <section className={styles.profile}>
          <CustomInput inputType='text' value={editHeight} onChange={onChangeHeight} />
          <span>cm</span>
          <CustomInput inputType='text' value={editWeight} onChange={onChangeWeight}/>
          <span>kg</span>
        </section>
        <section className={styles["button-section"]}>
          <button onClick={onEdit}>수정 하기</button>
          <button onClick={close}>취소</button>
        </section>
      </div>
    </ModalLayout>
  );
};

export default ProfileEditModal;

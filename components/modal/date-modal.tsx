import Image from "next/image";
import React from "react";
import ModalLayout from "./modal-layout";

const DateModal = ({
  show,
  close,
  date,
  imgList,
}: {
  show: boolean;
  close: () => void;
  date: any;
  imgList: Array<string>;
}) => {
  if (!show) return null;
  return (
    <ModalLayout show={show} close={close}>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {date.get("month") + 1}월 {date?.date()}일 나의 식단
      </div>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "16px 0px",
          width: "100%",
          alignItems: "center",
        }}
      >
        {imgList.map((v, i) => (
          <li
            key={i}
            style={{
              position: "relative",
              marginBottom: "10px",
              width: "100%",
              height: 200,
            }}
          >
            <Image src={v} layout="fill" />
          </li>
        ))}
      </ul>
    </ModalLayout>
  );
};

export default DateModal;

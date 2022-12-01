import DateModal from "components/modal/date-modal";
import dayjs from "dayjs";
import useCalendar from "hooks/use-calendar";
import useModal from "hooks/use-modal";
import useUserDetail from "hooks/use-user-detail";
import useUserId from "hooks/use-user-id";
import React, { useState } from "react";
import Calendar from "react-calendar";
import styles from "styles/custom/calendar.module.scss";

const CustomCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [nowDate, setNowDate] = useState(new Date());
  // 벡엔드에서 유저 정보 불러옴
  const [selectedDate, setSelectedDate] = useState({});
  const { isOpen, onClose, setIsOpen } = useModal();
  const { userId } = useUserId();
  const { data: userData } = useUserDetail({ id: userId });

  const { data } = useCalendar({
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
  });

  const customEvent = (value: any) => {
    const newDate = new Date(value.activeStartDate);
    setNowDate(newDate);
    console.log("new : ", newDate.getFullYear(), " / ", newDate.getMonth() + 1);
    console.log("월, 년 바뀜", value);
  };
  const customClickDay = (value: any) => {
    const day = dayjs(value); // value를 date 객체로 변환
    setSelectedDate(day);
    setIsOpen(true);
    console.log("click Day!!", day);
  };
  console.log("v month : ", value.getMonth() + 1);
  console.log("v year : ", value.getFullYear());
  return (
    <div className={styles["calendar-wrapper"]}>
      <Calendar
        formatDay={(_locale, date) => dayjs(date).format("DD")}
        showNeighboringMonth={false}
        minDetail="month"
        maxDetail="month"
        navigationLabel={null!}
        onChange={onChange}
        value={value}
        onActiveStartDateChange={(value) => customEvent(value)}
        onClickDay={(value) => customClickDay(value)}
        tileContent={({ date, view }) => {
          if (
            data?.dateInfoList?.find(
              (v) =>
                v.date === dayjs(date).format("YYYY.MM.DD") &&
                v.kcal < parseInt(userData?.userKcal as string)
            )
          ) {
            return <div className={styles["tile-wrapper"]}>😀</div>;
          } else if (
            data?.dateInfoList?.find(
              (v) =>
                v.date === dayjs(date).format("YYYY.MM.DD") &&
                v.kcal >= parseInt(userData?.userKcal as string)
            )
          ) {
            return <div className={styles["tile-wrapper"]}>😡</div>;
          } else {
            return <div className={styles["tile-wrapper"]}></div>;
          }
        }}
        tileDisabled={({ date, view }) => {
          if (
            !data?.dateInfoList?.find(
              (v) => v.date === dayjs(date).format("YYYY.MM.DD")
            )
          ) {
            return true;
          }
          return false;
        }}
      />
      <DateModal show={isOpen} close={onClose} date={selectedDate} />
    </div>
  );
};

export default CustomCalendar;

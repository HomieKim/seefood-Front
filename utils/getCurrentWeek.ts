import dayjs from "dayjs";
const weektype = ["일", "월", "화", "수", "목", "금", "토"];
export default function getCurrentWeek() {
  const today = dayjs(new Date());
  const day = today.day(); // 요일 값  월요일이 0
  const diff = today.date() - day + (day === 0 ? -6 : 1);
  const monday = today.set("date", diff);
  const week = Array(7)
    .fill(null)
    .map((v, i) => ({
      day: weektype[monday.add(i, "day").day()],
      date: monday.add(i, "day").date(),
    }));
  return week;
}
